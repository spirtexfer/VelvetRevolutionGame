# Velvet Revolution Game — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a playable browser-based narrative strategy game about the 1989 Velvet Revolution, deployable to GitHub Pages with no build step.

**Architecture:** Four static files — `index.html` (shell), `styles.css` (samizdat newspaper aesthetic), `events.js` (35 historical events with narrative text), `game.js` (stat engine, state management, DOM rendering). Vanilla JS, no frameworks. Google Fonts loaded via CDN.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (ES6+), Google Fonts CDN

**Spec:** `docs/superpowers/specs/2026-05-15-velvet-revolution-game-design.md`

**Prototype reference:** `docs/reference/prototype/` — contains a Claude Design prototype's `styles.css` (production-quality samizdat CSS) and `events.js` (28 events with rich narrative text). Use for visual design porting and narrative enrichment.

---

### Task 1: Project Foundation — index.html

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Svobodný Tisk · The Velvet Revolution Game</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Special+Elite&family=Caveat:wght@500;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="desk">
    <div class="paper" id="paper"></div>
  </div>

  <script src="events.js"></script>
  <script src="game.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify file opens in browser**

Open `index.html` in a browser. Expected: dark brown desk background with an empty paper rectangle (once styles.css exists). For now, just verify no console errors from missing scripts.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add index.html shell with font loading"
```

---

### Task 2: Visual Design — styles.css

**Files:**
- Create: `styles.css`
- Reference: `docs/reference/prototype/styles.css`

The prototype's CSS is production-quality and needs minimal changes. Port it with these adaptations:

- [ ] **Step 1: Copy prototype styles.css to project root**

Copy `docs/reference/prototype/styles.css` to `styles.css` in the project root. This file contains the complete samizdat aesthetic: paper texture, typography, stat ticker, event cards, choice buttons, outcome cards, calendar strip, censorship effects, start/end screens, and animations.

- [ ] **Step 2: Add these additional CSS rules at the end of the file**

Append to `styles.css`:

```css
/* ─────────────────────────────────────────────────────────────
   ADDITIONS — not in prototype
   ───────────────────────────────────────────────────────────── */

.attendance-badge {
  display: inline-block;
  font-family: 'Special Elite', monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faded);
  border: 1px solid var(--ink-faded);
  padding: 3px 10px;
  margin-top: 10px;
}

.calc-breakdown {
  font-family: 'Caveat', cursive;
  font-size: 16px;
  color: var(--margin-ink);
  margin-top: 6px;
  font-style: italic;
}

.passive-susp-note {
  font-family: 'Caveat', cursive;
  font-size: 15px;
  color: var(--stamp-red-faded);
  margin-top: 4px;
}

.stat-ticker-1000 {
  grid-template-columns: repeat(4, 1fr);
}

.stat-bar-1000 {
  position: relative;
  height: 6px;
  margin-top: 8px;
  background:
    repeating-linear-gradient(
      90deg,
      var(--ink-faded) 0 2px,
      transparent 2px 5px
    );
  opacity: 0.7;
}
.stat-bar-1000 .stat-bar-fill {
  position: absolute; inset: 0;
  background: var(--ink);
  transition: width 0.5s ease;
}
```

- [ ] **Step 3: Verify in browser**

Open `index.html`. Expected: dark wood desk background, paper rectangle with aged texture (foxing spots, coffee ring, inset shadows). No content yet — just the paper.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Add samizdat newspaper CSS — paper texture, typography, components"
```

---

### Task 3: Stat Engine — game.js (Part 1)

**Files:**
- Create: `game.js`

Write the pure stat calculation functions. These are the mathematical core of the game.

- [ ] **Step 1: Write multiplier functions and applyDeltas**

Create `game.js` with:

```js
"use strict";

/* ═══════════════════════════════════════════════════════════════
   STAT ENGINE
   ═══════════════════════════════════════════════════════════════ */

const STAT_META = {
  pressure:    { label: "Pressure",    sub: "Revolutionary Momentum" },
  suspicion:   { label: "Suspicion",   sub: "State Security Watch" },
  fame:        { label: "Fame",        sub: "Readers Reached" },
  credibility: { label: "Credibility", sub: "Public Trust" }
};

const INITIAL_STATS = { pressure: 0, suspicion: 0, fame: 100, credibility: 100 };

function getFameMultiplier(fame) {
  if (fame >= 800) return 1.60;
  if (fame >= 600) return 1.45;
  if (fame >= 400) return 1.30;
  if (fame >= 200) return 1.15;
  if (fame >= 100) return 1.00;
  return 0.75;
}

function getCredibilityMultiplier(cred) {
  if (cred >= 400) return 1.45;
  if (cred >= 250) return 1.30;
  if (cred >= 150) return 1.15;
  if (cred >= 100) return 1.00;
  if (cred >= 50)  return 0.80;
  return 0.50;
}

function getSuspicionMultiplier(susp) {
  if (susp >= 800) return 1.30;
  if (susp >= 600) return 1.20;
  if (susp >= 400) return 1.10;
  if (susp >= 200) return 1.05;
  return 1.00;
}

function getPassiveSuspicion(fame, cred) {
  var combined = fame + cred;
  if (combined >= 1000) return 20;
  if (combined >= 700)  return 10;
  if (combined >= 400)  return 5;
  return 0;
}

function getMultiplierDisplay(stat, value) {
  if (stat === "fame") return "×" + getFameMultiplier(value).toFixed(2);
  if (stat === "credibility") return "×" + getCredibilityMultiplier(value).toFixed(2);
  if (stat === "suspicion") return "×" + getSuspicionMultiplier(value).toFixed(2);
  return "";
}

function applyDeltas(stats, baseDelta) {
  var newStats = {
    pressure: stats.pressure,
    suspicion: stats.suspicion,
    fame: stats.fame,
    credibility: stats.credibility
  };
  var actualDeltas = {};
  var breakdown = {};

  // Pressure: multiply positive gains by Fame × Credibility
  var baseP = baseDelta.pressure || 0;
  if (baseP > 0) {
    var fameMult = getFameMultiplier(stats.fame);
    var credMult = getCredibilityMultiplier(stats.credibility);
    actualDeltas.pressure = Math.round(baseP * fameMult * credMult);
    breakdown.pressure = {
      base: baseP,
      fameMult: fameMult,
      credMult: credMult,
      final: actualDeltas.pressure
    };
  } else {
    actualDeltas.pressure = baseP;
  }

  // Suspicion: multiply positive gains by suspicion multiplier
  var baseS = baseDelta.suspicion || 0;
  if (baseS > 0) {
    var suspMult = getSuspicionMultiplier(stats.suspicion);
    actualDeltas.suspicion = Math.round(baseS * suspMult);
    breakdown.suspicion = {
      base: baseS,
      suspMult: suspMult,
      final: actualDeltas.suspicion
    };
  } else {
    actualDeltas.suspicion = baseS;
  }

  // Fame and Credibility: no multipliers
  actualDeltas.fame = baseDelta.fame || 0;
  actualDeltas.credibility = baseDelta.credibility || 0;

  // Apply deltas, floor at 0
  newStats.pressure    = Math.max(0, newStats.pressure    + actualDeltas.pressure);
  newStats.suspicion   = Math.max(0, newStats.suspicion   + actualDeltas.suspicion);
  newStats.fame        = Math.max(0, newStats.fame        + actualDeltas.fame);
  newStats.credibility = Math.max(0, newStats.credibility + actualDeltas.credibility);

  // Passive suspicion (added after choice deltas)
  var passiveSusp = getPassiveSuspicion(newStats.fame, newStats.credibility);
  newStats.suspicion = Math.max(0, newStats.suspicion + passiveSusp);

  return {
    stats: newStats,
    deltas: actualDeltas,
    breakdown: breakdown,
    passiveSuspicion: passiveSusp
  };
}
```

