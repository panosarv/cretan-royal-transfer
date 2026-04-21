# Booking Wizard Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Leaflet map/text location picker to the booking wizard, a new StepMap step for tours, and per-passenger passport/ID fields in StepDetails.

**Architecture:** A reusable `LocationPicker.vue` component (text-or-map toggle) is dropped into StepRoute (transfers) and a new StepMap step (tours). `BookingWizard.vue` switches from a static step map to a computed array so tours get 6 steps while transfers keep 5. The Pinia store gains 5 new fields and a `setPassengerId` action. All new data flows to Formspree via hidden fields in StepUser.

**Tech Stack:** Vue 3 Composition API, Pinia, Tailwind CSS, Leaflet 1.x, Vite, Formspree

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/stores/booking.js` | Modify | Add 5 new state fields + `setPassengerId` action |
| `src/components/booking/WizardProgress.vue` | Modify | Accept `steps` prop instead of hardcoded array |
| `src/components/booking/BookingWizard.vue` | Modify | Dynamic step sequence per booking type; pass `steps` to WizardProgress |
| `src/components/booking/LocationPicker.vue` | Create | Map/text toggle widget (Leaflet + text input) |
| `src/components/booking/StepMap.vue` | Create | Tour-only step: two LocationPickers for pickup/dropoff |
| `src/components/booking/StepRoute.vue` | Modify | Add two LocationPickers below transfer dropdowns |
| `src/components/booking/StepDetails.vue` | Modify | Add per-passenger passport/ID fields + watcher |
| `src/components/booking/StepUser.vue` | Modify | Add 7 new hidden fields for location + passport data |

---

## Task 1: Install Leaflet

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install the leaflet package**

```bash
cd cretan-royal-transfer
npm install leaflet
```

Expected output ends with: `added N packages` (no errors).

- [ ] **Step 2: Verify installation**

```bash
grep '"leaflet"' package.json
```

Expected: `"leaflet": "^1.x.x"` appears in `dependencies`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install leaflet for map-based location picker"
```

---

## Task 2: Extend the Booking Store

**Files:**
- Modify: `src/stores/booking.js`

Current state ends at `price: null` (line 31). Current actions: `nextStep`, `prevStep`, `setType`, `calculatePrice`.

- [ ] **Step 1: Add new state fields**

In `src/stores/booking.js`, inside the `state: () => ({...})` object, add after `price: null`:

```js
    price: null,

    // Precise location data (from LocationPicker)
    pickupText: '',
    dropoffText: '',
    pickupLatLng: null,
    dropoffLatLng: null,

    // Passenger IDs, one per passenger by index
    passengerIds: []
```

- [ ] **Step 2: Add setPassengerId action**

In `src/stores/booking.js`, inside the `actions: {...}` object, add after `calculatePrice() { ... }`:

```js
    setPassengerId(index, value) {
      const ids = [...this.passengerIds]
      ids[index] = value
      this.passengerIds = ids
    }
```

- [ ] **Step 3: Verify the store file looks correct**

```bash
grep -n "pickupText\|pickupLatLng\|passengerIds\|setPassengerId" cretan-royal-transfer/src/stores/booking.js
```

Expected: 4 matching lines — the 4 new state fields and the action name.

- [ ] **Step 4: Start dev server and verify no runtime errors**

```bash
cd cretan-royal-transfer && npm run dev
```

Open `http://localhost:5173/book` in the browser. The wizard should load on Step 1 with no console errors. Stop the server (`Ctrl+C`).

- [ ] **Step 5: Commit**

```bash
git add cretan-royal-transfer/src/stores/booking.js
git commit -m "feat: extend booking store with location and passport fields"
```

---

## Task 3: Make WizardProgress Accept a `steps` Prop

**Files:**
- Modify: `src/components/booking/WizardProgress.vue`

Currently `WizardProgress.vue` has a hardcoded `steps` array (lines 9–15) and accepts only `currentStep`. We need it to accept a `steps` prop so BookingWizard can pass 5 steps for transfers and 6 for tours.

- [ ] **Step 1: Replace the component**

Replace the entire contents of `src/components/booking/WizardProgress.vue` with:

