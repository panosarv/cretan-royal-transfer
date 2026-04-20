# Booking Wizard Design Spec
**Date:** 2026-04-21  
**Project:** Cretan Royal Transfer

---

## Overview

Replace the existing flat `BookingForm.vue` with a 5-step booking wizard using Vue 3 Composition API, Pinia for state, Tailwind CSS for styling, and Formspree for form submission. No backend required.

---

## Architecture

### Approach
Single wizard orchestrator (`BookingWizard.vue`) with branching step components based on booking type. Shared final steps (Summary, User Info). Pinia store is the single source of truth.

### File Structure

```
src/
  stores/
    booking.js              ← Pinia store
  components/
    booking/
      BookingWizard.vue     ← Orchestrator: renders current step component
      WizardProgress.vue    ← Progress bar / step indicator (shared)
      StepType.vue          ← Step 1: Tour or Transfer selection
      StepRoute.vue         ← Step 2: Transfer = dropdowns; Tour = list + free text
      StepDetails.vue       ← Step 3: passengers, luggage, baby seats, date, time
      StepSummary.vue       ← Step 4: read-only review + price
      StepUser.vue          ← Step 5: user info + Formspree POST
  pages/
    Book.vue                ← Thin wrapper mounting <BookingWizard />
  main.js                   ← Add createPinia()
  index.html                ← Add OpenWidget script before </body>
```

`BookingForm.vue` is retired (can be deleted after implementation).

---

## State Management

### Pinia Store (`stores/booking.js`)

```js
state: {
  step: 1,
  type: null,               // 'transfer' | 'tour'

  // Transfer fields
  pickup: '',
  dropoff: '',
  pickupDetails: '',
  dropoffDetails: '',

  // Tour fields
  selectedTour: null,       // from predefined list
  customTour: '',           // free-text override

  // Shared details
  passengers: 1,
  luggage: 0,
  babySeats: 0,
  boosterSeats: 0,
  date: '',
  time: '',

  // User info
  name: '',
  surname: '',
  email: '',
  phone: '',
  idNumber: '',
  additionalInfo: '',

  price: null               // null = "we will contact you"
}
```

**Actions:**
- `nextStep()` / `prevStep()` — navigate wizard
- `setType(type)` — set tour or transfer
- `calculatePrice()` — called at end of StepDetails; sets `price` or `null` based on PRICING table

**Price logic:**
- Only applies to Transfer type
- Normalizes pickup/dropoff to keys: `HERAKLION`, `CHANIA`, `RETHYMNO`, `BALI`, `PANORMO`, `GERANI`, `KAVROS`, `GEORGIOUPOLI`, `PLAKIAS`, `SFAKIA`
- Tiers: ≤4 passengers, ≤8, ≤14; >14 = `null`
- Tour type always results in `price = null`

**Getters:**
- `hasPrice` — `price !== null`

---

## Wizard Steps

### Step 1 — StepType
- Two large clickable cards: **Transfer** and **Tour**
- Gold border + highlight on selected
- "Continue" button enabled only when a type is selected
- Calls `setType()` on selection

### Step 2 — StepRoute (branching by type)

**Transfer:**
- Pickup location: dropdown of known locations (Heraklion Airport, Chania Airport, Rethymno, Bali, Panormo, Gerani, Kavros, Georgioupoli, Plakias, Sfakia)
- Dropoff location: same dropdown
- Optional pickup/dropoff detail text fields (hotel name, address)
- "Continue" enabled when both pickup and dropoff are selected

**Tour:**
- Predefined tour dropdown: Knossos, Preveli, Arkadi, Kalypso-Plaka, Elafonisi, Balos, Kournas Lake, Samaria, Chania Old Town, Matala, Heraklion Tour, Seitan Harbor, Phalasarna, Other
- Free-text field: "Describe your custom tour (optional)"
- "Continue" enabled when at least one of the two is filled

### Step 3 — StepDetails
- Passengers: number input (min 1)
- Luggage: number input (min 0)
- Baby seats: number input (min 0)
- Booster seats: number input (min 0)
- Date: date picker (no past dates)
- Time: time picker
- `calculatePrice()` called when "Continue" is pressed
- "Continue" enabled when date and time are filled

### Step 4 — StepSummary
- Read-only display of all collected data
- If `hasPrice`: show price in gold — "Estimated Price: €{price}"
- If `!hasPrice`: info box — "Price will be confirmed — we will contact you shortly"
- "Back" and "Continue" navigation

### Step 5 — StepUser
- Visible inputs: name, surname, email, phone
- Optional: additionalInfo textarea
- All Pinia state sent as hidden inputs to Formspree
- Formspree endpoint: `https://formspree.io/f/mpqkreew`
- On submit: native browser POST to Formspree (no JS fetch needed)
- "Submit Booking" button (gold)

---

## UI & Styling

- **Color palette:** Matches existing site — dark stone cards, gold accents (`#D8A444`), light stone text
- **Progress bar:** `WizardProgress.vue` — 5 numbered steps, active = gold, completed = checkmark, inactive = muted
- **Navigation:** "Back" (ghost) + "Continue" (gold filled) on steps 1–4; "Submit Booking" on step 5
- **Mobile-first:** Single column, max-w-2xl centered, comfortable tap targets
- **Price null state:** Soft info banner, not an error
- **No vehicle selection** anywhere in the wizard

---

## Integration Points

### main.js
```js
import { createPinia } from 'pinia'
app.use(createPinia())
```

### index.html — OpenWidget (before `</body>`)
```html
<script>
window.__ow = window.__ow || {};
window.__ow.organizationId = "f4372052-084c-4b72-a43f-8b05b2f98af8";
window.__ow.integration_name = "manual_settings";
window.__ow.product_name = "openwidget";
;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
</script>
```

### Dependencies to add
- `pinia` (npm install pinia)

### Dependencies to remove
- `@emailjs/browser` — no longer needed

---

## Out of Scope
- No vehicle selection
- No backend
- No i18n for wizard (English only, consistent with the spec)
- No URL-based step routing (in-memory only)
