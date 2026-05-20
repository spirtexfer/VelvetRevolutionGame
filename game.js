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
  if (susp >= 800) return 1.80;
  if (susp >= 600) return 1.50;
  if (susp >= 400) return 1.25;
  if (susp >= 200) return 1.10;
  return 1.00;
}

function getPassiveSuspicion(fame, cred) {
  var combined = fame + cred;
  if (combined >= 1000) return 35;
  if (combined >= 700)  return 20;
  if (combined >= 400)  return 10;
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

  // Pressure: multiply positive gains by Fame × Credibility (capped at 1.40)
  var baseP = baseDelta.pressure || 0;
  if (baseP > 0) {
    var fameMult = getFameMultiplier(stats.fame);
    var credMult = getCredibilityMultiplier(stats.credibility);
    var combinedMult = Math.min(fameMult * credMult, 1.40);
    actualDeltas.pressure = Math.round(baseP * combinedMult);
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

  // Test 3: Suspicion multiplier brackets (steep curve)
  console.assert(getSuspicionMultiplier(100) === 1.00, "Susp 100 → 1.00");
  console.assert(getSuspicionMultiplier(300) === 1.10, "Susp 300 → 1.10");
  console.assert(getSuspicionMultiplier(500) === 1.25, "Susp 500 → 1.25");
  console.assert(getSuspicionMultiplier(700) === 1.50, "Susp 700 → 1.50");
  console.assert(getSuspicionMultiplier(900) === 1.80, "Susp 900 → 1.80");

  // Test 4: Passive suspicion
  console.assert(getPassiveSuspicion(100, 100) === 0,  "F100+C100 → 0 passive");
  console.assert(getPassiveSuspicion(200, 200) === 10, "F200+C200 → 10 passive");
  console.assert(getPassiveSuspicion(400, 300) === 20, "F400+C300 → 20 passive");
  console.assert(getPassiveSuspicion(600, 500) === 35, "F600+C500 → 35 passive");

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
    history: [],
    endingType: null
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

/* ═══════════════════════════════════════════════════════════════
   STAT TICKER
   ═══════════════════════════════════════════════════════════════ */

function renderStatTicker(container) {
  var ticker = el("div", "stat-ticker");
  ticker.setAttribute("aria-live", "polite");
  ticker.setAttribute("aria-label", "Game statistics");
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

    var maxVal = 1000;
    var pct = Math.min(100, (v / maxVal) * 100);

    var multText = getMultiplierDisplay(k, v);
    var valueRow = el("div", "stat-value-row", [
      el("div", "stat-value", String(Math.round(v)))
    ]);
    if (multText) {
      valueRow.appendChild(el("div", "stat-multiplier", "[ " + multText + " ]"));
    }

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

/* ═══════════════════════════════════════════════════════════════
   CALENDAR STRIP
   ═══════════════════════════════════════════════════════════════ */

function renderCalendarStrip(container) {
  var events = window.VR_EVENTS;
  var strip = el("div", "calendar-strip");
  var lastDate = "";

  for (var i = 0; i < events.length; i++) {
    var shortLabel = extractShortDate(events[i].date);
    var isNewDay = shortLabel !== lastDate;
    lastDate = shortLabel;

    var cls = "cal-tick";
    if (!isNewDay) cls += " cal-tick-minor";
    if (isNewDay && i > 0) cls += " cal-day-start";
    if (i < gameState.eventIndex) cls += " past";
    if (i === gameState.eventIndex) cls += " current";

    var tick = el("div", cls, isNewDay ? shortLabel : "");
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
      var wouldExceed = applyDeltas(gameState.stats, choice.deltas).stats.suspicion >= 1000;
      var btn = el("button", "choice fade-up" + (wouldExceed ? " danger-suspicion" : ""));
      btn.setAttribute("aria-label", choice.label + " — " + choice.draft);
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
    transitionToEnding("loss");
    return;
  }

  gameState.phase = "outcome";
  render();
}

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
    if (gameState.stats.pressure >= 1000) {
      gameState.phase = "legacy";
      transitionToEnding("win");
    } else {
      gameState.phase = "ranked";
      var isGoodRank = gameState.stats.pressure >= 800 && gameState.stats.credibility >= 50;
      transitionToEnding(isGoodRank ? "win" : "loss");
    }
  } else {
    gameState.eventIndex++;
    gameState.chosenAction = null;
    gameState.lastDeltas = {};
    gameState.breakdown = {};
    gameState.passiveSuspicion = 0;
    gameState.phase = "event";
    render();
  }
}

function transitionToEnding(type) {
  var overlay = document.createElement("div");
  overlay.className = "ending-overlay " + (type === "win" ? "ending-win" : "ending-loss");
  document.body.appendChild(overlay);
  requestAnimationFrame(function() { overlay.classList.add("active"); });
  setTimeout(function() {
    gameState.endingType = type;
    render();
    setTimeout(function() {
      overlay.classList.add("fade-out");
      setTimeout(function() { overlay.remove(); }, 800);
    }, 300);
  }, 1500);
}

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
  var scoreDiv = el("div", "final-score");
  scoreDiv.appendChild(el("div", "final-score-label", "Final Pressure"));
  scoreDiv.appendChild(el("div", "final-score-value", String(Math.round(gameState.stats.pressure))));

  var secondaryStats = el("div", "final-stats-secondary");
  var others = ["suspicion", "fame", "credibility"];
  for (var i = 0; i < others.length; i++) {
    var k = others[i];
    secondaryStats.appendChild(el("span", "final-stat-item",
      STAT_META[k].label + " " + Math.round(gameState.stats[k])));
  }
  scoreDiv.appendChild(secondaryStats);
  card.appendChild(scoreDiv);
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

/* ═══════════════════════════════════════════════════════════════
   RENDER DISPATCHER
   ═══════════════════════════════════════════════════════════════ */

var _footer = null;

function render() {
  var paper = document.getElementById("paper");
  var endCls = gameState.endingType ? " ending-" + gameState.endingType : "";
  paper.className = "paper" + (gameState.stats.suspicion >= 900 ? " danger" : "") + endCls;

  var events = window.VR_EVENTS;
  var event = events[gameState.eventIndex];
  var dateline = event ? event.date : "PRAGUE — DECEMBER 29, 1989";
  var issueNumber = gameState.eventIndex + 1;

  var fragment = document.createDocumentFragment();

  renderMasthead(fragment, issueNumber, dateline);
  renderStatTicker(fragment);

  if (gameState.phase !== "start" && gameState.phase !== "legacy" &&
      gameState.phase !== "shutdown" && gameState.phase !== "ranked") {
    renderCalendarStrip(fragment);
  }

  switch (gameState.phase) {
    case "start":    renderStart(fragment); break;
    case "event":    renderEvent(fragment); break;
    case "outcome":  renderOutcome(fragment); break;
    case "legacy":   renderLegacy(fragment); break;
    case "shutdown": renderShutdown(fragment); break;
    case "ranked":   renderRanked(fragment); break;
  }

  if (!_footer) {
    _footer = elHTML("footer", "deck",
      '<div class="deck-item"><div class="deck-label">Editor in Chief</div>J. Procházková</div>' +
      '<div class="deck-item"><div class="deck-label">Printer of record</div>mimeograph № 4 · Žižkov</div>' +
      '<div class="deck-item"><div class="deck-label">Issued under</div>no permit · no imprint · no quarter</div>'
    );
  }
  fragment.appendChild(_footer);

  paper.innerHTML = "";
  paper.appendChild(fragment);
  saveState();
}

/* ═══════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════ */

function init() {
  loadState();
  render();
}

window.addEventListener("DOMContentLoaded", init);
