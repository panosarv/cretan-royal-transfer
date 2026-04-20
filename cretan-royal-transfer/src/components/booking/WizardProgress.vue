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
