<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 bg-brand-charcoal" id="about">
    <div class="max-w-7xl mx-auto text-center">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-3xl font-extrabold text-stone-100 tracking-tight sm:text-4xl mb-16 font-heading"
      >
        {{ t('message.about_us_title') }}
      </h2>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
      <div
        v-for="(item, index) in features"
        :key="index"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 120, duration: 500 } }"
      >
        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-brand-gold text-brand-charcoal mx-auto">
          <img :src="item.icon" class="h-10 w-10" :alt="item.alt" />
        </div>
        <h3 class="text-lg font-semibold text-stone-100 mt-6 font-heading">{{ item.title }}</h3>
        <p class="mt-4 text-base text-stone-300 text-justify">{{ item.description }}</p>
      </div>
    </div>

    <!-- Reactive carousel (replaces getElementById DOM mutation) -->
    <div class="max-w-5xl mx-auto mt-16 relative rounded-xl overflow-hidden shadow-2xl">
      <div class="relative w-full aspect-video">
        <img
          v-for="(image, i) in images"
          :key="i"
          :src="image"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out"
          :class="i === currentSlide ? 'opacity-100' : 'opacity-0'"
          alt="Cretan Royal Transfer"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import caricon from '/src/assets/icons/car.svg';
import shieldicon from '/src/assets/icons/shield.svg';
import airporticon from '/src/assets/icons/airport.svg';
import mapicon from '/src/assets/icons/map.svg';
import reliabilityimg from '/src/assets/reliability-aboutus.jpg';
import safetyimg from '/src/assets/safety-aboutus.jpg';
import airportimg from '/src/assets/airport-aboutus.jpg';
import leasureimg from '/src/assets/leasure-aboutus.jpg';

const { t } = useI18n();

const features = computed(() => [
  { icon: caricon,     title: t('message.reliable_transfers_title'),  description: t('message.reliable_transfers_description'),  alt: 'Car Icon' },
  { icon: shieldicon,  title: t('message.safety_first_title'),        description: t('message.safety_first_description'),        alt: 'Shield Icon' },
  { icon: airporticon, title: t('message.airport_transfers_title'),   description: t('message.airport_transfers_description'),   alt: 'Airport Icon' },
  { icon: mapicon,     title: t('message.leisure_trips_title'),       description: t('message.leisure_trips_description'),       alt: 'Map Icon' },
]);

const images = [reliabilityimg, safetyimg, airportimg, leasureimg];
const currentSlide = ref(0);
let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % images.length;
  }, 3000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
