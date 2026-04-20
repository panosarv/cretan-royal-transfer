# Pricing Fix Design Spec
**Date:** 2026-04-21
**Project:** Cretan Royal Transfer

---

## Overview

Two surgical changes to fix the pricing calculation:
1. Rename `GERANI` → `GERANI_RETH` in the PRICING table and add normalization for it
2. Add `Heraklion Port` and `Chania Port` as selectable transfer locations

---

## Changes

### File 1: `src/stores/booking.js`

**Normalize function** — add one line for Gerani:

```js
const normalize = (loc) => {
  if (!loc) return null
  if (loc.includes('Heraklion')) return 'HERAKLION'  // covers Airport + Port
  if (loc.includes('Chania')) return 'CHANIA'          // covers Airport + Port
  if (loc.includes('Gerani')) return 'GERANI_RETH'    // ← new
  return loc.toUpperCase()
}
```

**PRICING table** — rename `GERANI` → `GERANI_RETH` in both top-level keys:

```js
const PRICING = {
  HERAKLION: {
    RETHYMNO:    { upTo4: 87,  upTo8: 134, upTo14: 170 },
    BALI:        { upTo4: 68,  upTo8: 87,  upTo14: 130 },
    PANORMO:     { upTo4: 82,  upTo8: 115, upTo14: 150 },
    GERANI_RETH: { upTo4: 95,  upTo8: 130, upTo14: 190 },  // ← renamed
    KAVROS:      { upTo4: 110, upTo8: 147, upTo14: 205 },
    GEORGIOUPOLI:{ upTo4: 115, upTo8: 152, upTo14: 210 },
    CHANIA:      { upTo4: 165, upTo8: 225, upTo14: 280 },
    PLAKIAS:     { upTo4: 125, upTo8: 155, upTo14: 220 },
    SFAKIA:      { upTo4: 150, upTo8: 192, upTo14: 265 }
  },
  CHANIA: {
    RETHYMNO:    { upTo4: 87,  upTo8: 134, upTo14: 170 },
    BALI:        { upTo4: 115, upTo8: 148, upTo14: 220 },
    PANORMO:     { upTo4: 105, upTo8: 139, upTo14: 185 },
    GERANI_RETH: { upTo4: 82,  upTo8: 120, upTo14: 160 },  // ← renamed
    KAVROS:      { upTo4: 70,  upTo8: 92,  upTo14: 135 },
    GEORGIOUPOLI:{ upTo4: 70,  upTo8: 92,  upTo14: 135 },
    HERAKLION:   { upTo4: 165, upTo8: 225, upTo14: 280 },
    PLAKIAS:     { upTo4: 119, upTo8: 149, upTo14: 220 },
    SFAKIA:      { upTo4: 130, upTo8: 162, upTo14: 235 }
  }
}
```

Bidirectional lookup already works via `PRICING[from]?.[to] || PRICING[to]?.[from]` — no change needed there.

---

### File 2: `src/components/booking/StepRoute.vue`

**Transfer locations array** — add Port options:

```js
const transferLocations = [
  'Heraklion Airport',
  'Heraklion Port',
  'Chania Airport',
  'Chania Port',
  'Rethymno',
  'Bali',
  'Panormo',
  'Gerani',
  'Kavros',
  'Georgioupoli',
  'Plakias',
  'Sfakia'
]
```

Port options normalize correctly via the existing `includes('Heraklion')` / `includes('Chania')` checks. No additional normalization needed.

---

## Out of Scope

- No changes to passenger tier logic (≤4, ≤8, ≤14, else null)
- No changes to tour pricing (still always null)
- No UI changes beyond the dropdown list
