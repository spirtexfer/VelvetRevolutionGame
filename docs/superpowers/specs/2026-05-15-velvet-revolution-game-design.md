# Velvet Revolution Game — Design Spec

## Overview

A browser-based narrative strategy game set during the 1989 Velvet Revolution in Czechoslovakia. The player controls an underground newspaper ("Svobodný Tisk") and decides how to report on real historical events. Reporting choices affect four stats that determine whether the revolution succeeds before the government shuts you down.

**Target:** Static HTML/CSS/JS hosted on GitHub Pages. No build step, no server, no frameworks.

**Audience:** Class project — teacher needs to open a URL and play immediately.

---

## Architecture

Three files in the repo root:

| File | Purpose |
|------|---------|
| `index.html` | Shell — loads Google Fonts, CSS, JS |
| `styles.css` | Samizdat visual design (ported from prototype) |
| `game.js` | Game logic, event data, DOM rendering (vanilla JS) |

### Dependencies (CDN only)

- Google Fonts: Playfair Display (headlines), Special Elite (body/typewriter), Caveat (margin annotations), Libre Baskerville (fallback serif)
- No React, no Babel, no build tools

### State Management

A single `gameState` object:

```js
{
  phase: "start" | "event" | "outcome" | "win" | "loss" | "end",
  eventIndex: 0,
  stats: { pressure: 0, suspicion: 0, fame: 100, credibility: 100 },
  lastDeltas: {},
  chosenAction: null,
  history: []  // array of { eventId, choiceId } for replay/scoring
}
```

Persisted to `localStorage` on every state change. Restored on page load if present. A "restart" action clears saved state.

---

## Stat System

### Four Stats

| Stat | Starts at | Purpose |
|------|----------|---------|
| **Pressure (P)** | 0 | Revolutionary momentum. Win condition. |
| **Suspicion (S)** | 0 | Government awareness. Loss condition. |
| **Fame (F)** | 100 | Audience size. Multiplies Pressure gains. |
| **Credibility (C)** | 100 | Public trust. Multiplies Pressure gains. |

### Win / Loss Conditions

- **Victory:** P >= 1000 by Dec 29
- **Instant loss:** S >= 1000 at any point (StB shuts you down)
- **Soft loss:** Reach Dec 29 with P < 1000 (revolution fizzles — ranked ending based on how close)

### Pressure Formula

```
Final P Gain = Base P × Fame Multiplier × Credibility Multiplier
```

Only positive P gains are multiplied. Negative P changes (from choosing passive/pro-government options) apply at face value.

### Fame Multiplier Table

| Fame Range | Multiplier |
|-----------|-----------|
| 0–99 | ×0.75 |
| 100–199 | ×1.00 |
| 200–399 | ×1.15 |
| 400–599 | ×1.30 |
| 600–799 | ×1.45 |
| 800+ | ×1.60 |

### Credibility Multiplier Table

| Credibility Range | Multiplier |
|------------------|-----------|
| 0–49 | ×0.50 |
| 50–99 | ×0.80 |
| 100–149 | ×1.00 |
| 150–249 | ×1.15 |
| 250–399 | ×1.30 |
| 400+ | ×1.45 |

### Suspicion Multiplier Table

Suspicion gains are multiplied by a gentler factor based on current suspicion level. This models the reality that a newspaper already on the StB's radar draws disproportionately more heat from every provocation.

| Suspicion Range | Multiplier |
|----------------|-----------|
| 0–199 | ×1.00 |
| 200–399 | ×1.05 |
| 400–599 | ×1.10 |
| 600–799 | ×1.20 |
| 800+ | ×1.30 |

Only positive S gains are multiplied. Negative S changes (suspicion reduction) apply at face value.

### Passive Suspicion

Added automatically after every event resolution, based on combined Fame + Credibility:

| Fame + Credibility | Bonus Suspicion |
|-------------------|----------------|
| < 400 | +0 |
| 400–699 | +5 |
| 700–999 | +10 |
| 1000+ | +20 |

This models the reality that a widely-read, trusted underground press naturally attracts more government attention.

### Stat Uncapping

- Fame and Credibility have no upper cap (can grow freely)
- Pressure and Suspicion have no upper cap but trigger win/loss at 1000
- All stats have a floor of 0 (cannot go negative)

---

## Events

### Source of Truth

The user's 33-event timeline (Nov 17 08:00 through Dec 29 17:00) is the authoritative event list. Each event specifies:
- Date and time
- Description
- 2-3 choices with base stat deltas (P, S, F, C)
- Attendance number for Big Events

### Narrative Enrichment

