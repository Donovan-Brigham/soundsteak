# SmartOctave — Max for Live Audio Plugin

## Purpose

Give the player manual control over which octave effect accompanies their playing. Standard octave pedals add octave down unconditionally — low octave on low notes sounds muddy, high octave on high notes sounds thin. SmartOctave lets the player sweep between octave up and octave down in real time, so the added octave always sits where it sounds good.

---

## The Problem

| Scenario | Standard octave pedal | SmartOctave |
|---|---|---|
| Playing low notes | Adds octave down → muddy | Slide right → octave up → full |
| Playing high notes | Adds octave up → thin | Slide left → octave down → rich |
| Midrange / transitioning | Either blend | Slider center → dry only, sweep to taste |

The player is the intelligence. SmartOctave gives them the control to match the octave to the register as they play.

---

## Signal Chain Architecture

```
plugin~ (input from Ableton Live)
    │
    ├──► send~ dry ──► receive~ dry ──► [Dry toggle gate] ──► sum
    │
    ├──► onepole~ 333 ──► pitchshift~ 0.5 (octave down)
    │    (LP smooth)           │
    │                     character blend (synth ↔ harmonic)
    │                          │
    │                     *~ down_gain ──► *~ 0.5 ──► sum
    │
    └──► onepole~ 333 ──► pitchshift~ 2 (octave up)
         (LP smooth)           │
                          ├──► fzero~ ──► /2 ──► cycle~ (synth path)
                          character blend (synth ↔ harmonic)
                               │
                          *~ up_gain ──► *~ 0.5 ──► sum
                                                      │
                                               omx.peaklim~ ──► plugout~
```

### Gain Computation (Blend Slider)

```
slider s ∈ [0, 1]      (0 = far left / down, 1 = far right / up)
crossover c ∈ [0, 1]
midpoint m ∈ [0.1, 0.9]   (v9 only; fixed at 0.5 in v8)

zone_half = c × min(m, 1−m)
norm      = s − m

down_gain = clip((zone_half − norm) / (m + zone_half),       0, 1)
up_gain   = clip((norm + zone_half) / ((1−m) + zone_half),   0, 1)
```

At slider center with crossover = 0: both gains = 0 (dry only).
At slider far left: down_gain = 1, up_gain = 0.
At slider far right: down_gain = 0, up_gain = 1.

### Key Objects

| Object | Role |
|---|---|
| `plugin~` / `plugout~` | Live audio I/O |
| `onepole~ 333` | Low-pass filter before pitch shift (smoothing) |
| `pitchshift~ @pitchshift 0.5 @quality best` | Shifts pitch down one octave |
| `pitchshift~ @pitchshift 2 @quality best` | Shifts pitch up one octave |
| `fzero~` | Fundamental frequency detection for `cycle~` synthesis |
| `cycle~` | Sine oscillator driven by detected pitch (synth character) |
| `send~/receive~` | Named audio buses: `dry`, `octave_down`, `octave_up` |
| `live.slider` | Main Blend control (maps to expression pedal via MIDI) |
| `expr` | Gain math: slider + crossover [+ midpoint] → down_gain, up_gain |
| `sig~` + `onepole~ 20` | Converts float gains to smoothed audio-rate signals |
| `omx.peaklim~` | Transparent peak limiter at output |

---

## UI / Controls

### Blend Slider
The main performance control. Maps to an expression pedal via MIDI CC.

```
▼ [────────────────●────────────────] ▲
Oct Down                           Oct Up

Far left:   octave down 100% + dry
Center:     no octave, dry only
Far right:  octave up 100% + dry
```

### Crossover Knob
Controls how much the two octave effects overlap around the slider's center point.

```
Crossover = 0 (hard V):          Crossover = 1 (full overlap):
Down ████░░░░  Up ░░░░████        Down ████▓▓▓▓  Up ▓▓▓▓████
         ↑ gap at center                  ↑ both present at center
```

- **0**: clean gap at center — slider must move past center before octave appears
- **turned up**: overlap zone grows — both effects blend across center
- **max**: effects extend all the way to the opposite edge

### Midpoint Knob *(v9 only)*
Shifts where in the slider throw the center (zero octave) point sits.

- **Low**: center biased right → most of the throw is octave down territory
- **50**: equal split (same as v8)
- **High**: center biased left → most of the throw is octave up territory

Useful if you live in one register — lets you spread the octave you use most across more of the slider range.

### Voice Character Knobs
One per path. Sweeps between two signal sources for that octave:

```
Full left          Center           Full right
Synth only ◄────── 50/50 ──────► Harmonic only
(cycle~ sine)               (pitchshift~ audio)
```

- **Octave Down Character** — blends sine oscillator vs pitch-shifted audio for the down path
- **Octave Up Character** — same for the up path
- Default: fully Harmonic (1.0) — `cycle~` is silent at load to prevent hot meters

### Dry Signal Toggle
ON/OFF switch. Adds or removes the dry (unprocessed) input signal at full volume across the entire slider throw.

---

## Level Management

```
dry × dry_toggle (1.0×)
+ oct_down × down_gain × 0.5
+ oct_up   × up_gain   × 0.5
  → sum → omx.peaklim~ (-3 dBFS ceiling, 1ms lookahead, 50ms release) → plugout~
```

- Slider at center, dry ON: 1.0× (0 dB, limiter transparent)
- One octave fully active + dry ON: 1.5× (+3.5 dB), limiter engages gently
- `down_gain + up_gain` never exceeds 1.0 at any slider position

---

## Build Status

### Done
- [x] `plugin~` / `plugout~` Live I/O wired
- [x] Dry send/receive bus with toggle gate (`live.toggle` → `sig~` → `*~`)
- [x] Octave down: `onepole~ 333` → `pitchshift~ 0.5`
- [x] Octave up: `onepole~ 333` → `pitchshift~ 2`
- [x] `fzero~` pitch detection → `/2` → `cycle~` sine synthesis
- [x] Voice character knobs: `live.dial` (0–1) → harmonic `*~`, `expr 1-$f1` → synth `*~`
- [x] Character knob default 1.0 (harmonic only — `cycle~` silent on load)
- [x] Manual Blend slider (`live.slider`, 0–1, MIDI-mappable for expression pedal)
- [x] Crossover knob: overlap zone width around slider center
- [x] Midpoint knob (v9 only): shifts center point within slider throw
- [x] Gain math: `expr` objects → `sig~` → `onepole~ 20` (smooth gain, no zipper noise)
- [x] Level normalization: octave paths scaled 0.5× (max additive gain 1.5× / +3.5 dB)
- [x] `omx.peaklim~` output limiter: ceiling −3 dBFS, 1ms lookahead, 50ms release

### Files
| File | Description |
|---|---|
| `SmartOctave_v8.amxd` | Slider-based blend, no Midpoint knob |
| `SmartOctave_v9.amxd` | Same + Midpoint knob |

### To Do
- [ ] MIDI CC mapping for Blend slider (expression pedal)
- [ ] Presentation view layout (Ableton device panel)
- [ ] Preset save/load
- [ ] Polyphony handling (single note vs chord detection)
- [ ] Testing across instrument ranges: guitar, bass, keys, vocals

---

## References

- **Tool**: Cycling '74 Max 8 + Max for Live (Ableton Live 11/12)
- **Design doc**: `plan/Octave_Pedal_Idea_2026_.pdf`
- **Spec**: `plan/smart-octave-plugin.md` (this file)
