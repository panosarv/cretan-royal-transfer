# Booking Wizard Enhancements Design Spec
**Date:** 2026-04-21
**Project:** Cretan Royal Transfer

---

## Overview

Three enhancements to the existing 5-step booking wizard:

1. **Map-based location picker** — users can type an address or pin a precise location on a Leaflet/OpenStreetMap map for pickup and dropoff. Coordinates appear in the Formspree email.
2. **Tours get a pickup/dropoff step** — tours currently only select a tour name. A new StepMap step adds pickup/dropoff location collection for tours.
3. **Multiple passenger passport/ID fields** — StepDetails renders one optional ID/passport field per passenger, dynamically tied to the passenger count input.

**No new routes. No i18n changes. No Navbar changes. No changes to StepSummary layout.**

---

## Section 1: Wizard Flow

### Transfer flow (unchanged step count)

```
StepType → StepRoute → StepDetails → StepSummary → StepUser
```

StepRoute gains two `LocationPicker` instances below the existing from/to dropdowns. The dropdowns stay (they drive pricing). The location pickers collect a precise pickup address and a precise dropoff address.

### Tour flow (one new step)

```
StepType → StepRoute → StepMap → StepDetails → StepSummary → StepUser
```

StepMap is a new dedicated step with two `LocationPicker` instances — one for pickup, one for dropoff. No pricing dropdowns needed.

`BookingWizard.vue` inserts StepMap only when `bookingStore.type === 'tour'`.

---

## Section 2: LocationPicker Component

**File:** `src/components/booking/LocationPicker.vue`

### Props & emits

| Prop/emit | Type | Description |
|-----------|------|-------------|
| `label` | `String` | Display label — "Pickup Location" or "Dropoff Location" |
| `v-model:text` | `String` | Typed address string |
| `v-model:latlng` | `{ lat, lng } \| null` | Pinned coordinates |

### UI

- Toggle at top: two pills — **"Type address"** | **"Pin on map"** — brand-gold active state, stone-200 inactive
- **Text mode**: single `<input>` with placeholder `"Hotel name, address, or landmark…"`
- **Map mode**: Leaflet map ~300px tall, `rounded-xl`. Click anywhere drops a gold marker. Coordinates displayed below in muted text: `40.6401° N, 22.9444° E`. A "Clear pin" link resets latlng to null.
- Switching tabs preserves data in both modes independently.
- Both text and latlng are submitted if populated; empty fields submit as empty strings.

### Dependencies

- `npm install leaflet`
- Import Leaflet CSS inside component `<style>`: `@import 'leaflet/dist/leaflet.css';`
- Fix Leaflet default icon path issue (known Vite quirk): manually set `L.Icon.Default` `iconUrl`, `iconRetinaUrl`, `shadowUrl` using imported asset URLs.

---

## Section 3: Store Additions

**File:** `src/stores/booking.js`

Add to state:

```js
// Precise location data (from LocationPicker)
pickupText: '',        // typed address string for pickup
dropoffText: '',       // typed address string for dropoff
pickupLatLng: null,    // { lat, lng } or null
dropoffLatLng: null,   // { lat, lng } or null

// Passenger IDs (one per passenger, by index)
passengerIds: [],      // e.g. ['AB123456', 'CD789012']
```

Existing `pickup` and `dropoff` fields remain unchanged — they hold the general area (e.g. `"Chania Airport"`) used for pricing.

Add action:

```js
setPassengerId(index, value) {
  const ids = [...this.passengerIds];
  ids[index] = value;
  this.passengerIds = ids;
},
```

Update `resetBooking` to reset all five new fields to their defaults.

---

## Section 4: StepRoute Changes (Transfers)

**File:** `src/components/booking/StepRoute.vue`

Below the existing from/to dropdowns (transfer mode only), add:

```html
<LocationPicker
  label="Pickup Location"
  v-model:text="bookingStore.pickupText"
  v-model:latlng="bookingStore.pickupLatLng"
/>
<LocationPicker
  label="Dropoff Location"
  v-model:text="bookingStore.dropoffText"
  v-model:latlng="bookingStore.dropoffLatLng"
/>
```