The Claude Design prototype contains 28 events with rich narrative text (headlines, kickers, body paragraphs, literary choice labels, outcome descriptions). Where prototype events overlap with the user's timeline (~20 events map well), merge in the prototype's narrative content. For events only in the user's list, write new narrative text matching the prototype's literary style.

Each event in the final game has:
- `id`: unique identifier
- `date`: display dateline (e.g., "PRAGUE — NOVEMBER 17, 1989 — 16:00")
- `headline`: newspaper-style headline
- `kicker`: italic subheadline
- `body`: 2-4 sentence narrative body text
- `attendance`: number (Big Events only, displayed as badge)
- `choices[]`: array of 2-3 options, each with:
  - `id`: unique identifier
  - `label`: bold editorial-style title (e.g., "RUN THE RUMOR")
  - `draft`: 1-2 sentence description styled as an article draft
  - `deltas`: `{ pressure, suspicion, fame, credibility }` — base values before multipliers
  - `outcome`: 1 sentence describing what happened after publication

### Big Events vs Small Events

**Big Events** have attendance numbers and give the largest Pressure opportunities. Attendance figures are historically grounded:

| Date | Event | Attendance | Max Base P |
|------|-------|-----------|-----------|
| Nov 17 16:00 | Student march begins | 15,000 | +80 |
| Nov 17 18:30 | Police suppress at Národní třída | 15,000 | +150 |
| Nov 20 16:00 | Massive Prague demonstration | 100,000 | +180 |
| Nov 21 15:00 | Demonstrations growing rapidly | 200,000 | +200 |
| Nov 22 18:00 | Evening demonstrations, Wenceslas Sq | 250,000 | +160 |
| Nov 24 11:00 | Communist Party leadership resigns | 300,000 | +140 |
| Nov 26 13:00 | Letná Plain rally | 750,000 | +250 |
| Nov 27 12:00 | General strike begins | 2,000,000 | +300 |
| Dec 10 16:00 | Non-communist government formed | 500,000 | +100 |
| Dec 29 17:00 | Havel elected president | 300,000 | +150 |

The correlation between real attendance and base Pressure must be preserved: bigger crowds = bigger Pressure opportunity.

**Small Events** are journalistic decisions between protests (interviews, rumors, propaganda, foreign broadcasts). They mainly affect Fame, Credibility, and Suspicion, with modest Pressure gains.

### Historical Accuracy

All events, dates, locations, and attendance figures must be historically accurate or clearly grounded in documented record. The prototype's chat log includes a detailed accuracy audit — corrections already applied include:
- Dec 17 wire-cutting: Austrian FM Mock (not Vranitzky), at Hatě-Kleinhaugsdorf
- Nov 22 Dubček: SNP Square in Bratislava
- Dec 3 cabinet ratio: 16-to-5
- Dec 15 TV reckoning: reframed from Nov 23-27 newsroom revolt

