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
