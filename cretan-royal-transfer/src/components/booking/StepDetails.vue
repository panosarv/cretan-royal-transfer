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
