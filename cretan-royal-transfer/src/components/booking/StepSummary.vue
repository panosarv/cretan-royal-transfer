<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBookingStore } from '@/stores/booking'

const { t } = useI18n()
const booking = useBookingStore()

const typeLabel = computed(() =>
  booking.type === 'transfer'
    ? t('message.wizard_type_transfer_label')
    : t('message.wizard_type_tour_label')
)
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-stone-100 mb-2 text-center">{{ t('message.wizard_summary_heading') }}</h2>
    <p class="text-stone-400 text-center mb-8">{{ t('message.wizard_summary_subtitle') }}</p>

    <div class="space-y-4 mb-8">
      <!-- Type -->
      <div class="bg-stone-800/60 rounded-xl p-4 border border-stone-700">
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-1">{{ t('message.wizard_summary_service_type') }}</p>
        <p class="text-stone-100 font-semibold">{{ typeLabel }}</p>
      </div>

      <!-- Route: Transfer -->
      <div v-if="booking.type === 'transfer'" class="bg-stone-800/60 rounded-xl p-4 border border-stone-700">
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-2">{{ t('message.wizard_summary_route') }}</p>
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
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-2">{{ t('message.wizard_summary_tour') }}</p>
        <p v-if="booking.selectedTour" class="text-stone-100 font-semibold">{{ booking.selectedTour }}</p>
        <p v-if="booking.customTour" class="text-stone-300 text-sm mt-1">{{ booking.customTour }}</p>
      </div>

      <!-- Date & Time -->
      <div class="bg-stone-800/60 rounded-xl p-4 border border-stone-700">
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-2">{{ t('message.wizard_summary_datetime') }}</p>
        <p class="text-stone-100">{{ booking.date }} at {{ booking.time }}</p>
      </div>

      <!-- Group details -->
      <div class="bg-stone-800/60 rounded-xl p-4 border border-stone-700">
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-2">{{ t('message.wizard_summary_group') }}</p>
        <div class="grid grid-cols-2 gap-2 text-sm text-stone-300">
          <span>{{ t('message.wizard_summary_passengers') }}: <strong class="text-stone-100">{{ booking.passengers }}</strong></span>
          <span>{{ t('message.wizard_summary_luggage') }}: <strong class="text-stone-100">{{ booking.luggage }}</strong></span>
          <span v-if="booking.babySeats > 0">{{ t('message.wizard_summary_baby_seats') }}: <strong class="text-stone-100">{{ booking.babySeats }}</strong></span>
          <span v-if="booking.boosterSeats > 0">{{ t('message.wizard_summary_booster_seats') }}: <strong class="text-stone-100">{{ booking.boosterSeats }}</strong></span>
        </div>
      </div>

      <!-- Price -->
      <div
        class="rounded-xl p-4 border"
        :class="booking.hasPrice ? 'bg-[#D8A444]/10 border-[#D8A444]/40' : 'bg-stone-800/60 border-stone-600'"
      >
        <p class="text-xs uppercase tracking-wider text-stone-500 mb-1">{{ t('message.wizard_summary_price') }}</p>
        <p v-if="booking.hasPrice" class="text-2xl font-bold text-[#D8A444]">€{{ booking.price }}</p>
        <p v-else class="text-stone-300">{{ t('message.wizard_summary_price_tbc') }}</p>
      </div>
    </div>

    <div class="flex justify-between">
      <button
        type="button"
        @click="booking.prevStep()"
        class="px-6 py-3 rounded-lg font-semibold text-stone-300 border border-stone-600 hover:border-stone-400 transition-all"
      >
        ← {{ t('message.wizard_back') }}
      </button>
      <button
        type="button"
        @click="booking.nextStep()"
        class="px-6 py-3 rounded-lg font-semibold bg-[#D8A444] text-stone-900 hover:bg-[#B4952E] transition-all"
      >
        {{ t('message.wizard_continue') }} →
      </button>
    </div>
  </div>
</template>