- [ ] **Step 2: Add console self-test**

Append to `game.js`:

```js
function runStatTests() {
  console.log("=== Stat Engine Tests ===");

  // Test 1: Fame multiplier brackets
  console.assert(getFameMultiplier(50)  === 0.75, "Fame 50 → 0.75");
  console.assert(getFameMultiplier(100) === 1.00, "Fame 100 → 1.00");
  console.assert(getFameMultiplier(300) === 1.15, "Fame 300 → 1.15");
  console.assert(getFameMultiplier(500) === 1.30, "Fame 500 → 1.30");
  console.assert(getFameMultiplier(700) === 1.45, "Fame 700 → 1.45");
  console.assert(getFameMultiplier(900) === 1.60, "Fame 900 → 1.60");

  // Test 2: Credibility multiplier brackets
  console.assert(getCredibilityMultiplier(25)  === 0.50, "Cred 25 → 0.50");
  console.assert(getCredibilityMultiplier(75)  === 0.80, "Cred 75 → 0.80");
  console.assert(getCredibilityMultiplier(125) === 1.00, "Cred 125 → 1.00");
  console.assert(getCredibilityMultiplier(200) === 1.15, "Cred 200 → 1.15");
  console.assert(getCredibilityMultiplier(300) === 1.30, "Cred 300 → 1.30");
  console.assert(getCredibilityMultiplier(500) === 1.45, "Cred 500 → 1.45");

  // Test 3: Suspicion multiplier brackets
  console.assert(getSuspicionMultiplier(100) === 1.00, "Susp 100 → 1.00");
  console.assert(getSuspicionMultiplier(300) === 1.05, "Susp 300 → 1.05");
  console.assert(getSuspicionMultiplier(500) === 1.10, "Susp 500 → 1.10");
  console.assert(getSuspicionMultiplier(700) === 1.20, "Susp 700 → 1.20");
  console.assert(getSuspicionMultiplier(900) === 1.30, "Susp 900 → 1.30");

  // Test 4: Passive suspicion
  console.assert(getPassiveSuspicion(100, 100) === 0,  "F100+C100 → 0 passive");
  console.assert(getPassiveSuspicion(200, 200) === 5,  "F200+C200 → 5 passive");
  console.assert(getPassiveSuspicion(400, 300) === 10, "F400+C300 → 10 passive");
  console.assert(getPassiveSuspicion(600, 500) === 20, "F600+C500 → 20 passive");

  // Test 5: applyDeltas with initial stats
  var result = applyDeltas(INITIAL_STATS, { pressure: 80, suspicion: 45, fame: 30, credibility: 10 });
  // Fame 100 → ×1.00, Cred 100 → ×1.00, Susp 0 → ×1.00
  console.assert(result.deltas.pressure === 80, "P: 80 × 1.00 × 1.00 = 80");
  console.assert(result.deltas.suspicion === 45, "S: 45 × 1.00 = 45");
  console.assert(result.stats.fame === 130, "F: 100 + 30 = 130");
  console.assert(result.stats.credibility === 110, "C: 100 + 10 = 110");
  // Passive: F130 + C110 = 240 → 0
  console.assert(result.passiveSuspicion === 0, "Passive: 240 < 400 → 0");

  // Test 6: Negative pressure not multiplied
  var r2 = applyDeltas(INITIAL_STATS, { pressure: -40, suspicion: -20, fame: 0, credibility: 0 });
  console.assert(r2.deltas.pressure === -40, "Negative P not multiplied");
  console.assert(r2.deltas.suspicion === -20, "Negative S not multiplied");

  // Test 7: Stats floor at 0
  var lowStats = { pressure: 10, suspicion: 5, fame: 5, credibility: 5 };
  var r3 = applyDeltas(lowStats, { pressure: -100, suspicion: -100, fame: -100, credibility: -100 });
  console.assert(r3.stats.pressure === 0, "P floors at 0");
  console.assert(r3.stats.fame === 0, "F floors at 0");

  console.log("All stat engine tests passed ✓");
}
```

- [ ] **Step 3: Verify tests pass**

Open `index.html` in browser (create a minimal `events.js` with `window.VR_EVENTS = [];` first). Open console, run `runStatTests()`. Expected: "All stat engine tests passed ✓" with no assertion failures.

- [ ] **Step 4: Commit**

```bash
git add game.js
git commit -m "Add stat engine — multipliers, deltas, passive suspicion, self-tests"
```

---

### Task 4: State Management + Render Core — game.js (Part 2)

**Files:**
- Modify: `game.js`

- [ ] **Step 1: Add state management and DOM helpers**

Append to `game.js`:

```js
/* ═══════════════════════════════════════════════════════════════
   STATE MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */

var gameState = {
  phase: "start",
  eventIndex: 0,
  stats: { pressure: 0, suspicion: 0, fame: 100, credibility: 100 },
  lastDeltas: {},
  breakdown: {},
  passiveSuspicion: 0,
  chosenAction: null,
  history: []
};

var STORAGE_KEY = "vr-samizdat-state";

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (e) {}
}

function loadState() {
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      var s = JSON.parse(saved);
      if (s && s.phase) {
        gameState = s;
        return true;
      }
    }
  } catch (e) {}
  return false;
}

function resetState() {
  gameState = {
    phase: "start",
    eventIndex: 0,
    stats: { pressure: 0, suspicion: 0, fame: 100, credibility: 100 },
    lastDeltas: {},
    breakdown: {},
    passiveSuspicion: 0,
    chosenAction: null,
    history: []
  };
  localStorage.removeItem(STORAGE_KEY);
}

/* ═══════════════════════════════════════════════════════════════
   DOM HELPERS
   ═══════════════════════════════════════════════════════════════ */

function el(tag, className, children) {
  var element = document.createElement(tag);
  if (className) element.className = className;
  if (typeof children === "string") {
    element.textContent = children;
  } else if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      if (children[i]) element.appendChild(children[i]);
    }
  } else if (children instanceof HTMLElement) {
    element.appendChild(children);
  }
  return element;
}

function elHTML(tag, className, html) {
  var element = document.createElement(tag);
  if (className) element.className = className;
  element.innerHTML = html;
  return element;
}

function statSign(v) {
  return v === 0 ? "0" : (v > 0 ? "+" + v : "" + v);
}

function statSignClass(key, v) {
  if (key === "suspicion") return v > 0 ? "neg" : v < 0 ? "pos" : "";
  return v > 0 ? "pos" : v < 0 ? "neg" : "";
}

function redactText(text, density) {
  return text.split(" ").map(function(w) {
    if (Math.random() < density && w.length > 3) {
      return '<span class="redact">' + "█".repeat(Math.min(w.length, 8)) + '</span>';
    }
    return w;
  }).join(" ");
}
```

