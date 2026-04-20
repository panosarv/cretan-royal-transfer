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