```vue
<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true
  },
  steps: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center justify-between mb-8">
    <template v-for="(step, index) in steps" :key="step.number">
      <!-- Step circle -->
      <div class="flex flex-col items-center">
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
          :class="{
            'bg-[#D8A444] text-stone-900': currentStep === step.number,
            'bg-[#D8A444] text-stone-900 opacity-80': currentStep > step.number,
            'bg-stone-700 text-stone-400': currentStep < step.number
          }"
        >
          <svg v-if="currentStep > step.number" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span v-else>{{ step.number }}</span>
        </div>
        <span
          class="mt-1 text-xs hidden sm:block transition-colors"
          :class="{
            'text-[#D8A444] font-semibold': currentStep === step.number,
            'text-stone-400': currentStep !== step.number
          }"
        >{{ step.label }}</span>
      </div>

      <!-- Connector line (not after last step) -->
      <div
        v-if="index < steps.length - 1"
        class="flex-1 h-0.5 mx-2 transition-colors"
        :class="currentStep > step.number ? 'bg-[#D8A444]' : 'bg-stone-700'"
      />
    </template>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add cretan-royal-transfer/src/components/booking/WizardProgress.vue
git commit -m "feat: make WizardProgress accept dynamic steps prop"
```

---

## Task 4: Update BookingWizard for Dynamic Step Sequence

**Files:**
- Modify: `src/components/booking/BookingWizard.vue`

Currently `BookingWizard.vue` has a static `stepComponents` object `{ 1: StepType, ... }`. We need a computed step array so tours get a 6-step flow (with StepMap at position 3) while transfers keep 5 steps.

`StepMap` does not exist yet — it will be created in Task 5. Import it now; it will error until Task 5 is done, which is fine since we commit tasks in order.

- [ ] **Step 1: Replace the entire file**

Replace `src/components/booking/BookingWizard.vue` with:

```vue
<script setup>
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
import WizardProgress from './WizardProgress.vue'
import StepType from './StepType.vue'
import StepRoute from './StepRoute.vue'
import StepMap from './StepMap.vue'
import StepDetails from './StepDetails.vue'
import StepSummary from './StepSummary.vue'
import StepUser from './StepUser.vue'

const booking = useBookingStore()

const transferStepDefs = [
  { number: 1, label: 'Type' },
  { number: 2, label: 'Route' },
  { number: 3, label: 'Details' },
  { number: 4, label: 'Summary' },
  { number: 5, label: 'Your Info' }
]

const tourStepDefs = [
  { number: 1, label: 'Type' },
  { number: 2, label: 'Tour' },
  { number: 3, label: 'Location' },
  { number: 4, label: 'Details' },
  { number: 5, label: 'Summary' },
  { number: 6, label: 'Your Info' }
]

const transferComponents = [StepType, StepRoute, StepDetails, StepSummary, StepUser]
const tourComponents = [StepType, StepRoute, StepMap, StepDetails, StepSummary, StepUser]

const stepDefs = computed(() => booking.type === 'tour' ? tourStepDefs : transferStepDefs)
const stepComponents = computed(() => booking.type === 'tour' ? tourComponents : transferComponents)
const currentComponent = computed(() => stepComponents.value[booking.step - 1])
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <WizardProgress :current-step="booking.step" :steps="stepDefs" />
    <Transition name="slide" mode="out-in">
      <component :is="currentComponent" :key="booking.step" />
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add cretan-royal-transfer/src/components/booking/BookingWizard.vue
git commit -m "feat: dynamic step sequence in BookingWizard (tours get 6 steps)"
```

Note: the dev server will show a missing module error for `StepMap.vue` until Task 5 is complete. That is expected.

---

## Task 5: Create LocationPicker.vue

**Files:**
- Create: `src/components/booking/LocationPicker.vue`

This component renders a toggle between "Type address" (text input) and "Pin on map" (Leaflet map). It uses two `v-model` bindings: `text` for the typed string and `latlng` for `{ lat, lng } | null`.

**Leaflet icon fix:** Vite breaks Leaflet's default marker icon resolution. The fix is to delete `_getIconUrl` from `L.Icon.Default.prototype` and manually set the three icon URLs using Vite-imported asset paths.

- [ ] **Step 1: Create the file**

Create `src/components/booking/LocationPicker.vue` with this content:

```vue
<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet default icon paths broken by Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const props = defineProps({
  label: { type: String, required: true },
  text: { type: String, default: '' },
  latlng: { type: Object, default: null }
})

const emit = defineEmits(['update:text', 'update:latlng'])

const mode = ref('text')
const mapContainer = ref(null)
let map = null
let marker = null

const initMap = () => {
  if (map) return
  map = L.map(mapContainer.value).setView([35.2401, 24.8093], 8)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  if (props.latlng) {
    marker = L.marker([props.latlng.lat, props.latlng.lng]).addTo(map)
    map.setView([props.latlng.lat, props.latlng.lng], 13)
  }

  map.on('click', (e) => {
    const lat = parseFloat(e.latlng.lat.toFixed(6))
    const lng = parseFloat(e.latlng.lng.toFixed(6))
    if (marker) {
      marker.setLatLng([lat, lng])
    } else {
      marker = L.marker([lat, lng]).addTo(map)
    }
    emit('update:latlng', { lat, lng })
  })
}

const destroyMap = () => {
  if (map) {
    map.remove()
    map = null
    marker = null
  }
}

const clearPin = () => {
  if (marker) {
    marker.remove()
    marker = null
  }
  emit('update:latlng', null)
}

watch(mode, async (val) => {
  if (val === 'map') {
    await nextTick()
    initMap()
  } else {
    destroyMap()
  }
})

onUnmounted(() => destroyMap())
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm font-semibold text-stone-300">{{ label }}</p>

    <!-- Toggle pills -->
    <div class="flex rounded-lg overflow-hidden border border-stone-600 w-fit">
      <button
        type="button"
        @click="mode = 'text'"
        class="px-4 py-2 text-sm font-medium transition-colors"
        :class="mode === 'text'
          ? 'bg-[#D8A444] text-stone-900'
          : 'bg-stone-800 text-stone-400 hover:text-stone-200'"
      >
        Type address
      </button>
      <button
        type="button"
        @click="mode = 'map'"
        class="px-4 py-2 text-sm font-medium transition-colors"
        :class="mode === 'map'
          ? 'bg-[#D8A444] text-stone-900'
          : 'bg-stone-800 text-stone-400 hover:text-stone-200'"
      >
        Pin on map
      </button>
    </div>

    <!-- Text mode -->
    <div v-if="mode === 'text'">
      <input
        :value="text"
        @input="emit('update:text', $event.target.value)"
        type="text"
        placeholder="Hotel name, address, or landmark…"
        class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
      />
    </div>

    <!-- Map mode -->
    <div v-if="mode === 'map'" class="space-y-2">
      <div
        ref="mapContainer"
        class="w-full h-[300px] rounded-xl overflow-hidden border border-stone-600"
      />
      <div v-if="latlng" class="flex items-center justify-between text-xs text-stone-400">
        <span>{{ latlng.lat.toFixed(4) }}° N, {{ latlng.lng.toFixed(4) }}° E</span>
        <button
          type="button"
          @click="clearPin"
          class="text-[#D8A444] hover:underline"
        >
          Clear pin
        </button>
      </div>
      <p v-else class="text-xs text-stone-500">Click anywhere on the map to drop a pin</p>
    </div>
  </div>
</template>

<style>
@import 'leaflet/dist/leaflet.css';
</style>
```

- [ ] **Step 2: Start the dev server and verify LocationPicker renders**

```bash
npm run dev
```

Temporarily add `<LocationPicker label="Test" v-model:text="t" v-model:latlng="ll" />` to any component to confirm the map loads and clicking drops a pin. Remove it after testing. Stop server.

- [ ] **Step 3: Commit**

```bash
git add cretan-royal-transfer/src/components/booking/LocationPicker.vue
git commit -m "feat: create LocationPicker component with Leaflet map/text toggle"
```

---

## Task 6: Create StepMap.vue (Tour Location Step)

**Files:**
- Create: `src/components/booking/StepMap.vue`

This step is inserted between StepRoute and StepDetails in the tour flow. It shows two `LocationPicker` instances and Back/Continue navigation. It has no required fields — Continue is always enabled.

- [ ] **Step 1: Create the file**

Create `src/components/booking/StepMap.vue` with this content:

```vue
<script setup>
import { useBookingStore } from '@/stores/booking'
import LocationPicker from './LocationPicker.vue'

const booking = useBookingStore()
</script>

<template>
  <div>
    <div class="text-center mb-8">
      <p class="text-[#D8A444] text-xs font-semibold tracking-widest uppercase mb-2">TOUR DETAILS</p>
      <h2 class="text-2xl font-bold text-stone-100 mb-2">Where should we pick you up?</h2>
      <p class="text-stone-400">Type an address or drop a pin — both are optional</p>
    </div>

    <div class="space-y-8 mb-8">
      <LocationPicker
        label="Pickup Location"
        :text="booking.pickupText"
        :latlng="booking.pickupLatLng"
        @update:text="booking.pickupText = $event"
        @update:latlng="booking.pickupLatLng = $event"
      />
      <LocationPicker
        label="Dropoff Location"
        :text="booking.dropoffText"
        :latlng="booking.dropoffLatLng"
        @update:text="booking.dropoffText = $event"
        @update:latlng="booking.dropoffLatLng = $event"
      />
    </div>

    <div class="flex justify-between">
      <button
        type="button"
        @click="booking.prevStep()"
        class="px-6 py-3 rounded-lg font-semibold text-stone-300 border border-stone-600 hover:border-stone-400 transition-all"
      >
        ← Back
      </button>
      <button
        type="button"
        @click="booking.nextStep()"
        class="px-6 py-3 rounded-lg font-semibold bg-[#D8A444] text-stone-900 hover:bg-[#B4952E] transition-all"
      >
        Continue →
      </button>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Start the dev server and verify the tour flow**

```bash
npm run dev
```

Open `http://localhost:5173/book`. Select **Tour**, pick any tour on Step 2, click Continue. You should now land on **Step 3 — Location** with two LocationPicker instances. The progress bar should show 6 steps labeled: Type / Tour / Location / Details / Summary / Your Info. Confirm Back returns to Step 2 and Continue advances to Step 4. Stop server.

- [ ] **Step 3: Commit**

```bash
git add cretan-royal-transfer/src/components/booking/StepMap.vue
git commit -m "feat: add StepMap for tour pickup/dropoff location"
```

---

## Task 7: Update StepRoute — Add LocationPickers for Transfers

**Files:**
- Modify: `src/components/booking/StepRoute.vue`

The two existing "Pickup Details" and "Drop-off Details" plain text inputs (lines 73–99) are replaced by `LocationPicker` components which provide the same text capability plus the map toggle. The general area dropdowns (pickup/dropoff selects) and their validation remain unchanged.

- [ ] **Step 1: Add LocationPicker import**

In `src/components/booking/StepRoute.vue`, change the `<script setup>` block from:

```js
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
```

to:

```js
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
import LocationPicker from './LocationPicker.vue'
```

- [ ] **Step 2: Replace the transfer template section**

In `src/components/booking/StepRoute.vue`, replace the entire `<template v-if="booking.type === 'transfer'">` block (lines 60–101) with:

```html
    <!-- Transfer fields -->
    <template v-if="booking.type === 'transfer'">
      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Pickup Location</label>
          <select
            v-model="booking.pickup"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          >
            <option value="">Select pickup location</option>
            <option v-for="loc in transferLocations" :key="loc" :value="loc">{{ loc }}</option>
          </select>
        </div>
        <LocationPicker
          label="Precise Pickup Address (optional)"
          :text="booking.pickupText"
          :latlng="booking.pickupLatLng"
          @update:text="booking.pickupText = $event"
          @update:latlng="booking.pickupLatLng = $event"
        />
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Drop-off Location</label>
          <select
            v-model="booking.dropoff"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          >
            <option value="">Select drop-off location</option>
            <option v-for="loc in transferLocations" :key="loc" :value="loc">{{ loc }}</option>
          </select>
        </div>
        <LocationPicker
          label="Precise Dropoff Address (optional)"
          :text="booking.dropoffText"
          :latlng="booking.dropoffLatLng"
          @update:text="booking.dropoffText = $event"
          @update:latlng="booking.dropoffLatLng = $event"
        />
      </div>
    </template>
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:5173/book`. Select **Transfer**, click Continue. On Step 2 you should see: Pickup dropdown → LocationPicker (text/map toggle) → Dropoff dropdown → LocationPicker. The Continue button should stay disabled until both dropdowns have values. Confirm the map mode works for both pickers. Stop server.

- [ ] **Step 4: Commit**

```bash
git add cretan-royal-transfer/src/components/booking/StepRoute.vue
git commit -m "feat: add LocationPicker to StepRoute for precise transfer addresses"
```

---

## Task 8: Update StepDetails — Passport/ID Fields