- [ ] **Step 2: Add masthead rendering**

Append to `game.js`:

```js
/* ═══════════════════════════════════════════════════════════════
   MASTHEAD
   ═══════════════════════════════════════════════════════════════ */

var MONTHS = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY",
              "AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
var WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function shortIssueDate(dateline) {
  var m = dateline.match(/([A-Z]+)\s+(\d{1,2}),?\s*(\d{4})/);
  if (!m) return dateline;
  var monthIdx = MONTHS.indexOf(m[1]);
  var day = parseInt(m[2], 10);
  var year = parseInt(m[3], 10);
  if (monthIdx < 0) return dateline;
  var wd = WEEKDAYS[new Date(year, monthIdx, day).getDay()];
  var mn = m[1].charAt(0) + m[1].slice(1).toLowerCase();
  return wd + ", " + day + " " + mn + " " + year;
}

function renderMasthead(container, issueNumber, dateline) {
  var susp = gameState.stats.suspicion;
  var motto = susp >= 600
    ? "▌▌▌ TRUTH UNDER ▌▌▌▌▌▌▌▌"
    : "TRUTH WHERE THE STATE PERMITS NONE";

  var header = el("header", "masthead", [
    el("div", "masthead-top", [
      el("span", null, "Vol. I · No. " + String(issueNumber).padStart(3, "0")),
      el("span", null, "Cena Kčs 1,— · Sdělovací prostředek samizdat"),
      el("span", null, "For Free Circulation Only")
    ]),
    el("h1", "masthead-title", "Svobodný Tisk"),
    el("div", "masthead-subtitle", "The Free Press · Edited & Printed Underground · Praha"),
    el("div", "masthead-bottom", [
      el("span", "masthead-issue", shortIssueDate(dateline)),
      el("span", null, motto),
      el("span", null, "Pass on to one trusted reader · Do not post publicly")
    ])
  ]);
  container.appendChild(header);
}
```

- [ ] **Step 3: Add stat ticker rendering**

Append to `game.js`:

```js
/* ═══════════════════════════════════════════════════════════════
   STAT TICKER
   ═══════════════════════════════════════════════════════════════ */

function renderStatTicker(container) {
  var ticker = el("div", "stat-ticker");
  var keys = ["pressure", "suspicion", "fame", "credibility"];

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var meta = STAT_META[k];
    var v = gameState.stats[k];
    var delta = gameState.lastDeltas[k] || 0;
    var isWarn = k === "suspicion" && v >= 600;
    var isPos = k === "credibility" && v >= 150;

    var statDiv = el("div", "stat" + (isWarn ? " high-suspicion" : "") + (isPos ? " positive" : ""));

    statDiv.appendChild(el("div", "stat-label", meta.label));
    statDiv.appendChild(el("div", "stat-sub", meta.sub));

    var maxVal = (k === "pressure" || k === "suspicion") ? 1000 : 1000;
    var pct = Math.min(100, (v / maxVal) * 100);

    var valueRow = el("div", "stat-value-row", [
      el("div", "stat-value", String(Math.round(v))),
      el("div", "stat-multiplier", "[ " + getMultiplierDisplay(k, v) + " ]")
    ]);
    statDiv.appendChild(valueRow);

    var bar = el("div", "stat-bar");
    var fill = el("div", "stat-bar-fill");
    fill.style.width = pct + "%";
    bar.appendChild(fill);
    statDiv.appendChild(bar);

    if (delta !== 0) {
      var anno = el("div", "stat-anno show" + (delta < 0 ? " neg" : ""),
                    (delta > 0 ? "+" : "") + delta);
      statDiv.appendChild(anno);
    }

    ticker.appendChild(statDiv);
  }

  container.appendChild(ticker);
}
```

- [ ] **Step 4: Add render dispatcher and init**

Append to `game.js`:

```js
/* ═══════════════════════════════════════════════════════════════
   RENDER DISPATCHER
   ═══════════════════════════════════════════════════════════════ */

function render() {
  var paper = document.getElementById("paper");
  paper.innerHTML = "";
  paper.className = "paper" + (gameState.stats.suspicion >= 900 ? " danger" : "");

  var events = window.VR_EVENTS;
  var event = events[gameState.eventIndex];
  var dateline = event ? event.date : "PRAGUE — DECEMBER 29, 1989";
  var issueNumber = gameState.eventIndex + 1;

  renderMasthead(paper, issueNumber, dateline);
  renderStatTicker(paper);

  if (gameState.phase !== "start" && gameState.phase !== "legacy" &&
      gameState.phase !== "shutdown" && gameState.phase !== "ranked") {
    renderCalendarStrip(paper);
  }

  switch (gameState.phase) {
    case "start":    renderStart(paper); break;
    case "event":    renderEvent(paper); break;
    case "outcome":  renderOutcome(paper); break;
    case "legacy":   renderLegacy(paper); break;
    case "shutdown": renderShutdown(paper); break;
    case "ranked":   renderRanked(paper); break;
  }

  renderFooter(paper);
  saveState();
}

function renderFooter(container) {
  var deck = elHTML("footer", "deck",
    '<div class="deck-item"><div class="deck-label">Editor in Chief</div>J. Procházková</div>' +
    '<div class="deck-item"><div class="deck-label">Printer of record</div>mimeograph № 4 · Žižkov</div>' +
    '<div class="deck-item"><div class="deck-label">Issued under</div>no permit · no imprint · no quarter</div>'
  );
  container.appendChild(deck);
}

/* ═══════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════ */

function init() {
  loadState();
  render();
}

window.addEventListener("DOMContentLoaded", init);
```

- [ ] **Step 5: Create minimal events.js placeholder for testing**

Create `events.js`:

```js
window.VR_EVENTS = [
  {
    id: "test1",
    date: "PRAGUE — NOVEMBER 17, 1989 — 16:00",
    headline: "Test Event",
    kicker: "This is a placeholder for testing.",
    body: "Replace with real event data.",
    attendance: 15000,
    choices: [
      {
        id: "a",
        label: "TEST CHOICE A",
        draft: "A test choice.",
        deltas: { pressure: 80, suspicion: 45, fame: 30, credibility: 10 },
        outcome: "Test outcome."
      },
      {
        id: "b",
        label: "TEST CHOICE B",
        draft: "Another test choice.",
        deltas: { pressure: 40, suspicion: 10, fame: 10, credibility: 10 },
        outcome: "Test outcome B."
      }
    ]
  }
];
```

