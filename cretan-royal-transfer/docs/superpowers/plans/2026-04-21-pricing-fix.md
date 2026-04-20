# Pricing Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the pricing calculator to use `GERANI_RETH` as the correct key, add Gerani normalization, and add Heraklion Port / Chania Port as selectable transfer locations.

**Architecture:** Two surgical edits — one to the Pinia store (`calculatePrice` normalize function + PRICING table keys), one to the StepRoute component (transfer locations array). No new files, no structural changes.

**Tech Stack:** Vue 3, Pinia, Vite

---

## File Map

| Action | Path | What changes |
|--------|------|-------------|
| Modify | `src/stores/booking.js` | Add Gerani normalization, rename GERANI → GERANI_RETH in PRICING table |
| Modify | `src/components/booking/StepRoute.vue` | Add 'Heraklion Port' and 'Chania Port' to transferLocations array |

---

## Task 1: Fix PRICING table and normalize function in booking store

**Files:**
- Modify: `src/stores/booking.js`

- [ ] **Step 1: Update `calculatePrice` in `src/stores/booking.js`**

Replace the entire `calculatePrice` action with the following. The only changes are: (a) one new line in `normalize` for Gerani, (b) `GERANI` renamed to `GERANI_RETH` in both PRICING sections.

```js
calculatePrice() {
  if (this.type === 'tour') {
    this.price = null
    return
  }

  const normalize = (loc) => {
    if (!loc) return null
    if (loc.includes('Heraklion')) return 'HERAKLION'
    if (loc.includes('Chania')) return 'CHANIA'
    if (loc.includes('Gerani')) return 'GERANI_RETH'
    return loc.toUpperCase()
  }

  const PRICING = {
    HERAKLION: {
      RETHYMNO:     { upTo4: 87,  upTo8: 134, upTo14: 170 },
      BALI:         { upTo4: 68,  upTo8: 87,  upTo14: 130 },
      PANORMO:      { upTo4: 82,  upTo8: 115, upTo14: 150 },
      GERANI_RETH:  { upTo4: 95,  upTo8: 130, upTo14: 190 },
      KAVROS:       { upTo4: 110, upTo8: 147, upTo14: 205 },
      GEORGIOUPOLI: { upTo4: 115, upTo8: 152, upTo14: 210 },
      CHANIA:       { upTo4: 165, upTo8: 225, upTo14: 280 },
      PLAKIAS:      { upTo4: 125, upTo8: 155, upTo14: 220 },
      SFAKIA:       { upTo4: 150, upTo8: 192, upTo14: 265 }
    },
    CHANIA: {
      RETHYMNO:     { upTo4: 87,  upTo8: 134, upTo14: 170 },
      BALI:         { upTo4: 115, upTo8: 148, upTo14: 220 },
      PANORMO:      { upTo4: 105, upTo8: 139, upTo14: 185 },
      GERANI_RETH:  { upTo4: 82,  upTo8: 120, upTo14: 160 },
      KAVROS:       { upTo4: 70,  upTo8: 92,  upTo14: 135 },
      GEORGIOUPOLI: { upTo4: 70,  upTo8: 92,  upTo14: 135 },
      HERAKLION:    { upTo4: 165, upTo8: 225, upTo14: 280 },
      PLAKIAS:      { upTo4: 119, upTo8: 149, upTo14: 220 },
      SFAKIA:       { upTo4: 130, upTo8: 162, upTo14: 235 }
    }
  }

  const from = normalize(this.pickup)
  const to = normalize(this.dropoff)

  const route = PRICING[from]?.[to] || PRICING[to]?.[from]

  if (!route) {
    this.price = null
    return
  }

  if (this.passengers <= 4) this.price = route.upTo4
  else if (this.passengers <= 8) this.price = route.upTo8
  else if (this.passengers <= 14) this.price = route.upTo14
  else this.price = null
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd "c:/Users/Ryzen/Desktop/Cretan Royal Transfer/cretan-royal-transfer"
npm run build
```

Expected: no errors, `✓ built in` message.

- [ ] **Step 3: Commit**

```bash
git add src/stores/booking.js
git commit -m "fix: rename GERANI to GERANI_RETH and add Gerani normalization"
```

---

## Task 2: Add Port locations to StepRoute transfer dropdown

**Files:**
- Modify: `src/components/booking/StepRoute.vue`

- [ ] **Step 1: Update `transferLocations` in `src/components/booking/StepRoute.vue`**

Replace the existing `transferLocations` array (currently lines 7–18) with:

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

No other changes needed — `'Heraklion Port'` normalizes to `HERAKLION` via `includes('Heraklion')` and `'Chania Port'` normalizes to `CHANIA` via `includes('Chania')`.

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/booking/StepRoute.vue
git commit -m "feat: add Heraklion Port and Chania Port to transfer locations"
```

---

## Spec Coverage Check

| Requirement | Task |
|---|---|
| GERANI renamed to GERANI_RETH in PRICING table | Task 1 |
| `normalize` handles Gerani → GERANI_RETH | Task 1 |
| Port Heraklion / Port Chania normalize to HERAKLION / CHANIA | Task 1 (via existing `includes` — confirmed working) |
| Heraklion Port + Chania Port appear in dropdown | Task 2 |
| Bidirectional lookup (PRICING[from][to] \|\| PRICING[to][from]) | Already implemented — no change needed |
| Passenger tier logic unchanged | Confirmed — not touched |
