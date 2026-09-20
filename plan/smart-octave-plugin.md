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

### Three Volume Knobs
- **Octave Down Volume** (magenta) — level of the lower octave layer
- **Dry Signal Volume** (neutral) — always-on original signal, unaffected by expression pedal
- **Octave Up Volume** (cyan) — level of the upper octave layer

### Expression Pedal Behavior
```
PEDAL BACK          MIDPOINT             PEDAL FORWARD
100% octave down    0% up / 0% down      100% octave up
     ◄──────────────────────────────────────────►
[magenta zone]    [dry only / center]    [cyan zone]
```

- Dry signal volume stays **constant** regardless of pedal position
- The arc sweeps smoothly between the two octave signals
- Midpoint = only dry signal passes through

---

## Smart Pitch Routing (the "Smart" in SmartOctave)

The core intelligence: `fzero~` continuously tracks the fundamental frequency of the input.

- **High pitch input** → weight toward **octave down** blend
- **Low pitch input** → weight toward **octave up** blend
- Crossover threshold TBD — likely configurable

This means even with the expression pedal at midpoint, the plugin is subtly compensating for register. The pedal controls *how much* of the smart blend the player wants, not which octave is fixed.

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
- [ ] Dry signal volume knob wired
- [ ] Crossover frequency parameter exposed in UI
- [ ] Attack/release smoothing on the smart routing (avoid zipper noise on pitch change)
- [ ] UI panel: three knobs + expression pedal position indicator
- [ ] Preset save/load
- [ ] Polyphony handling (single note vs chord detection)
- [ ] Testing across instrument ranges: guitar, bass, keys, vocals

---

## References

- **Tool**: Cycling '74 Max 8 + Max for Live (Ableton Live 11/12)
- **File**: `SmartOctave.amxd`
- **Design mockup**: `plan/smart-octave-plugin.md` (this file)
