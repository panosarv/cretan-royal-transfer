<script setup>
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
import LocationPicker from './LocationPicker.vue'

const booking = useBookingStore()

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