Both are optional — no validation prevents proceeding to the next step.

---

## Section 5: New StepMap Step (Tours)

**File:** `src/components/booking/StepMap.vue`

A new step rendered only in the tour flow.

```html
<template>
  <div class="flex flex-col gap-8">
    <div class="text-center mb-2">
      <p class="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-2">TOUR DETAILS</p>
      <h2 class="text-2xl font-bold text-brand-charcoal font-heading">Where should we pick you up?</h2>
    </div>
    <LocationPicker
      label="Pickup Location"
      v-model:text="bookingStore.pickupText"
      v-model:latlng="bookingStore.pickupLatLng"
    />
    <LocationPicker
      label="Dropoff Location"
      v-model:text="bookingStore.dropoffText"
      v-model:latlng="bookingStore.dropoffLatLng"
    />
  </div>
</template>
```

**BookingWizard.vue changes:**

- Import `StepMap`
- In the step sequence logic, insert StepMap at position 3 when `bookingStore.type === 'tour'`
- Back/next navigation accounts for the extra step (total 6 steps for tours, 5 for transfers)

---

## Section 6: StepDetails Passport Fields

**File:** `src/components/booking/StepDetails.vue`

After the passenger count input, render one field per passenger:

```html
<div v-for="n in bookingStore.passengers" :key="n" class="flex flex-col gap-1">
  <label class="text-sm font-semibold text-brand-charcoal font-heading">
    Passenger {{ n }} — Passport / ID number
    <span class="text-stone-400 font-normal">(optional)</span>
  </label>
  <input
    :value="bookingStore.passengerIds[n - 1] || ''"
    @input="bookingStore.setPassengerId(n - 1, $event.target.value)"
    type="text"
    placeholder="e.g. AB123456"
    class="border border-stone-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold focus:outline-none"
  />
</div>
```

Add a watcher on `bookingStore.passengers` — when count decreases, trim `passengerIds` to the new length:

```js
watch(() => bookingStore.passengers, (newCount) => {
  bookingStore.passengerIds = bookingStore.passengerIds.slice(0, newCount);
});
```

Fields are optional — no validation blocks proceeding.

---

## Section 7: StepUser Hidden Fields

**File:** `src/components/booking/StepUser.vue`

Add to the existing Formspree `<form>`:

```html
<!-- Precise pickup location -->
<input type="hidden" name="pickup_address" :value="bookingStore.pickupText" />
<input type="hidden" name="pickup_lat" :value="bookingStore.pickupLatLng?.lat ?? ''" />
<input type="hidden" name="pickup_lng" :value="bookingStore.pickupLatLng?.lng ?? ''" />

<!-- Precise dropoff location -->
<input type="hidden" name="dropoff_address" :value="bookingStore.dropoffText" />
<input type="hidden" name="dropoff_lat" :value="bookingStore.dropoffLatLng?.lat ?? ''" />
<input type="hidden" name="dropoff_lng" :value="bookingStore.dropoffLatLng?.lng ?? ''" />

<!-- Passenger IDs (comma-separated, blanks filtered) -->
<input type="hidden" name="passenger_ids" :value="bookingStore.passengerIds.filter(Boolean).join(', ')" />
```

---

## Files Modified / Created

| File | Action |
|------|--------|
| `src/stores/booking.js` | Add 5 new state fields + `setPassengerId` action + reset updates |
| `src/components/booking/LocationPicker.vue` | **Create** — map/text toggle component |
| `src/components/booking/StepMap.vue` | **Create** — new tour pickup/dropoff step |
| `src/components/booking/BookingWizard.vue` | Insert StepMap into tour flow |
| `src/components/booking/StepRoute.vue` | Add two LocationPicker instances below transfer dropdowns |
| `src/components/booking/StepDetails.vue` | Add passport fields + passenger count watcher |
| `src/components/booking/StepUser.vue` | Add 7 new hidden fields |

---

## Out of Scope

- No autocomplete / geocoding (user types freeform or drops a pin)
- No address validation
- No changes to pricing logic
- No i18n additions
- No changes to Navbar, ContactSection, ServicesSection, AboutSection, HeroBanner, ToursAirports