- [ ] **Step 6: Verify masthead + stat ticker render**

Open `index.html` in browser. Expected: paper background with "Svobodný Tisk" masthead, stat ticker showing P:0, S:0, F:100, C:100 with multiplier brackets. Console should show no errors. (Start screen won't render yet — that's the next task.)

- [ ] **Step 7: Commit**

```bash
git add game.js events.js
git commit -m "Add state management, DOM helpers, masthead, stat ticker, render dispatcher"
```

---

### Task 5: Start Screen — game.js (Part 3)

**Files:**
- Modify: `game.js` (append before the `render()` function)

- [ ] **Step 1: Add renderStart function**

Insert before the render dispatcher section in `game.js`:

```js
/* ═══════════════════════════════════════════════════════════════
   START SCREEN
   ═══════════════════════════════════════════════════════════════ */

function renderStart(container) {
  var card = el("div", "start-card", [
    el("div", "dateline", "Praha · Editors' meeting · 17 November 1989 · 06:00"),
    el("h2", "start-title", "You edit a paper that does not legally exist."),
    el("p", "start-subtitle", "Six contributors. One mimeograph. Forty-two days of history about to break open."),
    elHTML("p", "start-body",
      'Tonight a student march sets off from Albertov. The next six weeks will end the regime — ' +
      'or will not, depending in part on what gets printed and what does not. ' +
      '<strong>Each dispatch that reaches your desk demands a decision.</strong> ' +
      'Each decision shapes what your readers believe, and what they do next.'
    ),
    elHTML("p", "start-body",
      'Four standings are tracked along your masthead — ' +
      '<strong>Pressure</strong> (revolutionary momentum), ' +
      '<strong>Suspicion</strong> (state security attention), ' +
      '<strong>Fame</strong> (readers reached), and ' +
      '<strong>Credibility</strong> (public trust). ' +
      'Push too hard and the StB reads you before your readers do. ' +
      'Stay too quiet and the streets march without you.'
    ),
    elHTML("p", "start-body",
      'Reach <strong>1000 Pressure</strong> by December 29 and your paper ' +
      'becomes part of history. Let <strong>Suspicion</strong> reach 1000 ' +
      'and the secret police shut you down.'
    )
  ]);

  var btn = el("button", "btn-begin", "Open the first dispatch");
  btn.addEventListener("click", function() {
    gameState.phase = "event";
    gameState.lastDeltas = {};
    render();
  });
  card.appendChild(btn);

  container.appendChild(card);
}
```

- [ ] **Step 2: Verify in browser**

