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

### Midpoint Knob (Blend Control)
A single knob controls the blend between octave down and octave up. At the center (12 o'clock), both octave signals are at 0 volume — only the dry signal passes through. Turning left brings in octave down; turning right brings in octave up.

```
Full left        12 o'clock       Full right
Octave down ◄──── 0 / 0 ────► Octave up
100% down       both silent      100% up
```

- Center position = both octave layers silent, dry only
- Dry signal stays constant throughout the sweep
- This knob can be MIDI-mapped to an expression pedal or fader for real-time foot control

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

### To Do
- [ ] Expression pedal mapping (MIDI CC → octave down/up blend)
- [ ] Pitch threshold logic: high note → auto-weight octave down, low note → octave up
- [ ] Voice character knobs wired: 2 crossfade knobs (one per path), full left = synth only, full right = harmonic only
- [ ] Midpoint knob: bipolar blend control, center = both octaves silent, left = octave down, right = octave up
- [ ] MIDI mapping for midpoint knob (expression pedal / fader)
- [ ] Pitch crossover threshold control
- [ ] Attack/release smoothing on the smart routing (avoid zipper noise on pitch change)
- [ ] UI panel: voice character knobs (harmonic + synth per path) + pedal/fader position indicator
- [ ] Preset save/load
- [ ] Polyphony handling (single note vs chord detection)
- [ ] Testing across instrument ranges: guitar, bass, keys, vocals

---

## References

- **Tool**: Cycling '74 Max 8 + Max for Live (Ableton Live 11/12)
- **File**: `SmartOctave.amxd`
- **Design mockup**: `plan/smart-octave-plugin.md` (this file)