**Files:**
- Modify: `src/components/booking/StepDetails.vue`

After the passengers number input, render one optional passport/ID field per passenger. Add a watcher that trims `passengerIds` when the passenger count decreases (to avoid stale data at higher indices).

- [ ] **Step 1: Add watch import**

In `src/components/booking/StepDetails.vue`, change:

```js
import { computed } from 'vue'
```

to:

```js
import { computed, watch } from 'vue'
```

- [ ] **Step 2: Add the passenger watcher**

In `src/components/booking/StepDetails.vue`, after `const handleContinue = ...`, add:

```js
watch(() => booking.passengers, (newCount) => {
  booking.passengerIds = booking.passengerIds.slice(0, newCount)
})
```

- [ ] **Step 3: Add the passport fields to the template**

In `src/components/booking/StepDetails.vue`, after the closing `</div>` of the Passengers input block (after line 54 `</div>`), add:

```html
      <!-- Per-passenger passport / ID fields -->
      <div
        v-for="n in booking.passengers"
        :key="n"
        class="flex flex-col gap-1"
      >
        <label class="block text-sm font-medium text-stone-300 mb-1">
          Passenger {{ n }} — Passport / ID number
          <span class="text-stone-500 font-normal">(optional)</span>
        </label>
        <input
          :value="booking.passengerIds[n - 1] || ''"
          @input="booking.setPassengerId(n - 1, $event.target.value)"
          type="text"
          placeholder="e.g. AB123456"
          class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
        />
      </div>
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Go through either booking type to Step 3 (Details). Set Passengers to 3 — three passport fields should appear. Fill some in, then reduce to 2 — the third field should disappear. Increase back to 3 — the third field returns empty. Stop server.

- [ ] **Step 5: Commit**

```bash
git add cretan-royal-transfer/src/components/booking/StepDetails.vue
git commit -m "feat: add per-passenger passport/ID fields in StepDetails"
```

---

## Task 9: Update StepUser — New Hidden Formspree Fields

**Files:**
- Modify: `src/components/booking/StepUser.vue`

Add 7 hidden inputs to the existing Formspree form so the new location and passport data is included in the submission email.

- [ ] **Step 1: Add hidden fields**

In `src/components/booking/StepUser.vue`, after the existing `<input type="hidden" name="price" ...>` line (line 31), add:

```html
      <!-- Precise pickup location -->
      <input type="hidden" name="pickup_address" :value="booking.pickupText" />
      <input type="hidden" name="pickup_lat" :value="booking.pickupLatLng?.lat ?? ''" />
      <input type="hidden" name="pickup_lng" :value="booking.pickupLatLng?.lng ?? ''" />

      <!-- Precise dropoff location -->
      <input type="hidden" name="dropoff_address" :value="booking.dropoffText" />
      <input type="hidden" name="dropoff_lat" :value="booking.dropoffLatLng?.lat ?? ''" />
      <input type="hidden" name="dropoff_lng" :value="booking.dropoffLatLng?.lng ?? ''" />

      <!-- Passenger IDs (comma-separated, blanks filtered out) -->
      <input type="hidden" name="passenger_ids" :value="booking.passengerIds.filter(Boolean).join(', ')" />
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Complete a full transfer booking through to Step 5. Open browser DevTools → Elements, find the `<form>` tag. Confirm the 7 new hidden `<input>` elements are present. If you filled in a pickup address or pinned a location, confirm their values are reflected. Stop server.

- [ ] **Step 3: Commit**

```bash
git add cretan-royal-transfer/src/components/booking/StepUser.vue
git commit -m "feat: wire location and passport data to Formspree hidden fields"
```

---

## Final Verification

- [ ] **Full transfer flow:** Select Transfer → pick Heraklion Airport → Rethymno → type a pickup address → switch to map mode, drop a pin for dropoff → continue through Details (add 2 passengers, fill one passport) → Summary → Your Info. Confirm all 7 new hidden fields have values in DevTools.

- [ ] **Full tour flow:** Select Tour → pick Knossos Tour → Continue to Location step → type pickup hotel → pin dropoff on map → Details → Summary → Your Info. Confirm 6-step progress bar, location fields populated.

- [ ] **Edge cases:** Reduce passengers from 3 to 1 on Details step — only 1 passport field remains. Clear a map pin — `pickup_lat` and `pickup_lng` hidden fields become empty strings.
