# Booking Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat BookingForm with a 5-step wizard (Type → Route → Details → Summary → User Info) using Pinia + Formspree.

**Architecture:** Single `BookingWizard.vue` orchestrator renders one step component at a time based on `booking.step` from the Pinia store. Steps 1 and 4–5 are shared; Step 2 branches by type (Transfer shows location dropdowns + price calc, Tour shows predefined list + free text). Step 5 POSTs to Formspree via native HTML form.

**Tech Stack:** Vue 3 (Composition API), Pinia, Tailwind CSS, Formspree (`https://formspree.io/f/mpqkreew`), Vite

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/stores/booking.js` | All wizard state, price calculation |
| Create | `src/components/booking/WizardProgress.vue` | Step indicator bar |
| Create | `src/components/booking/StepType.vue` | Step 1 – Tour / Transfer selection |
| Create | `src/components/booking/StepRoute.vue` | Step 2 – Branching by type |
| Create | `src/components/booking/StepDetails.vue` | Step 3 – Passengers, luggage, date/time |
| Create | `src/components/booking/StepSummary.vue` | Step 4 – Read-only review |
| Create | `src/components/booking/StepUser.vue` | Step 5 – User info + Formspree POST |
| Create | `src/components/booking/BookingWizard.vue` | Orchestrator |
| Modify | `src/main.js` | Register Pinia |
| Modify | `src/pages/Book.vue` | Mount BookingWizard |
| Modify | `index.html` | Add OpenWidget script |

---

## Task 1: Install Pinia and register it

**Files:**
- Modify: `src/main.js`

- [ ] **Step 1: Install pinia**

```bash
cd "c:/Users/Ryzen/Desktop/Cretan Royal Transfer/cretan-royal-transfer"
npm install pinia
```

Expected output: `added 2 packages` (pinia + @vue/devtools-api)

- [ ] **Step 2: Register Pinia in main.js**

Replace the entire contents of `src/main.js` with:

```js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import './style.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount('#app');
```

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/main.js package.json package-lock.json
git commit -m "feat: install and register Pinia"
```

---

## Task 2: Create the Pinia booking store

**Files:**
- Create: `src/stores/booking.js`

- [ ] **Step 1: Create the stores directory and booking store**

Create `src/stores/booking.js` with the following content:

```js
import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    step: 1,
    type: null,

    pickup: '',
    dropoff: '',
    pickupDetails: '',
    dropoffDetails: '',

    passengers: 1,
    luggage: 0,
    babySeats: 0,
    boosterSeats: 0,

    date: '',
    time: '',

    selectedTour: null,
    customTour: '',

    name: '',
    surname: '',
    email: '',
    phone: '',
    idNumber: '',
    additionalInfo: '',

    price: null
  }),

  getters: {
    hasPrice: (state) => state.price !== null
  },

  actions: {
    nextStep() { this.step++ },
    prevStep() { this.step-- },

    setType(type) { this.type = type },

    calculatePrice() {
      if (this.type === 'tour') {
        this.price = null
        return
      }

      const normalize = (loc) => {
        if (!loc) return null
        if (loc.includes('Heraklion')) return 'HERAKLION'
        if (loc.includes('Chania')) return 'CHANIA'
        return loc.toUpperCase()
      }

      const PRICING = {
        HERAKLION: {
          RETHYMNO: { upTo4: 87, upTo8: 134, upTo14: 170 },
          BALI: { upTo4: 68, upTo8: 87, upTo14: 130 },
          PANORMO: { upTo4: 82, upTo8: 115, upTo14: 150 },
          GERANI: { upTo4: 95, upTo8: 130, upTo14: 190 },
          KAVROS: { upTo4: 110, upTo8: 147, upTo14: 205 },
          GEORGIOUPOLI: { upTo4: 115, upTo8: 152, upTo14: 210 },
          CHANIA: { upTo4: 165, upTo8: 225, upTo14: 280 },
          PLAKIAS: { upTo4: 125, upTo8: 155, upTo14: 220 },
          SFAKIA: { upTo4: 150, upTo8: 192, upTo14: 265 }
        },
        CHANIA: {
          RETHYMNO: { upTo4: 87, upTo8: 134, upTo14: 170 },
          BALI: { upTo4: 115, upTo8: 148, upTo14: 220 },
          PANORMO: { upTo4: 105, upTo8: 139, upTo14: 185 },
          GERANI: { upTo4: 82, upTo8: 120, upTo14: 160 },
          KAVROS: { upTo4: 70, upTo8: 92, upTo14: 135 },
          GEORGIOUPOLI: { upTo4: 70, upTo8: 92, upTo14: 135 },
          HERAKLION: { upTo4: 165, upTo8: 225, upTo14: 280 },
          PLAKIAS: { upTo4: 119, upTo8: 149, upTo14: 220 },
          SFAKIA: { upTo4: 130, upTo8: 162, upTo14: 235 }
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
  }
})
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/stores/booking.js
git commit -m "feat: add Pinia booking store with price calculator"
```

