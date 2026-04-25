<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBookingStore } from '@/stores/booking'
import LocationPicker from './LocationPicker.vue'

const { t } = useI18n()
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
  'Sfakia',
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
  'Other',
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
      {{ booking.type === 'transfer' ? t('message.wizard_route_transfer_heading') : t('message.wizard_route_tour_heading') }}
    </h2>
    <p class="text-stone-400 text-center mb-8">
      {{ booking.type === 'transfer' ? t('message.wizard_route_transfer_subtitle') : t('message.wizard_route_tour_subtitle') }}
    </p>

    <!-- Transfer fields -->
    <template v-if="booking.type === 'transfer'">
      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">{{ t('message.wizard_route_pickup_label') }}</label>
          <select
            v-model="booking.pickup"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          >
            <option value="">{{ t('message.wizard_route_pickup_placeholder') }}</option>
            <option v-for="loc in transferLocations" :key="loc" :value="loc">{{ loc }}</option>
          </select>
        </div>
        <LocationPicker
          :label="t('message.wizard_route_precise_pickup')"
          :text="booking.pickupText"
          :latlng="booking.pickupLatLng"
          @update:text="booking.pickupText = $event"
          @update:latlng="booking.pickupLatLng = $event"
        />
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">{{ t('message.wizard_route_dropoff_label') }}</label>
          <select
            v-model="booking.dropoff"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          >
            <option value="">{{ t('message.wizard_route_dropoff_placeholder') }}</option>
            <option v-for="loc in transferLocations" :key="loc" :value="loc">{{ loc }}</option>
          </select>
        </div>
        <LocationPicker
          :label="t('message.wizard_route_precise_dropoff')"
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
          <label class="block text-sm font-medium text-stone-300 mb-1">{{ t('message.wizard_route_select_tour') }}</label>
          <select
            v-model="booking.selectedTour"
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 focus:border-[#D8A444] focus:outline-none"
          >
            <option :value="null">{{ t('message.wizard_route_choose_tour') }}</option>
            <option v-for="tour in predefinedTours" :key="tour" :value="tour">{{ tour }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">{{ t('message.wizard_route_custom_tour_label') }}</label>
          <textarea
            v-model="booking.customTour"
            rows="3"
            :placeholder="t('message.wizard_route_custom_tour_placeholder')"
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
        ← {{ t('message.wizard_back') }}
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
        {{ t('message.wizard_continue') }} →
      </button>
    </div>
  </div>
</template>
