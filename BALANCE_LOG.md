# Balance Log

## Problem

Player reported winning by spamming random options. Monte Carlo analysis confirmed: with the original uniform ×0.42 P scaling, 50/50 C1/C2 play won 76% of the time. Root cause: C2 choices gave too much pressure, and the Fame×Credibility multiplier snowballed unchecked.

## Final Balance Parameters

### Event Scaling (applied to original design-doc values)

| Stat | Choice | Factor | Reason |
|------|--------|--------|--------|
| Pressure (positive) | C1, big event (has attendance) | ×0.65 | Big events are the primary P source; ratio ~2:1 P/S makes them the strategic pick |
| Pressure (positive) | C1, small event | ×0.30 | Small events give modest P; not worth the S cost in late game |
| Pressure (positive) | C2/C3 | ×0.06 | Near-zero P so spamming C2 doesn't snowball into a win |
| Suspicion (positive) | C1 | ×0.55 | C1 carries real risk; combined with steep multiplier, punishes late-game C1 picks |
| Suspicion (positive) | C2/C3 | ×0.10 | C2 is the "safe" option — minimal S cost |
| Pressure (negative) | All | unchanged | Penalties should remain punishing |
| Suspicion (negative) | All | unchanged | S reduction is valuable and shouldn't be inflated |
| Fame | All | unchanged | |
| Credibility | All | unchanged | |

"Big event" = any event with an `attendance` field (11 of 35 events).

### Game Engine Parameters

| Parameter | Value | Reason |
|-----------|-------|--------|
| Pressure multiplier cap | ×1.40 | Prevents Fame×Cred snowball while still rewarding stat growth |
| Suspicion multiplier curve | 1.00 / 1.10 / 1.25 / 1.50 / 1.80 | Steep: punishes C1 picks at high S; differentiates smart vs random play |
| S multiplier thresholds | 0 / 200 / 400 / 600 / 800 | |
| Passive suspicion | +0 / +10 / +20 / +35 | Higher than design doc; creates time pressure in late game |
| Passive S thresholds (F+C) | 0 / 400 / 700 / 1000 | |

## Monte Carlo Results (10,000 runs each)

### Deterministic Strategies

| Strategy | Ending | Final P | Final S | Notes |
|----------|--------|---------|---------|-------|
| Big-events-only (optimal) | LEGACY | 1562 | 940 | Comfortable win with margin for ~2 mistakes |
| Aggressive (always C1) | SHUTDOWN | 993 | 1017 | Shutdown at event 26/35 |
| Cautious (lowest S) | FOLDS | 58 | 0 | Safe but useless |
| C2-only | FOLDS | 55 | 181 | Trivial P from C2 choices |
| Pro-government (always C3) | FOLDS | 0 | 0 | Complete silence |

### Stochastic Strategies

| Strategy | Win Rate | Shutdown Rate | Notes |
|----------|----------|---------------|-------|
| Random (uniform 3-way) | 0.6% | 0.1% | C3 picks tank pressure |
| 50/50 (C1 or C2) | 23% | 32% | Borderline; most runs get FOOTNOTE |
| 70/30 C1-biased | 7% | 89% | Overwhelming shutdown rate |

## Key Balance Properties

1. **Winning strategy is learnable**: pick C1 on big crowd events, C2 on everything else. Player can identify big events from narrative context (protests, rallies).
2. **Random spam doesn't work**: uniform random wins 0.6%, down from 76% pre-balance.
3. **50/50 spam is borderline**: 23% win rate means most random C1/C2 play ends in FOOTNOTE or SHUTDOWN.
4. **Late-game tension**: biggest P gains come from Letná (163) and General Strike (195), where S is already high. Last two events (Dec 10, Dec 29) have near-zero S cost as reward events.
5. **Passive S creates time pressure**: +35 S per turn at high Fame+Credibility means even C2 picks aren't free in late game.
6. **Margin for error**: optimal play reaches P=1562, so player can miss ~2 big events and still win.

## Methodology

Tested 30+ configurations across these dimensions:
- Big/small C1 P scaling (0.25–0.80)
- C2/C3 P scaling (0.03–0.10)
- C1/C2 S scaling (0.40–0.60 / 0.00–0.45)
- Pressure multiplier cap (1.30–1.50)
- S multiplier curves (mild/moderate/steep/very-steep)
- Passive S amounts (original through 4× original)

Each config validated with 10,000-run Monte Carlo simulations for random, 50/50, and 70/30 strategies, plus deterministic traces for optimal, aggressive, cautious, and pro-government play.