---

## Task 3: Create WizardProgress component

**Files:**
- Create: `src/components/booking/WizardProgress.vue`

- [ ] **Step 1: Create the component**

Create `src/components/booking/WizardProgress.vue`:

```vue
<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true
  }
})

const steps = [
  { number: 1, label: 'Type' },
  { number: 2, label: 'Route' },
  { number: 3, label: 'Details' },
  { number: 4, label: 'Summary' },
  { number: 5, label: 'Your Info' }
]
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

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/booking/WizardProgress.vue
git commit -m "feat: add WizardProgress step indicator"
```

---

## Task 4: Create StepType component

**Files:**
- Create: `src/components/booking/StepType.vue`

- [ ] **Step 1: Create the component**

Create `src/components/booking/StepType.vue`:

```vue
<script setup>
import { useBookingStore } from '@/stores/booking'

const booking = useBookingStore()

const select = (type) => {
  booking.setType(type)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-stone-100 mb-2 text-center">What are you booking?</h2>
    <p class="text-stone-400 text-center mb-8">Choose the type of service you need</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <!-- Transfer card -->
      <button
        type="button"
        @click="select('transfer')"
        class="flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all"
        :class="booking.type === 'transfer'
          ? 'border-[#D8A444] bg-[#D8A444]/10 text-stone-100'
          : 'border-stone-600 bg-stone-800/50 text-stone-300 hover:border-stone-400'"
      >
        <svg class="w-12 h-12 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
        <span class="text-lg font-semibold">Transfer</span>
        <span class="text-sm mt-1 opacity-70">Airport or point-to-point</span>
      </button>

      <!-- Tour card -->
      <button
        type="button"
        @click="select('tour')"
        class="flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all"
        :class="booking.type === 'tour'
          ? 'border-[#D8A444] bg-[#D8A444]/10 text-stone-100'
          : 'border-stone-600 bg-stone-800/50 text-stone-300 hover:border-stone-400'"
      >
        <svg class="w-12 h-12 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
        <span class="text-lg font-semibold">Tour</span>
        <span class="text-sm mt-1 opacity-70">Guided day trips across Crete</span>
      </button>
    </div>

    <div class="flex justify-end">
      <button
        type="button"
        :disabled="!booking.type"
        @click="booking.nextStep()"
        class="px-6 py-3 rounded-lg font-semibold transition-all"
        :class="booking.type
          ? 'bg-[#D8A444] text-stone-900 hover:bg-[#B4952E]'
          : 'bg-stone-700 text-stone-500 cursor-not-allowed'"
      >
        Continue →
      </button>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/booking/StepType.vue
git commit -m "feat: add StepType wizard step"
```

---

## Task 5: Create StepRoute component

**Files:**
- Create: `src/components/booking/StepRoute.vue`

- [ ] **Step 1: Create the component**

