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
