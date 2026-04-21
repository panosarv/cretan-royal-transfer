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