Create `src/components/booking/StepRoute.vue`:

```vue
<script setup>
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'

const booking = useBookingStore()

const transferLocations = [
  'Heraklion Airport',
  'Chania Airport',
  'Rethymno',
  'Bali',
  'Panormo',
  'Gerani',
  'Kavros',
  'Georgioupoli',
  'Plakias',
  'Sfakia'
]

const predefinedTours = [
  'Knossos Tour',
  'Preveli Tour',
  'Arkadi Tour',
  'Kalypso - Plaka Tour',
  'Elafonisi Tour',
  'Balos Tour',
  'Kournas Lake',
  'Samaria Tour',
  'Chania Old Town',
  'Matala Tour',
  'Heraklion Tour',
  'Seitan Harbor',
  'Phalasarna Tour',
  'Other'
]

const canContinue = computed(() => {
  if (booking.type === 'transfer') {
    return booking.pickup !== '' && booking.dropoff !== ''
  }
  if (booking.type === 'tour') {
    return booking.selectedTour !== null || booking.customTour.trim() !== ''
  }
  return false
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-stone-100 mb-2 text-center">
      {{ booking.type === 'transfer' ? 'Where are you going?' : 'Choose your tour' }}
    </h2>
    <p class="text-stone-400 text-center mb-8">
      {{ booking.type === 'transfer' ? 'Select your pickup and drop-off locations' : 'Pick a tour or describe your own' }}
    </p>

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
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Pickup Details (optional)</label>
          <input
            v-model="booking.pickupDetails"
            type="text"
            placeholder="Hotel name, address, terminal..."
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
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
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Drop-off Details (optional)</label>
          <input
            v-model="booking.dropoffDetails"
            type="text"
            placeholder="Hotel name, address, terminal..."
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
      </div>
    </template>

    <!-- Tour fields -->
    <template v-if="booking.type === 'tour'">
      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Select a Tour</label>
          <select
            v-model="booking.selectedTour"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          >
            <option :value="null">Choose a tour...</option>
            <option v-for="tour in predefinedTours" :key="tour" :value="tour">{{ tour }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Or describe your custom tour (optional)</label>
          <textarea
            v-model="booking.customTour"
            rows="3"
            placeholder="Tell us where you'd like to go..."
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none resize-none"
          ></textarea>
        </div>
      </div>
    </template>

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
        :disabled="!canContinue"
        @click="booking.nextStep()"
        class="px-6 py-3 rounded-lg font-semibold transition-all"
        :class="canContinue
          ? 'bg-[#D8A444] text-stone-900 hover:bg-[#B4952E]'
          : 'bg-stone-700 text-stone-500 cursor-not-allowed'"
      >
        Continue →
      </button>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/booking/StepRoute.vue
git commit -m "feat: add StepRoute with transfer/tour branching"
```

---

## Task 6: Create StepDetails component

**Files:**
- Create: `src/components/booking/StepDetails.vue`

- [ ] **Step 1: Create the component**

Create `src/components/booking/StepDetails.vue`:

```vue
<script setup>
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'

const booking = useBookingStore()

const today = new Date().toISOString().split('T')[0]

const canContinue = computed(() => booking.date !== '' && booking.time !== '')

const handleContinue = () => {
  booking.calculatePrice()
  booking.nextStep()
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-stone-100 mb-2 text-center">Trip Details</h2>
    <p class="text-stone-400 text-center mb-8">Tell us about your group and when you need us</p>

    <div class="space-y-5 mb-8">
      <!-- Date and time row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Date <span class="text-[#D8A444]">*</span></label>
          <input
            v-model="booking.date"
            type="date"
            :min="today"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Time <span class="text-[#D8A444]">*</span></label>
          <input
            v-model="booking.time"
            type="time"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
      </div>

      <!-- Passengers -->
      <div>
        <label class="block text-sm font-medium text-stone-300 mb-1">Passengers <span class="text-[#D8A444]">*</span></label>
        <input
          v-model.number="booking.passengers"
          type="number"
          min="1"
          max="14"
          class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
        />
      </div>

      <!-- Luggage, baby seats, booster seats in a 3-col grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Luggage bags</label>
          <input
            v-model.number="booking.luggage"
            type="number"
            min="0"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Baby seats</label>
          <input
            v-model.number="booking.babySeats"
            type="number"
            min="0"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Booster seats</label>
          <input
            v-model.number="booking.boosterSeats"
            type="number"
            min="0"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
      </div>
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
        :disabled="!canContinue"
        @click="handleContinue"
        class="px-6 py-3 rounded-lg font-semibold transition-all"
        :class="canContinue
          ? 'bg-[#D8A444] text-stone-900 hover:bg-[#B4952E]'
          : 'bg-stone-700 text-stone-500 cursor-not-allowed'"
      >
        Continue →
      </button>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/booking/StepDetails.vue
git commit -m "feat: add StepDetails for passengers, date, and time"
```

---

## Task 7: Create StepSummary component

**Files:**
- Create: `src/components/booking/StepSummary.vue`

- [ ] **Step 1: Create the component**

Create `src/components/booking/StepSummary.vue`:

```vue
<script setup>
import { useBookingStore } from '@/stores/booking'

const booking = useBookingStore()
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-stone-100 mb-2 text-center">Review Your Booking</h2>
    <p class="text-stone-400 text-center mb-8">Check the details below before submitting</p>

    <div class="space-y-4 mb-8">
      <!-- Type -->
      <div class="bg-stone-800/60 rounded-xl p-4 border border-stone-700">
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-1">Service Type</p>
        <p class="text-stone-100 font-semibold capitalize">{{ booking.type }}</p>
      </div>

      <!-- Route: Transfer -->
      <div v-if="booking.type === 'transfer'" class="bg-stone-800/60 rounded-xl p-4 border border-stone-700">
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-2">Route</p>
        <div class="flex items-center gap-2 text-stone-100">
          <span class="font-semibold">{{ booking.pickup }}</span>
          <span v-if="booking.pickupDetails" class="text-stone-400 text-sm">({{ booking.pickupDetails }})</span>
          <span class="text-[#D8A444] mx-1">→</span>
          <span class="font-semibold">{{ booking.dropoff }}</span>
          <span v-if="booking.dropoffDetails" class="text-stone-400 text-sm">({{ booking.dropoffDetails }})</span>
        </div>
      </div>

      <!-- Route: Tour -->
      <div v-if="booking.type === 'tour'" class="bg-stone-800/60 rounded-xl p-4 border border-stone-700">
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-2">Tour</p>
        <p v-if="booking.selectedTour" class="text-stone-100 font-semibold">{{ booking.selectedTour }}</p>
        <p v-if="booking.customTour" class="text-stone-300 text-sm mt-1">{{ booking.customTour }}</p>
      </div>

      <!-- Date & Time -->
      <div class="bg-stone-800/60 rounded-xl p-4 border border-stone-700">
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-2">Date & Time</p>
        <p class="text-stone-100">{{ booking.date }} at {{ booking.time }}</p>
      </div>

      <!-- Group details -->
      <div class="bg-stone-800/60 rounded-xl p-4 border border-stone-700">
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-2">Group</p>
        <div class="grid grid-cols-2 gap-2 text-sm text-stone-300">
          <span>Passengers: <strong class="text-stone-100">{{ booking.passengers }}</strong></span>
          <span>Luggage: <strong class="text-stone-100">{{ booking.luggage }}</strong></span>
          <span v-if="booking.babySeats > 0">Baby seats: <strong class="text-stone-100">{{ booking.babySeats }}</strong></span>
          <span v-if="booking.boosterSeats > 0">Booster seats: <strong class="text-stone-100">{{ booking.boosterSeats }}</strong></span>
        </div>
      </div>

      <!-- Price -->
      <div
        class="rounded-xl p-4 border"
        :class="booking.hasPrice ? 'bg-[#D8A444]/10 border-[#D8A444]/40' : 'bg-stone-800/60 border-stone-600'"
      >
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-1">Estimated Price</p>
        <p v-if="booking.hasPrice" class="text-2xl font-bold text-[#D8A444]">€{{ booking.price }}</p>
        <p v-else class="text-stone-300">Price will be confirmed — we will contact you shortly.</p>
      </div>
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

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/booking/StepSummary.vue
git commit -m "feat: add StepSummary with price display"
```

