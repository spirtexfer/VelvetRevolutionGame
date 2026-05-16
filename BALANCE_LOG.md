# Balance Log

## Methodology

Ran automated simulations for 4 strategy archetypes plus 2 hybrid strategies.
Adjusted stat values using uniform scaling factors to meet the design spec's balancing goals.

### Strategy Definitions

- **Aggressive:** Always pick Choice 1 (highest base Pressure)
- **Balanced:** Pick Choice 1 when Suspicion < 400 and Choice 1's S <= 25; otherwise pick Choice 2
- **Cautious:** Always pick the lowest-Suspicion choice
- **Pro-government:** Always pick the last choice (lowest/negative Pressure)
- **C2-only:** Always pick Choice 2 (moderate option)

### Balancing Goals (from spec)

1. Aggressive: Can win (P>=1000) but risks S>=1000 shutdown
2. Cautious: Survives to Dec 29 but cannot reach P>=1000
3. Balanced: Narrow viable path to Legacy ending (P>=1000)
4. Pro-government: Very low P, very low S

## Scaling Applied

The original stat values from the design doc were calibrated without accounting for the compounding effect of Fame and Credibility multipliers on Pressure, and the Suspicion multiplier on Suspicion gains. The multiplier system caused severe snowballing:

- **Pre-balance aggressive:** P=1953, S=1049 (SHUTDOWN at event 19/35)
- **Pre-balance balanced:** P=2392, S=1024 (SHUTDOWN at event 27/35 — should survive)

### Scaling Factors

| Stat | Choice | Factor | Reason |
|------|--------|--------|--------|
| Pressure (positive) | All | ×0.42 | Combined Fame×Credibility multiplier reaches ×2.32 at high stats; base P must be reduced to prevent snowball |
| Suspicion (positive) | Choice 1 | ×0.70 | Aggressive choices remain dangerous but don't instantly kill |
| Suspicion (positive) | Choice 2/3 | ×0.45 | Moderate/cautious choices must allow survival for balanced players |
| Pressure (negative) | All | unchanged | Penalties should remain punishing |
| Suspicion (negative) | All | unchanged | Suspicion reduction is valuable and shouldn't be inflated |
| Fame | All | unchanged | Fame growth drives multiplier curve naturally |
| Credibility | All | unchanged | Credibility growth drives multiplier curve naturally |

## Simulation Results (Post-Balance)

### Aggressive
- Final P: 1220 (at shutdown)
- Final S: 1031 → **SHUTDOWN at event 25**
- Outcome: High pressure built up but StB catches the paper. Matches goal.

### Balanced (smart switching)
- Final P: 1000
- Final S: 348
- Outcome: **LEGACY** — barely reaches the threshold with razor-thin margin. One suboptimal choice and the player misses it. Matches "narrow viable path" goal.

### C2-Only (always moderate)
- Final P: 675
- Final S: 224
- Outcome: **FOOTNOTE** — a player who never takes risks gets a middle-tier ending. Incentivizes strategic risk-taking.

### Cautious (minimize suspicion)
- Final P: 48
- Final S: 0
- Outcome: **FOLDS** — safe but useless. The paper contributed nothing.

### Pro-Government
- Final P: 0
- Final S: 0
- Outcome: **FOLDS** — complete silence. History doesn't record what you chose not to print.

## Key Balance Properties

1. **Multiplier snowball is controlled:** Even at high F/C, the reduced base P keeps total pressure manageable
2. **Passive suspicion matters but doesn't kill:** Balanced play reaches F+C ~995 by endgame, adding +10 passive S per turn — significant but survivable
3. **Aggressive vs balanced gap:** Aggressive play accumulates ~3× more suspicion than balanced, creating a clear risk/reward tradeoff
4. **Late-game tension preserved:** The biggest P gains come from late Big Events (Letná +105, General Strike +126) where multipliers are highest — the final push is where it gets exciting
5. **No unwinnable death spirals:** Balanced play's S=348 at endgame means there's real headroom for a few mistakes