A small number of events are "dramatized but plausible" (StB archive-burning packages, People's Militia threat leaflets). These should be preserved for gameplay but could be flagged if the teacher requests a historical accuracy note.

---

## Balancing — CRITICAL

**The stat values in the user's design doc are a starting point, not final.** A thorough balancing pass is required before the game ships.

### Balancing Goals

1. **Aggressive play** (always pick the highest-P option): Should be able to win (P>=1000) but should frequently trigger the S>=1000 loss. High risk, high reward.
2. **Cautious play** (always pick the lowest-S option): Should survive to Dec 29 but should NOT reach P>=1000. Safe but insufficient.
3. **Balanced play** (mix of aggressive and cautious): Should have a viable but narrow path to victory. The "intended" way to play — requires real strategic thinking.
4. **Pro-government play** (always pick negative-P options): Should result in very low P and low S. A clear "you didn't help the revolution" ending.

### Balancing Method

1. Sum all maximum base P values across all 33 events. Apply Fame/Credibility multipliers assuming a "balanced" Fame/Credibility trajectory. Verify total reachable P is ~1200-1500 (enough to win with good play, but not guaranteed).
2. Sum all S values from the aggressive path. Apply suspicion multipliers. Verify total S exceeds 1000 (aggressive play should be dangerous). Add passive suspicion per turn.
3. Run simulated playthroughs for each archetype. Adjust individual event deltas where outcomes don't match the goals above.
4. Verify that the suspicion multiplier creates meaningful late-game pressure without creating unwinnable death spirals.
5. Verify passive suspicion doesn't make all strategies eventually lose — it should only punish players who have both high Fame AND high Credibility (i.e., very successful journalists draw more attention).

### Balancing Adjustments Documentation

All changes to the user's original stat values must be documented in a `BALANCE_LOG.md` file with:
- Which event/choice was changed
- Original values vs new values
- Why the change was made (e.g., "aggressive path reached S=1400 by event 20, too punishing — reduced S on Nov 20 choices")

---

## Game Flow

### Screens

1. **Start screen** — Newspaper masthead ("Svobodný Tisk"), flavor intro text, "Open the first dispatch" button
2. **Event screen** — Two-column layout:
   - Left: event card with dateline, headline, kicker, body text, attendance badge (Big Events)
   - Right: choices column with 2-3 editorial draft options showing stat impact pills
3. **Outcome screen** — Shows chosen action's result text, animated stat deltas in handwritten style, "Next dispatch" button. Also check for instant loss (S>=1000) before advancing.
4. **Win screen** — P >= 1000 reached: celebratory ending themed as the paper becoming "Paper of Record"
5. **Loss screen** — S >= 1000: "The StB found your press" ending
6. **End screen** — Reached Dec 29 with P < 1000: ranked ending based on final stats (multiple tiers from "Paper of Record" to "A Footnote")

### Flow Logic

```
Start → Event → Player picks choice → Apply deltas (with multipliers) → 
  Add passive suspicion → Check S >= 1000 → 
    If yes → Loss screen
    If no → Outcome screen → Check P >= 1000 →
      If yes → Win screen
      If no → Check if last event →
        If yes → End screen (ranked)
        If no → Next event
```

### Calendar Strip

A horizontal strip at the top showing all event dates. Past events are dimmed, current event is highlighted in red. Gives the player a sense of pacing and how many events remain.

---

## Visual Design

Ported directly from the prototype's CSS. No redesign needed — the samizdat aesthetic is already production-quality.

### Paper Texture (CSS-only, no images)

- Layered radial gradients for uneven paper tone
- SVG fractal noise overlay for fiber texture
- Foxing spots (radial gradients simulating age marks)
- Coffee ring (radial gradient in upper right)
- Inset box-shadows for worn edges
- Faint horizontal ruled lines behind body text

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--paper-1` | `#f3eacd` | Lightest paper |
| `--paper-2` | `#ede0bf` | Mid paper |
| `--paper-3` | `#e2d2a6` | Darker edges |
| `--ink` | `#1c1611` | Primary text |
| `--ink-2` | `#2e251a` | Secondary text |
| `--stamp-red` | `#8b2500` | Warnings, suspicion, censor marks |
| `--olive` | `#4a5530` | Positive indicators |
| `--margin-ink` | `#2a3148` | Blue ballpoint annotations |

### Typography

- **Headlines:** Playfair Display, 900 weight, italic for masthead
- **Body:** Special Elite (typewriter feel)
- **Annotations:** Caveat (handwritten margin notes)
- **Fallbacks:** Libre Baskerville, Courier New

### Interactive Elements

- Event cards: 3px double-rule borders, slight rotation (-0.6deg), pin decoration
- Choice buttons: bordered columns with dotted inner border, hover lifts card and colors label red
- Outcome stamps: "Published" / "In Press" with stamp-in animation (scale + rotate)
- Stat annotations: handwritten-style deltas that fade in above stat values

### Censorship Effects

- **S >= 600:** Censor banner appears ("STB watching · re-write for safety · cite no names this issue")
- **S >= 800:** Random words in body text replaced with redaction blocks (█████)
- **S >= 900:** Paper border pulses red (danger animation)

### Responsive

- Two-column grid (event + choices) collapses to single column below 880px
- Paper padding reduces on mobile
- Headline font scales with `clamp()`

---

## Endings

### Win (P >= 1000)

Title: "Svobodný Tisk — Paper of Record"
The paper is preserved in the National Library. Cited in foreign monographs. You helped shape the revolution.

### Loss (S >= 1000)

Title: "The paper went silent."
The StB found your press. Editors arrested. The revolution carried on without you.

### Soft Loss — Ranked Tiers (Dec 29, P < 1000)

Based on final P value and overall stat balance:

- **P >= 800:** "A Voice in the Chorus" — you contributed meaningfully but weren't decisive
- **P >= 500:** "A Footnote in the Annals" — limited circulation, you survived but didn't break through
- **P < 500:** "The Masthead Folds" — too cautious, the revolution happened around you
- **Credibility < 50 (any P):** "Readers Wandered Away" — lost trust, special ending that overrides the P-based tier above

---

## File Structure

```
VelvetRevolutionGame/
├── index.html          # Shell
├── styles.css          # Samizdat visual design
├── game.js             # Logic, events, rendering
├── BALANCE_LOG.md      # Documents all stat adjustments
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-15-velvet-revolution-game-design.md  # This file
```

---

## Out of Scope (for now)

- Sound effects (typewriter clacks, mimeograph hum)
- Branching events (choices unlock different future events)
- Front-page collage end screen
- Historical accuracy disclaimer modal
- Multiple save slots
- Difficulty modes