---

## Task 8: Create StepUser component

**Files:**
- Create: `src/components/booking/StepUser.vue`

- [ ] **Step 1: Create the component**

Create `src/components/booking/StepUser.vue`:

```vue
<script setup>
import { useBookingStore } from '@/stores/booking'

const booking = useBookingStore()
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-stone-100 mb-2 text-center">Your Details</h2>
    <p class="text-stone-400 text-center mb-8">Almost there — we just need your contact information</p>

    <form
      action="https://formspree.io/f/mpqkreew"
      method="POST"
      class="space-y-4"
    >
      <!-- Hidden booking data -->
      <input type="hidden" name="booking_type" :value="booking.type" />
      <input type="hidden" name="pickup" :value="booking.pickup" />
      <input type="hidden" name="pickup_details" :value="booking.pickupDetails" />
      <input type="hidden" name="dropoff" :value="booking.dropoff" />
      <input type="hidden" name="dropoff_details" :value="booking.dropoffDetails" />
      <input type="hidden" name="selected_tour" :value="booking.selectedTour" />
      <input type="hidden" name="custom_tour" :value="booking.customTour" />
      <input type="hidden" name="date" :value="booking.date" />
      <input type="hidden" name="time" :value="booking.time" />
      <input type="hidden" name="passengers" :value="booking.passengers" />
      <input type="hidden" name="luggage" :value="booking.luggage" />
      <input type="hidden" name="baby_seats" :value="booking.babySeats" />
      <input type="hidden" name="booster_seats" :value="booking.boosterSeats" />
      <input type="hidden" name="price" :value="booking.hasPrice ? `€${booking.price}` : 'To be confirmed'" />

      <!-- Visible fields -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">First Name <span class="text-[#D8A444]">*</span></label>
          <input
            v-model="booking.name"
            name="name"
            type="text"
            required
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Last Name <span class="text-[#D8A444]">*</span></label>
          <input
            v-model="booking.surname"
            name="surname"
            type="text"
            required
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-300 mb-1">Email <span class="text-[#D8A444]">*</span></label>
        <input
          v-model="booking.email"
          name="email"
          type="email"
          required
          class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-300 mb-1">Phone <span class="text-[#D8A444]">*</span></label>
        <input
          v-model="booking.phone"
          name="phone"
          type="tel"
          required
          class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-300 mb-1">Additional Information</label>
        <textarea
          v-model="booking.additionalInfo"
          name="message"
          rows="3"
          placeholder="Flight number, special requests, accessibility needs..."
          class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none resize-none"
        ></textarea>
      </div>

      <div class="flex justify-between pt-2">
        <button
          type="button"
          @click="booking.prevStep()"
          class="px-6 py-3 rounded-lg font-semibold text-stone-300 border border-stone-600 hover:border-stone-400 transition-all"
        >
          ← Back
        </button>
        <button
          type="submit"
          class="px-8 py-3 rounded-lg font-semibold bg-[#D8A444] text-stone-900 hover:bg-[#B4952E] transition-all"
        >
          Submit Booking
        </button>
      </div>
    </form>
  </div>
</template>
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/booking/StepUser.vue
git commit -m "feat: add StepUser with Formspree submission"
```

---

## Task 9: Create BookingWizard orchestrator

**Files:**
- Create: `src/components/booking/BookingWizard.vue`

- [ ] **Step 1: Create the component**

Create `src/components/booking/BookingWizard.vue`:

