<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 bg-brand-charcoal" id="about">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <!-- Left: Asymmetric mosaic grid -->
        <div class="grid grid-cols-2 grid-rows-2 gap-3 h-[420px]">
          <div
            class="row-span-2 overflow-hidden rounded-2xl"
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :visible-once="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 0 } }"
          >
            <img :src="reliabilityimg" class="w-full h-full object-cover" alt="Reliable Transfers" />
          </div>
          <div
            class="overflow-hidden rounded-2xl"
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :visible-once="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 100 } }"
          >
            <img :src="safetyimg" class="w-full h-full object-cover" alt="Safety First" />
          </div>
          <div
            class="overflow-hidden rounded-2xl"
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :visible-once="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 200 } }"
          >
            <img :src="airportimg" class="w-full h-full object-cover" alt="Airport Transfers" />
          </div>
        </div>

        <!-- Right: Features list -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <p class="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">WHY CHOOSE US</p>
          <h2 class="text-3xl font-extrabold text-stone-100 tracking-tight sm:text-4xl mb-10 font-heading">
            {{ t('message.about_us_title') }}
          </h2>

          <div class="space-y-8">
            <div
              v-for="(item, index) in features"
              :key="index"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 120, duration: 500 } }"
              class="flex gap-5"
            >
              <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-gold text-brand-charcoal">
                <img :src="item.icon" class="h-6 w-6" :alt="item.alt" />
              </div>
              <div class="border-l-2 border-brand-gold pl-5">
                <h3 class="text-base font-semibold text-stone-100 font-heading">{{ item.title }}</h3>
                <p class="mt-1 text-sm text-stone-300 leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import caricon from '/src/assets/icons/car.svg';
import shieldicon from '/src/assets/icons/shield.svg';
import airporticon from '/src/assets/icons/airport.svg';
import mapicon from '/src/assets/icons/map.svg';
import reliabilityimg from '/src/assets/reliability-aboutus.jpg';
import safetyimg from '/src/assets/safety-aboutus.jpg';
import airportimg from '/src/assets/airport-aboutus.jpg';

const { t } = useI18n();

const features = computed(() => [
  { icon: caricon,     title: t('message.reliable_transfers_title'),  description: t('message.reliable_transfers_description'),  alt: 'Car Icon' },
  { icon: shieldicon,  title: t('message.safety_first_title'),        description: t('message.safety_first_description'),        alt: 'Shield Icon' },
  { icon: airporticon, title: t('message.airport_transfers_title'),   description: t('message.airport_transfers_description'),   alt: 'Airport Icon' },
  { icon: mapicon,     title: t('message.leisure_trips_title'),       description: t('message.leisure_trips_description'),       alt: 'Map Icon' },
]);
</script>
