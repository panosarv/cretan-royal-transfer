<template>
  <div class="relative text-center md:text-left max-w-4xl">
    <div
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
    >
      <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-stone-100 mb-6 font-heading">
        {{ t('message.meet_the_team_title') }}
      </h1>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
    >
      <p class="text-lg sm:text-xl md:text-2xl text-stone-200 leading-relaxed text-justify" v-html="t('message.meet_the_team_description')" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
  