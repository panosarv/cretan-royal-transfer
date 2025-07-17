<template>
      <div class="absolute inset-0 flex items-center justify-center">
      </div>
  
      <div class="relative text-center md:text-left max-w-4xl">
        <Transition
          appear
          enter-active-class="transition duration-1000"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
          <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-[#E5E5E5] mb-6">
            {{ t('message.meet_the_team_title') }}
          </h1>
        </Transition>
  
        <Transition
          appear
          enter-active-class="transition duration-1000 delay-300"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
          <p class="text-lg sm:text-xl md:text-2xl text-[#E5E5E5] leading-relaxed text-justify" v-html="t('message.meet_the_team_description')">
          </p>
        </Transition>
      </div>
  </template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
  