Open `index.html`. Expected: masthead, stat ticker, then the start card with flavor text and "Open the first dispatch" button. Click the button — it should transition (nothing visible yet since renderEvent isn't implemented, but no errors).

- [ ] **Step 3: Commit**

```bash
git add game.js
git commit -m "Add start screen with intro text and begin button"
```

---

### Task 6: Event + Choices Screen — game.js (Part 4)

**Files:**
- Modify: `game.js`

- [ ] **Step 1: Add renderEvent function**

Insert before the render dispatcher section in `game.js`:

```js
/* ═══════════════════════════════════════════════════════════════
   EVENT + CHOICES SCREEN
   ═══════════════════════════════════════════════════════════════ */

function renderEvent(container) {
  var events = window.VR_EVENTS;
  var event = events[gameState.eventIndex];
  var suspHigh = gameState.stats.suspicion >= 600;
  var suspCritical = gameState.stats.suspicion >= 800;

  var grid = el("div", "dispatch-grid");

  // Left column: event card
  var card = el("article", "event-card fade-up");

  if (suspHigh) {
    card.appendChild(el("div", "censor-banner",
      "StB watching · re-write for safety · cite no names this issue"));
  }

  card.appendChild(el("div", "dateline", event.date));
  card.appendChild(el("h2", "headline", event.headline));
  card.appendChild(el("p", "kicker", event.kicker));

  var bodyText = event.body;
  if (suspCritical) {
    bodyText = redactText(bodyText, 0.07);
  }
  card.appendChild(elHTML("div", "body-text ruled dropcap", bodyText));

  if (event.attendance) {
    card.appendChild(el("div", "attendance-badge",
      "▸ " + event.attendance.toLocaleString() + " people"));
  }

  grid.appendChild(card);

  // Right column: choices
  var choicesCol = el("section", "choices-column");
  choicesCol.appendChild(el("h3", "choices-header",
    "— On the editor's desk — Choose which to set in type —"));

  for (var i = 0; i < event.choices.length; i++) {
    (function(choice, idx) {
      var btn = el("button", "choice fade-up");
      btn.style.animationDelay = (idx * 80) + "ms";

      btn.appendChild(el("span", "choice-mark",
        "Draft № " + String(idx + 1).padStart(2, "0") + " · for press tonight"));
      btn.appendChild(el("span", "choice-label", choice.label));
      btn.appendChild(el("span", "choice-draft", choice.draft));

      // Impact pills
      var impact = el("span", "choice-impact");
      var keys = ["pressure", "suspicion", "fame", "credibility"];
      for (var j = 0; j < keys.length; j++) {
        var k = keys[j];
        var v = choice.deltas[k];
        if (v === undefined || v === 0) continue;
        var cls = "impact-pill " + statSignClass(k, v);
        impact.appendChild(elHTML("span", cls,
          STAT_META[k].label + ' <span class="delta">' + statSign(v) + '</span>'));
      }
      btn.appendChild(impact);

      btn.addEventListener("click", function() { pickChoice(choice); });
      choicesCol.appendChild(btn);
    })(event.choices[i], i);
  }

  grid.appendChild(choicesCol);
  container.appendChild(grid);
}

function pickChoice(choice) {
  var event = window.VR_EVENTS[gameState.eventIndex];
  var result = applyDeltas(gameState.stats, choice.deltas);

  gameState.stats = result.stats;
  gameState.lastDeltas = result.deltas;
  gameState.breakdown = result.breakdown;
  gameState.passiveSuspicion = result.passiveSuspicion;
  gameState.chosenAction = choice;
  gameState.history.push({ eventId: event.id, choiceId: choice.id });

  // Check for shutdown (S >= 1000)
  if (gameState.stats.suspicion >= 1000) {
    gameState.phase = "shutdown";
  } else {
    gameState.phase = "outcome";
  }

  render();
}
```

- [ ] **Step 2: Verify in browser**

Open `index.html`, click "Open the first dispatch." Expected: two-column layout — event card on left with dateline, headline, kicker, body text, and attendance badge; choices on right with draft labels and stat impact pills. Click a choice — should transition to outcome (not implemented yet, but state updates).

- [ ] **Step 3: Commit**

```bash
git add game.js
git commit -m "Add event + choices screen with impact pills and choice handler"
```

---

### Task 7: Outcome Screen — game.js (Part 5)

**Files:**
- Modify: `game.js`

- [ ] **Step 1: Add renderOutcome function**

Insert before the render dispatcher section in `game.js`:

```js
/* ═══════════════════════════════════════════════════════════════
   OUTCOME SCREEN
   ═══════════════════════════════════════════════════════════════ */

function renderOutcome(container) {
  var events = window.VR_EVENTS;
  var event = events[gameState.eventIndex];
  var choice = gameState.chosenAction;
  var deltas = gameState.lastDeltas;
  var breakdown = gameState.breakdown;
  var isLast = gameState.eventIndex + 1 >= events.length;

  var grid = el("div", "dispatch-grid");

  // Left: event card (recap)
  var card = el("article", "event-card");
  card.appendChild(el("div", "dateline", event.date));
  card.appendChild(el("h2", "headline", event.headline));
  card.appendChild(el("p", "kicker", event.kicker));
  grid.appendChild(card);

  // Right: outcome
  var rightCol = el("div", null);
  rightCol.appendChild(el("h3", "choices-header", "— Set in type —"));

  var outcomeCard = el("div", "outcome-card fade-up");

  // Stamp
  var stampGood = (deltas.credibility || 0) >= 15 || (deltas.fame || 0) >= 20;
  var stamp = el("div", "outcome-stamp stamp-in" + (stampGood ? " stamp-go" : ""),
                 stampGood ? "Published" : "In Press");
  outcomeCard.appendChild(stamp);

  outcomeCard.appendChild(el("div", "outcome-eyebrow", "— Editor's note · after the run —"));
  outcomeCard.appendChild(el("h3", "outcome-title", '"' + choice.label + '"'));
  outcomeCard.appendChild(el("p", "outcome-body", choice.outcome));

  // Stat deltas with calculation transparency
  var deltasDiv = el("div", "outcome-deltas");
  var keys = ["pressure", "suspicion", "fame", "credibility"];
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var v = deltas[k];
    if (!v || v === 0) continue;
    var cls = "outcome-delta " + statSignClass(k, v);
    deltasDiv.appendChild(el("span", cls, STAT_META[k].label + " " + statSign(v)));
  }
  outcomeCard.appendChild(deltasDiv);

  // Calculation breakdown
  if (breakdown.pressure) {
    var bp = breakdown.pressure;
    outcomeCard.appendChild(el("div", "calc-breakdown",
      "P: " + statSign(bp.base) + " × " + bp.fameMult.toFixed(2) + " Fame × " +
      bp.credMult.toFixed(2) + " Cred = " + statSign(bp.final)));
  }
  if (breakdown.suspicion) {
    var bs = breakdown.suspicion;
    outcomeCard.appendChild(el("div", "calc-breakdown",
      "S: " + statSign(bs.base) + " × " + bs.suspMult.toFixed(2) + " Watch = " + statSign(bs.final)));
  }
  if (gameState.passiveSuspicion > 0) {
    outcomeCard.appendChild(el("div", "passive-susp-note",
      "+" + gameState.passiveSuspicion + "S passive (your fame draws attention)"));
  }

  // Next button
  var nextDiv = el("div", "outcome-next");
  var nextBtn = el("button", "btn-next", isLast ? "Close the edition" : "To the next dispatch");
  nextBtn.addEventListener("click", function() { advanceToNext(); });
  nextDiv.appendChild(nextBtn);
  outcomeCard.appendChild(nextDiv);

  rightCol.appendChild(outcomeCard);
  grid.appendChild(rightCol);
  container.appendChild(grid);
}

function advanceToNext() {
  var events = window.VR_EVENTS;
  if (gameState.eventIndex + 1 >= events.length) {
    // Final event — check for legacy ending
    if (gameState.stats.pressure >= 1000) {
      gameState.phase = "legacy";
    } else {
      gameState.phase = "ranked";
    }
  } else {
    gameState.eventIndex++;
    gameState.chosenAction = null;
    gameState.lastDeltas = {};
    gameState.breakdown = {};
    gameState.passiveSuspicion = 0;
    gameState.phase = "event";
  }
  render();
}
```

- [ ] **Step 2: Verify in browser**

Play through the test event: start → pick a choice → outcome screen. Expected: outcome card with stamp animation, choice label in quotes, outcome text, stat deltas in handwritten style, calculation breakdown (e.g., "P: +80 × 1.00 Fame × 1.00 Cred = +80"), and "Close the edition" button (since there's only one test event).

- [ ] **Step 3: Commit**

```bash
git add game.js
git commit -m "Add outcome screen with calculation transparency and advance logic"
```

---

### Task 8: Ending Screens — game.js (Part 6)

**Files:**
- Modify: `game.js`

- [ ] **Step 1: Add computeRanking and ending screen functions**

Insert before the render dispatcher section in `game.js`:

```js
/* ═══════════════════════════════════════════════════════════════
   ENDING SCREENS
   ═══════════════════════════════════════════════════════════════ */

function computeRanking(stats) {
  if (stats.credibility < 50) {
    return {
      title: "Readers Wandered Away.",
      subtitle: "Your readers drifted to papers that double-checked their typescripts.",
      body: "Sensation kept you visible at first. Sensation could not keep you trusted. " +
            "By Christmas you were quoted nowhere but in your own pages. " +
            "The Velvet Revolution succeeded — but not because of anything you printed."
    };
  }
  if (stats.pressure >= 800) {
    return {
      title: "Svobodný Tisk — A Voice In The Chorus.",
      subtitle: "One of two dozen samizdat papers that came out of the cellars in November. " +
                "You held your readership through to the inauguration.",
      body: "Not every dispatch was first. Not every story was yours. But the readers who " +
            "began with you on November 17 were still with you on December 29. The Velvet " +
            "Revolution succeeded, and your pages were in the hands of those who marched."
    };
  }
  if (stats.pressure >= 500) {
    return {
      title: "Svobodný Tisk — A Footnote In The Annals.",
      subtitle: "Issues 1 through " + (gameState.eventIndex + 1) + ", preserved in the Charter 77 Archive. " +
                "Limited circulation. Several typescripts.",
      body: "You survived the six weeks. You did not bend, but you did not break through either. " +
            "The Velvet Revolution succeeded around you — the marchers carried other papers, " +
            "chanted other slogans. There will be other editions, other years."
    };
  }
  return {
    title: "The Masthead Folds.",
    subtitle: "Too cautious to matter. The revolution happened, but your pages were not part of it.",
    body: "History does not record what you chose not to print. The Velvet Revolution succeeded — " +
          "Havel took the oath, the borders opened, the committees met. Your paper survived, " +
          "but survival is not the same as contribution."
  };
}

function renderLegacy(container) {
  var card = el("div", "end-card", [
    el("div", "dateline", "Praha · 30 December 1989 · 06:00"),
    el("h2", "start-title", "Svobodný Tisk — Paper of Record."),
    el("p", "start-subtitle",
      "Held by the National Library. Cited in seven foreign monographs. " +
      "Bound into the first textbook of the new civic curriculum."),
    el("p", "start-body",
      "You ran the speech. You named the deputies. You held the line on what could be proved. " +
      "The Velvet Revolution succeeded — and your pages were part of why. " +
      "On December 29th your single-word headline sold out by nine in the morning.")
  ]);

  appendFinalStats(card);
  appendRestartButton(card);
  container.appendChild(card);
}

function renderShutdown(container) {
  var card = el("div", "end-card", [
    el("div", "dateline", "Praha · StB file closure · " + getCurrentDateText()),
    el("h2", "start-title", "The paper went silent."),
    el("p", "start-subtitle",
      "The StB found the press in a Holešovice cellar. Three editors are in Ruzyně."),
    el("p", "start-body",
      "You pushed too far, too publicly. The revolution carried on and succeeded without you — " +
      "Havel still took the oath on December 29. But your pages were not in the hands that mattered. " +
      "The amnesty will free the editors. The issues of the final weeks were never set.")
  ]);

  appendFinalStats(card);
  appendRestartButton(card);
  container.appendChild(card);
}

function renderRanked(container) {
  var ranking = computeRanking(gameState.stats);
  var card = el("div", "end-card", [
    el("div", "dateline", "Praha · 30 December 1989 · 06:00"),
    el("h2", "start-title", ranking.title),
    el("p", "start-subtitle", ranking.subtitle),
    el("p", "start-body", ranking.body)
  ]);

  appendFinalStats(card);
  appendRestartButton(card);
  container.appendChild(card);
}

function appendFinalStats(card) {
  var statsDiv = el("div", "outcome-deltas");
  statsDiv.style.borderTop = "none";
  statsDiv.style.paddingTop = "0";
  var keys = ["pressure", "suspicion", "fame", "credibility"];
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    statsDiv.appendChild(el("span", "outcome-delta",
      STAT_META[k].label + " · " + Math.round(gameState.stats[k])));
  }
  card.appendChild(statsDiv);
}

function appendRestartButton(card) {
  var btnDiv = el("div", null);
  btnDiv.style.marginTop = "24px";
  var btn = el("button", "btn-begin", "Set the type again");
  btn.addEventListener("click", function() {
    resetState();
    render();
  });
  btnDiv.appendChild(btn);
  card.appendChild(btnDiv);
}

function getCurrentDateText() {
  var events = window.VR_EVENTS;
  var event = events[gameState.eventIndex];
  if (!event) return "December 1989";
  var m = event.date.match(/([A-Z]+)\s+(\d{1,2})/);
  if (!m) return "December 1989";
  return m[1].charAt(0) + m[1].slice(1).toLowerCase() + " " + m[2] + ", 1989";
}
```

- [ ] **Step 2: Verify all endings in browser**

Test each ending by modifying `gameState` in the console:
- Shutdown: `gameState.stats.suspicion = 1000; gameState.phase = "shutdown"; render();`
- Legacy: `gameState.stats.pressure = 1000; gameState.phase = "legacy"; render();`
- Ranked (each tier): set `pressure` to 900, 600, 300, and `credibility` to 40; call `gameState.phase = "ranked"; render();`
- Verify restart button clears state and returns to start screen.

- [ ] **Step 3: Commit**

```bash
git add game.js
git commit -m "Add legacy, shutdown, and ranked ending screens with final stats"
```

---

### Task 9: Calendar Strip + Censorship Effects — game.js (Part 7)

**Files:**
- Modify: `game.js`

- [ ] **Step 1: Add renderCalendarStrip function**

Insert before the render dispatcher section in `game.js`:

```js
/* ═══════════════════════════════════════════════════════════════
   CALENDAR STRIP
   ═══════════════════════════════════════════════════════════════ */

function renderCalendarStrip(container) {
  var events = window.VR_EVENTS;
  var strip = el("div", "calendar-strip");

  for (var i = 0; i < events.length; i++) {
    var shortLabel = extractShortDate(events[i].date);
    var cls = "cal-tick";
    if (i < gameState.eventIndex) cls += " past";
    if (i === gameState.eventIndex) cls += " current";

    var tick = el("div", cls, shortLabel);
    tick.title = events[i].date;
    strip.appendChild(tick);
  }

  container.appendChild(strip);
}

function extractShortDate(dateline) {
  var m = dateline.match(/([A-Z]+)\s+(\d{1,2})/);
  if (!m) return "";
  var month = m[1];
  var day = m[2];
  if (month === "NOVEMBER") return "Nov " + day;
  if (month === "DECEMBER") return "Dec " + day;
  return month.substring(0, 3) + " " + day;
}
```

- [ ] **Step 2: Verify calendar strip in browser**

Play to the event screen. Expected: a horizontal strip between the stat ticker and the event, showing tick marks for each event date. Current event is highlighted red. Past events are darker.

- [ ] **Step 3: Commit**

```bash
git add game.js
git commit -m "Add calendar strip and date extraction"
```

---

### Task 10: Events Data — events.js

**Files:**
- Rewrite: `events.js`
- Reference: `docs/reference/prototype/events.js` — contains 28 events with rich narrative text
- Reference: `docs/superpowers/specs/2026-05-15-velvet-revolution-game-design.md` — contains the authoritative 35-event timeline with stat values

This is the largest content task. Write all 35 events with full narrative text.

- [ ] **Step 1: Understand the event data structure**

Each event follows this format:

```js
{
  id: "n17_0800",              // unique ID: date-based
  date: "PRAGUE — NOVEMBER 17, 1989 — 08:00",  // display dateline
  headline: "Headline Text",   // newspaper-style, Playfair Display
  kicker: "Subheadline text.", // italic, 1 sentence
  body: "2-4 sentences...",    // typewriter-style body text
  attendance: 15000,           // Big Events only; omit for Small Events
  choices: [
    {
      id: "choice_id",
      label: "EDITORIAL TITLE",           // caps, bold, imperative
      draft: "1-2 sentence article draft.", // what we'd print
      deltas: { pressure: 80, suspicion: 45, fame: 30, credibility: 10 },
      outcome: "1 sentence result."         // what happened after
    }
  ]
}
```

- [ ] **Step 2: Write events.js with all 35 events**

Create `events.js` containing `window.VR_EVENTS = [...]` with all 35 events. Use the following sources:

**Stat values:** Use the user's event list exactly (from the spec). These are the authoritative base deltas for each choice.

**Narrative text:** For events that map to the prototype (see mapping below), adapt the prototype's headline, kicker, body, choice labels, choice drafts, and choice outcomes. For events not in the prototype, write new narrative text matching the prototype's literary style — terse, specific, historically grounded, written as if by a Czech underground journalist.

**Prototype mapping (9 matches):**

| User Event | Prototype ID | Notes |
|-----------|-------------|-------|
| Nov 17 16:00 Student march | n17 (partial) | Use march description, not crackdown |
| Nov 17 18:30 Police suppress | n17 (partial) | Use crackdown description |
| Nov 17 22:00 Student killed rumor | n17 (partial) | Use Šmíd rumor framing |
| Nov 18 14:00 Theatre strikes | n18 | Good match — theatres + student strike |
| Nov 19 10:00 Civic Forum forms | n19 | Good match — Činoherní Klub founding |
| Nov 20 16:00 Massive demonstration | n20 | Good match — 200K in Wenceslas |
| Nov 24 11:00 Leadership resigns | n24 | Good match — Jakeš resignation |
| Nov 26 13:00 Letná rally | n25 | Good match — 800K on Letná |
| Nov 27 12:00 General strike | n27 | Good match — nationwide strike |

**Events needing new narrative (26):** All others. Write in the same style: specific Prague locations, named individuals where historically documented, sensory details (sounds, weather, crowds), and choice labels that read like editorial decisions ("RUN THE STORY", "HOLD THE PAGE", "BURY IT ON PAGE FOUR").

**Complete event list with stat values:**

```
 # | Date/Time         | Description                                        | Choice 1 deltas (P/S/F/C)    | Choice 2 deltas              | Choice 3 deltas
 1 | Nov 17 08:00      | University students discuss planned demonstrations  | +20/+5/+10/+15              | 0/0/0/0                      | -10/-10/+10/-15
 2 | Nov 17 10:00      | Government memorial coverage released               | -20/-20/+10/-10             | +30/+25/0/+5                | 0/0/0/0
 3 | Nov 17 14:00      | Student organizers distribute protest routes         | +40/+25/+10/0              | +35/+35/0/+10               | -10/-10/0/0
 4 | Nov 17 16:00      | Student march begins in Prague [15K]                | +80/+45/+30/+10            | +40/+10/+10/+10             | -40/-20/0/-10
 5 | Nov 17 18:30      | Police suppress at Národní třída [15K]              | +150/+90/+40/+30           | +60/+20/+10/-10             | -80/-40/+10/-30
 6 | Nov 17 20:00      | Witness testimonies emerge from protest              | +70/+35/+20/+30            | +40/+10/0/+40               | -40/-20/0/-20
 7 | Nov 17 21:00      | Hospitals receive injured protesters                 | +80/+40/+20/+20            | +20/0/0/+10                 | -30/-10/0/-10
 8 | Nov 17 22:00      | Rumor spreads that student was killed                | +120/+70/+40/-60           | +60/+30/+10/-10             | -20/0/0/+10
 9 | Nov 18 07:00      | Government claims police acted peacefully            | -50/-40/+10/-30            | +90/+50/+20/+30             | 0/0/0/0
10 | Nov 18 09:00      | Underground flyers spread across universities        | +50/+30/+20/+10            | +20/0/0/+20                 | -30/-20/+10/-20
11 | Nov 18 11:00      | Foreign radio stations report crackdown              | +60/+30/+20/+20            | -20/-10/+10/-10             | 0/0/0/0
12 | Nov 18 14:00      | Theatre groups discuss strikes                       | +50/+20/+20/+10            | +20/0/0/+10                 | -40/-20/0/-20
13 | Nov 18 18:00      | Small public gatherings form around Prague           | +70/+40/+20/0              | +30/+10/0/+10               | -50/-20/0/-20
14 | Nov 19 10:00      | Civic Forum forms [500]                             | +100/+60/+40/+20           | +50/+20/+10/+10             | -60/-30/+10/-40
15 | Nov 19 13:00      | Dissidents offer exclusive interviews                | +60/+40/+30/+30            | +30/+10/+10/0               | -20/0/0/-10
16 | Nov 19 17:00      | Student strike committees organize nationally        | +80/+50/+20/+10            | +40/+10/0/+10               | -50/-20/0/-20
17 | Nov 19 20:00      | Secret police increase surveillance on journalists   | +50/+60/0/+20              | -20/-40/+10/0               | -60/-60/+10/-30
18 | Nov 20 12:00      | Factory workers discuss joining protests             | +70/+40/+20/+10            | +30/0/0/+10                 | -60/-30/0/-20
19 | Nov 20 16:00      | Massive Prague demonstration [100K]                  | +180/+100/+50/+20          | +100/+30/+20/+10            | -100/-40/0/-30
20 | Nov 20 18:00      | Protesters begin jingling keys                       | +40/0/+20/+10              | -30/0/0/-20                 | 0/0/0/0
21 | Nov 20 22:00      | Government debates stronger suppression              | +70/+50/+20/+20            | -10/-20/0/0                 | -50/-40/0/-20
22 | Nov 21 09:00      | Independent newspapers support demonstrations        | +60/+30/+40/+20            | 0/0/0/+10                   | -40/0/+10/-20
23 | Nov 21 15:00      | Demonstrations continue growing [200K]               | +200/+110/+60/+20          | +100/+30/+20/+10            | -120/-50/0/-30
24 | Nov 21 19:00      | Foreign media amplifies revolution coverage          | +60/+30/+30/+10            | -40/-20/0/-20               | 0/0/0/0
25 | Nov 22 08:00      | Universities officially support strike action        | +80/+40/+20/+10            | +40/0/0/+10                 | -50/-20/0/-20
26 | Nov 22 14:00      | Worker unions negotiate protest participation        | +90/+50/+20/+10            | +20/0/0/+10                 | -60/-20/0/-20
27 | Nov 22 18:00      | Evening demonstrations in Wenceslas Square [250K]    | +160/+80/+40/+10           | +80/+20/+20/+10             | -100/-40/0/-30
28 | Nov 24 11:00      | Communist Party leadership resigns [300K]            | +140/+60/+50/+10           | +70/+10/0/+10               | -70/-40/0/-20
29 | Nov 24 15:00      | Public celebrations erupt across Prague              | +70/+20/+30/+10            | +30/0/+10/0                 | -40/-20/0/-10
30 | Nov 24 21:00      | Government broadcasts promises of reform             | -20/-20/+10/0              | +50/+30/0/+20               | +30/+40/0/+10
31 | Nov 26 13:00      | Massive Letná Plain rally [750K]                     | +250/+120/+70/+20          | +140/+40/+30/+10            | -150/-60/0/-40
32 | Nov 27 12:00      | Nationwide general strike begins [2M]                | +300/+150/+80/+20          | +150/+50/+20/+10            | -180/-70/0/-50
33 | Nov 27 14:00      | Strike successfully halts much of the country        | +120/+40/+40/+10           | +40/0/0/+10                 | -80/-30/0/-30
34 | Dec 10 16:00      | Non-communist government formed [500K]               | +100/+20/+50/+20           | +50/0/0/+10                 | -100/0/+10/-50
35 | Dec 29 17:00      | Václav Havel elected president [300K]                | +150/0/+50/+30             | 0/0/+40/+20                 | -120/0/+10/-60
```

**Style guide for new narrative:**
- Headlines: 4-8 words, no articles, present tense or noun phrases ("Workers Walk Out", "The Square Fills")
- Kickers: 1 sentence, italic feel, often a quote or dramatic statement
- Body: 2-4 sentences. Specific locations (Albertov, Národní, Wenceslas, Letná). Real names when historically documented. Sensory details.
- Choice labels: ALL CAPS, 2-5 words, imperative voice ("RUN THE STORY", "HOLD THE PAGE", "PRINT THE OFFICIAL LINE")
- Choice drafts: 1-2 sentences, first person plural ("We"), describes what the paper would print
- Outcomes: 1 sentence, past tense, describes the consequence

- [ ] **Step 3: Verify events load**

Open `index.html`, open console, type `VR_EVENTS.length`. Expected: `35`. Play through the first few events to verify rendering.

- [ ] **Step 4: Commit**

```bash
git add events.js
git commit -m "Add all 35 historical events with narrative text and stat values"
```

---

### Task 11: Balancing Pass

**Files:**
- Modify: `events.js` (adjust stat values as needed)
- Create: `BALANCE_LOG.md`

- [ ] **Step 1: Simulate aggressive playthrough**

Write a temporary simulation function and run it in the console:

```js
function simulate(strategy) {
  var stats = { pressure: 0, suspicion: 0, fame: 100, credibility: 100 };
  var events = window.VR_EVENTS;
  var log = [];

  for (var i = 0; i < events.length; i++) {
    var choices = events[i].choices;
    var choice;

    if (strategy === "aggressive") {
      choice = choices.reduce(function(best, c) {
        return (c.deltas.pressure || 0) > (best.deltas.pressure || 0) ? c : best;
      });
    } else if (strategy === "cautious") {
      choice = choices.reduce(function(best, c) {
        return (c.deltas.suspicion || 0) < (best.deltas.suspicion || 0) ? c : best;
      });
    } else if (strategy === "progovt") {
      choice = choices.reduce(function(best, c) {
        return (c.deltas.pressure || 0) < (best.deltas.pressure || 0) ? c : best;
      });
    } else {
      // balanced: pick highest P where S < 60
      choice = choices.reduce(function(best, c) {
        if ((c.deltas.suspicion || 0) > 60) return best;
        return (c.deltas.pressure || 0) > (best.deltas.pressure || 0) ? c : best;
      });
    }

    var result = applyDeltas(stats, choice.deltas);
    stats = result.stats;
    log.push({
      event: i + 1,
      id: events[i].id,
      choice: choice.id,
      P: stats.pressure,
      S: stats.suspicion,
      F: stats.fame,
      C: stats.credibility,
      shutdown: stats.suspicion >= 1000
    });

    if (stats.suspicion >= 1000) {
      console.log(strategy + ": SHUTDOWN at event " + (i + 1));
      break;
    }
  }

  console.log(strategy + " final:", stats);
  console.log(strategy + " P>=1000:", stats.pressure >= 1000);
  console.table(log);
  return { stats: stats, log: log };
}
```

Run in console:
```js
simulate("aggressive");
simulate("cautious");
simulate("balanced");
simulate("progovt");
```

- [ ] **Step 2: Verify balancing goals are met**

Check these conditions:
1. **Aggressive:** Should reach P>=1000 but also trigger S>=1000 shutdown (or come very close). If aggressive play wins easily without shutdown risk, increase S values on high-P choices.
2. **Cautious:** Should survive to Dec 29 with S well under 1000, but P should be under 1000 (ideally 400-700). If cautious play wins, reduce P values on low-S choices.
3. **Balanced:** Should have a path to P>=1000 without triggering S>=1000, but it should be tight (not guaranteed). If balanced play always wins easily, reduce P or increase S. If it never wins, increase P.
4. **Pro-government:** P should be very low (under 300). S should be very low. This path should always reach "The Masthead Folds" ending.

- [ ] **Step 3: Adjust stat values in events.js**

Based on simulation results, adjust individual event deltas. Common adjustments:
- If aggressive play never triggers shutdown: increase S on the top 5 highest-P choices
- If balanced play can't reach 1000P: increase P on mid-range choices (the ones balanced play picks)
- If the combined multiplier causes snowballing: reduce base P on late-game Big Events
- If passive suspicion makes everything unwinnable: reduce the passive suspicion thresholds or amounts

- [ ] **Step 4: Re-run simulations to verify adjustments**

Run all four `simulate()` calls again. Iterate until the goals are met.

- [ ] **Step 5: Create BALANCE_LOG.md**

Document all changes:

```markdown
# Balance Log

## Methodology
Ran automated simulations for 4 strategy archetypes (aggressive, cautious, balanced, pro-government).
Adjusted stat values to meet these goals:
- Aggressive: can win but risks shutdown
- Cautious: survives but can't win
- Balanced: narrow viable path to legacy ending
- Pro-government: very low P, low S

## Adjustments

| Event | Choice | Stat | Original | New | Reason |
|-------|--------|------|----------|-----|--------|
| (fill in based on actual adjustments) |

## Simulation Results (Post-Balance)

### Aggressive
- Final P: ___
- Final S: ___ (shutdown at event ___?)
- Outcome: ___

### Cautious
- Final P: ___
- Final S: ___
- Outcome: ___

### Balanced
- Final P: ___
- Final S: ___
- Outcome: ___

### Pro-Government
- Final P: ___
- Final S: ___
- Outcome: ___
```

- [ ] **Step 6: Commit**

```bash
git add events.js BALANCE_LOG.md
git commit -m "Balance stat values — document simulation results and adjustments"
```

---

### Task 12: Browser Integration Test

**Files:** None (read-only testing)

- [ ] **Step 1: Full playthrough test**

Open `index.html` in a browser. Play through the entire game making balanced choices. Verify:

1. Start screen renders with masthead, stat ticker, intro text, begin button
2. Each event shows: dateline, headline, kicker, body text, attendance badge (Big Events)
3. Choices show: draft number, label, draft text, stat impact pills
4. Outcome shows: stamp animation, choice title, outcome text, stat deltas, calculation breakdown, passive suspicion note
5. Calendar strip updates: past events dim, current event highlighted
6. Stats update correctly: values change, bars animate, annotations appear
7. At S>=600: censor banner appears
8. At S>=800: random words redacted in body text
9. At S>=900: paper border pulses red
10. Final event leads to legacy/ranked screen (depending on P)
11. Restart button works, localStorage cleared

- [ ] **Step 2: Test shutdown ending**

Replay, making aggressive choices to trigger S>=1000. Verify:
- Game transitions to shutdown screen immediately when S hits 1000
- Shutdown text acknowledges revolution succeeded
- Restart works

- [ ] **Step 3: Test localStorage persistence**

Mid-game, close the browser tab. Reopen `index.html`. Verify the game resumes where you left off with correct stats.

- [ ] **Step 4: Test responsive layout**

Resize browser to <880px width. Verify:
- Two-column layout collapses to single column
- Paper padding reduces
- Headlines scale down
- Calendar strip scrolls horizontally
- All text remains readable

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "Fix integration issues found during testing"
```

---

## Post-Implementation

After all tasks are complete, the game should be deployable to GitHub Pages by pushing to `main`. The teacher can open the URL and play immediately — no build step required.

To deploy:
```bash
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in the repo settings (Settings → Pages → Source: main branch, root folder).
