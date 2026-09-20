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
- The crossover threshold is **user-configurable** — the point where the plugin switches from "this is a low note" to "this is a high note" shifts to match the instrument's register

The pedal controls *how much* of the smart blend the player wants. The midpoint setting controls *where on the pitch spectrum* that crossover lives.

### Midpoint (Crossover Threshold) Setting

A dedicated control lets the player set where the low/high boundary falls. Rather than entering a raw frequency, the UI offers **instrument preset icons** as quick-select anchors:

| Icon | Instrument | Crossover region | Rationale |
|---|---|---|---|
| Bass guitar | Bass | Low (~100–200 Hz) | Bass players want octave up on their low strings, octave down on upper register |
| Mandolin | Mandolin | High (~400–600 Hz) | Mandolin's entire range is upper register; crossover sits much higher |

Additional presets (guitar, keys, vocals) can be added. The player can also fine-tune the threshold manually above or below any preset.

The midpoint setting is saved per-preset so different instruments/tunings can have their own stored configuration.

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
- [ ] Configurable midpoint/crossover threshold control in UI
- [ ] Instrument preset icons: bass guitar, mandolin (+ guitar, keys, vocals later)
- [ ] Fine-tune slider above/below preset anchor
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