```vue
<script setup>
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
import WizardProgress from './WizardProgress.vue'
import StepType from './StepType.vue'
import StepRoute from './StepRoute.vue'
import StepDetails from './StepDetails.vue'
import StepSummary from './StepSummary.vue'
import StepUser from './StepUser.vue'

const booking = useBookingStore()

const stepComponents = {
  1: StepType,
  2: StepRoute,
  3: StepDetails,
  4: StepSummary,
  5: StepUser
}

const currentComponent = computed(() => stepComponents[booking.step])
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <WizardProgress :current-step="booking.step" />
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

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/booking/BookingWizard.vue
git commit -m "feat: add BookingWizard orchestrator with step transitions"
```

---

## Task 10: Update Book.vue to mount the wizard

**Files:**
- Modify: `src/pages/Book.vue`

- [ ] **Step 1: Replace Book.vue content**

Replace the entire contents of `src/pages/Book.vue` with:

```vue
<script setup>
import BookingWizard from '../components/booking/BookingWizard.vue'
</script>

<template>
  <div class="relative min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 py-24" id="booking">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img
        src="../assets/chania-meetteam.jpg"
        class="w-full h-full object-cover"
        alt="Crete Transfer"
      />
      <div class="absolute inset-0 bg-stone-900/75 backdrop-blur-sm"></div>
    </div>

    <!-- Wizard Container -->
    <div class="relative w-full max-w-2xl bg-stone-900/85 p-6 sm:p-10 rounded-2xl shadow-2xl border border-stone-700/50">
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-stone-100 mb-2">Book Your Transfer</h1>
        <p class="text-stone-400">Private transfers and tours across Crete</p>
      </div>
      <BookingWizard />
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Book.vue
git commit -m "feat: mount BookingWizard in Book page"
```

---

## Task 11: Add OpenWidget and clean up

**Files:**
- Modify: `index.html`
- Modify: `package.json` (remove @emailjs/browser)

- [ ] **Step 1: Add OpenWidget script to index.html**

In `index.html`, add the following before `</body>`:

```html
    <script>
      window.__ow = window.__ow || {};
      window.__ow.organizationId = "f4372052-084c-4b72-a43f-8b05b2f98af8";
      window.__ow.integration_name = "manual_settings";
      window.__ow.product_name = "openwidget";
      ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
    </script>
  </body>
```

- [ ] **Step 2: Remove @emailjs/browser**

```bash
npm uninstall @emailjs/browser
```

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add index.html package.json package-lock.json
git commit -m "feat: add OpenWidget and remove unused emailjs dependency"
```

---

## Spec Coverage Check

| Spec requirement | Covered by |
|---|---|
| Vue 3 Composition API | All step components use `<script setup>` |
| Pinia store with full state shape | Task 2 |
| 5-step wizard (Type, Route, Details, Summary, User Info) | Tasks 4–8 |
| Transfer pricing logic (HERAKLION/CHANIA matrix) | Task 2 `calculatePrice()` |
| Tour type → price always null | Task 2 `calculatePrice()` early return |
| Tour: predefined list + free text | Task 5 StepRoute |
| Transfer: pickup/dropoff dropdowns + detail fields | Task 5 StepRoute |
| `calculatePrice()` called before summary | Task 6 StepDetails `handleContinue` |
| Price null → "we will contact you" message | Task 7 StepSummary |
| Formspree endpoint `mpqkreew` | Task 8 StepUser |
| All booking state sent as hidden inputs | Task 8 StepUser |
| Mobile-first responsive UI | All components (Tailwind sm: breakpoints) |
| Gold accent `#D8A444`, dark stone palette | All components |
| No vehicle selection | Not present anywhere |
| OpenWidget script in index.html | Task 11 |
| Pinia registered in main.js | Task 1 |
| Progress bar with 5 steps | Task 3 WizardProgress |
| Step transitions | Task 9 BookingWizard (CSS slide transition) |
