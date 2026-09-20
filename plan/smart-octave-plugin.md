# SmartOctave — Max for Live Audio Plugin

## Purpose

Add a lower octave when playing high-pitch notes, or a higher octave when playing low-pitch notes. The plugin solves the problem that standard octave pedals ignore: a lower octave on your lowest notes sounds muddy, and a higher octave on your highest notes sounds thin. SmartOctave makes the blend *pitch-aware* so the added octave always sits where it sounds good.

---

## The Problem

| Scenario | Standard octave pedal | SmartOctave |
|---|---|---|
| Playing low notes | Adds octave down → muddy | Adds octave up → full |
| Playing high notes | Adds octave up → thin | Adds octave down → rich |
| Midrange notes | Either blend | Expression pedal controls |

No existing octave pedal accounts for this. SmartOctave uses pitch detection (`fzero~`) to route the signal intelligently.

---

## Signal Chain Architecture

```
plugin~ (input from Ableton Live)
    │
    ├──► send~ dry ──────────────────────────────────────────► [Dry Signal Volume knob]
    │
    ├──► onepole~ 333 ──► pitchshift~ @pitchshift 0.5 @quality best
    │    (LP smooth)       (octave down)
    │         │
    │    send~ octave_down ──► receive~ octave_down
    │         │
    │         ├──► harmonic gain
    │         └──► synth gain
    │
    └──► onepole~ 333 ──► pitchshift~ @pitchshift 2 @quality best
         (LP smooth)       (octave up)
              │
              ├──► fzero~ ──► /2 ──► cycle~ (clean sine synthesis)
              │    (pitch detect)
              │
         send~ octave_up ──► receive~ octave_up
              │
              ├──► harmonic gain
              └──► synth gain
                        │
                   plugout~ (output to Live)
```

### Key Objects

| Object | Role |
|---|---|
| `plugin~` / `plugout~` | Live audio I/O |
| `onepole~ 333` | Low-pass filter at 333 Hz for signal smoothing before pitch shift |
| `pitchshift~ @pitchshift 0.5 @quality best` | Shifts pitch down one octave (ratio 0.5) |
| `pitchshift~ @pitchshift 2 @quality best` | Shifts pitch up one octave (ratio 2.0) |
| `fzero~` | Fundamental frequency detection for smart routing |
| `/2` | Halves the detected frequency for synthesis reference |
| `cycle~` | Sine oscillator driven by pitch data for clean octave-up tone |
| `send~/receive~` | Named audio buses: `dry`, `octave_down`, `octave_up` |
| `harmonic gain` | Blend of shifted audio signal |
| `synth gain` | Blend of synthesized sine signal |

---

## UI / Controls

### Midpoint Knob (Crossover Overlap Width)
Controls how far each octave signal extends into the other's register — the width of the overlap zone around the pitch crossover point.

**Knob at zero — no overlap, clean split:**
```
Low register          Crossover point         High register
Octave up ──────► [fades to 0] [0 fades in] ◄────── Octave down
                        ↑ they meet here, no overlap
```

**Knob turned up — signals push into each other's territory:**
```
Low register                                    High register
Octave up ──────────────────► [extends past mid]
                    [extends past mid] ◄────────── Octave down
                         ↑ both signals audible in overlap zone
```

**Knob at maximum — maximum overlap:**
```
Each signal ends exactly where the other originally began.
Octave down now reaches into where octave up started, and vice versa.
```

- At zero: clean handoff between the two octave paths, silence gap at the boundary
- Turned up: wider overlap zone where both octave signals are audible simultaneously in the mid register
- At max: each octave signal ends at the starting point of the other — full crossover
- Dry signal stays constant throughout

### Voice Character Knobs
Two blend knobs — one for octave down, one for octave up — each sweep between the two signal sources for that path:

```
Full left          Center           Full right
Synth only ◄────── 50/50 ──────► Harmonic only
(cycle~ sine)               (pitchshift~ audio)
```

- **Octave Down character** — blends the down path between pure sine oscillator and pure pitch-shifted audio
- **Octave Up character** — same blend control for the up path

This maps directly to `harmonic gain` and `synth gain` in the Max patch, crossfading between the two sources rather than controlling separate levels.

---

## Smart Pitch Routing (the "Smart" in SmartOctave)

The core intelligence: `fzero~` continuously tracks the fundamental frequency of the input.

- **High pitch input** → weight toward **octave down** blend
- **Low pitch input** → weight toward **octave up** blend
- The crossover threshold is **user-configurable** — the point where the plugin switches from "this is a low note" to "this is a high note" shifts to match the instrument's register

The pedal controls *how much* of the smart blend the player wants. The midpoint setting controls *where on the pitch spectrum* that crossover lives.

### Pitch Crossover Threshold

A separate control sets where on the pitch spectrum the plugin considers a note "low" vs "high" — determining which octave path the smart routing favors. The player dials this in to match their instrument's register.

---

## Build Status

### Done
- [x] `plugin~` / `plugout~` Live I/O wired
- [x] Dry send/receive bus
- [x] Octave down: `onepole~` → `pitchshift~ 0.5`
- [x] Octave up: `onepole~` → `pitchshift~ 2`
- [x] `fzero~` pitch detection on octave up path
- [x] `cycle~` sine synthesis from pitch data
- [x] `harmonic gain` and `synth gain` mix controls per path
- [x] Named audio buses for all three signals
- [x] Smart pitch routing: `fzero~` → `sig~` → `onepole~ 10` → subtract threshold → divide by zone → `clip~` → gain pair (`down_gain`, `up_gain`)
- [x] Voice character knobs wired: `live.dial` (0–1) → harmonic `*~`, `expr 1 - $f1` → synth `*~` (per path)
- [x] Midpoint (Crossover Overlap Width) knob: 1–400 Hz, default 1 Hz (hard split)
- [x] Pitch crossover threshold knob: 50–2000 Hz, default 220 Hz (A3)
- [x] `onepole~ 10` smoothing on gain transitions (~16ms time constant, eliminates zipper noise)
- [x] Level normalization: octave paths scaled to 0.5x (max additive gain 1.5x / +3.5 dB)
- [x] `omx.peaklim~` output limiter: ceiling −0.5 dBFS, 1ms lookahead, 50ms release

### Level Management

```
dry (1.0×)
+ oct_down × down_gain × 0.5
+ oct_up   × up_gain   × 0.5
  → sum → omx.peaklim~ → plugout~
```

No octave active: 1.0× (0 dB, limiter transparent).
One octave fully active: 1.5× (+3.5 dB), limiter engages gently.
Perceived volume stays consistent — the limiter handles psychoacoustic density (added harmonics increase loudness even at same dBFS).

### To Do
- [ ] Expression pedal mapping (MIDI CC → octave down/up blend)
- [ ] MIDI mapping for midpoint knob (expression pedal / fader)
- [ ] UI panel layout in Ableton Live device view
- [ ] Preset save/load
- [ ] Polyphony handling (single note vs chord detection)
- [ ] Testing across instrument ranges: guitar, bass, keys, vocals

---

## References

- **Tool**: Cycling '74 Max 8 + Max for Live (Ableton Live 11/12)
- **File**: `SmartOctave.amxd`
- **Design mockup**: `plan/smart-octave-plugin.md` (this file)
