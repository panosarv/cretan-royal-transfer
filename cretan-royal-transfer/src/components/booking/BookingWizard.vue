<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBookingStore } from '@/stores/booking'
import WizardProgress from './WizardProgress.vue'
import StepType from './StepType.vue'
import StepRoute from './StepRoute.vue'
import StepMap from './StepMap.vue'
import StepDetails from './StepDetails.vue'
import StepSummary from './StepSummary.vue'
import StepUser from './StepUser.vue'

const { t } = useI18n()
const booking = useBookingStore()

const transferStepDefs = computed(() => [
  { number: 1, label: t('message.wizard_step_type') },
  { number: 2, label: t('message.wizard_step_route') },
  { number: 3, label: t('message.wizard_step_details') },
  { number: 4, label: t('message.wizard_step_summary') },
  { number: 5, label: t('message.wizard_step_your_info') },
])

const tourStepDefs = computed(() => [
  { number: 1, label: t('message.wizard_step_type') },
  { number: 2, label: t('message.wizard_step_tour') },
  { number: 3, label: t('message.wizard_step_location') },
  { number: 4, label: t('message.wizard_step_details') },
  { number: 5, label: t('message.wizard_step_summary') },
  { number: 6, label: t('message.wizard_step_your_info') },
])

const transferComponents = [StepType, StepRoute, StepDetails, StepSummary, StepUser]
const tourComponents = [StepType, StepRoute, StepMap, StepDetails, StepSummary, StepUser]

const stepDefs = computed(() => booking.type === 'tour' ? tourStepDefs.value : transferStepDefs.value)
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
