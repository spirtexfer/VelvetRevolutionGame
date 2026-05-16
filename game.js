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
