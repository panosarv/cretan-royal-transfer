<template>
  <div class="relative h-screen bg-brand-charcoal overflow-hidden">
    <!-- Parallax background -->
    <div
      class="absolute inset-0 scale-110"
      :style="{ transform: `translateY(${offsetY}px) scale(1.1)` }"
    >
      <img
        src="../assets/airport-hero.jpg"
        class="w-full h-full object-cover"
        alt="Crete Transfer"
      />
      <div class="absolute inset-0 bg-black/55"></div>
    </div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center md:text-left">
      <div class="w-full md:w-2/3 mt-12 md:mt-0">
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 0 } }"
          class="mb-6 flex items-center justify-center"
        >
          <img src="../assets/crt-hero.png" alt="Cretan Royal Transfer" class="h-40 w-auto md:h-auto" />
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150 } }"
        >
          <p class="text-lg sm:text-xl md:text-2xl text-stone-200 mb-8 text-justify md:text-justify">
            {{ t('message.hero_banner_subtitle') }}
          </p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
          class="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <RouterLink to="/book">
            <button class="bg-brand-gold text-brand-charcoal px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-gold-dark transition-all duration-300 hover:ring-4 hover:ring-brand-gold/40 hover:scale-105 w-full sm:w-auto font-heading">
              {{ t('message.book_us') }}
            </button>
          </RouterLink>
          <a href="tel:+306973857378" @click="trackPhoneClick('hero')">
            <button class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto font-heading">
              {{ t('message.call_now') }}
            </button>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useParallax } from '@/composables/useParallax';
import { trackPhoneClick } from '@/utils/analytics';

const { t } = useI18n();
const { offsetY } = useParallax(0.15);
</script>
