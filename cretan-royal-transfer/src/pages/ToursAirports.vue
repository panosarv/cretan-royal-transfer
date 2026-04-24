<template>
  <div class="bg-brand-stone min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8" id="tours-airports">
    <!-- Header -->
    <div class="max-w-7xl mx-auto text-center mb-12">
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 400 } }"
        class="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3"
      >
        EXPLORE CRETE
      </p>
      <h2
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
        class="text-3xl font-extrabold text-brand-charcoal sm:text-4xl font-heading"
      >
        {{ t('message.tours_airports_title') }}
      </h2>
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
        class="mt-4 text-lg text-stone-600"
      >
        {{ t('message.tours_airports_subtitle') }}
      </p>
    </div>

    <!-- Flip card grid -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(service, index) in services"
        :key="index"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: (index % 6) * 80, duration: 500 } }"
        class="h-[320px] cursor-pointer"
        style="perspective: 1000px;"
        @click="toggleFlip(index)"
      >
        <!-- Inner rotating wrapper -->
        <div
          class="relative w-full h-full transition-transform duration-700"
          :style="{ transformStyle: 'preserve-3d', transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
        >
          <!-- Front face -->
          <div
            class="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
            style="backface-visibility: hidden;"
          >
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <!-- Flip hint icon -->
            <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-5">
              <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ service.category }}</span>
              <h3 class="text-white text-lg font-bold font-heading mt-1">{{ service.title }}</h3>
            </div>
          </div>

          <!-- Back face -->
          <div
            class="absolute inset-0 rounded-2xl bg-brand-charcoal p-5 flex flex-col justify-between shadow-lg"
            style="backface-visibility: hidden; transform: rotateY(180deg);"
          >
            <div class="overflow-y-auto flex-1 pr-1">
              <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ service.category }}</span>
              <h3 class="text-stone-100 text-base font-bold font-heading mt-1 mb-2">{{ service.title }}</h3>
              <p class="text-stone-300 text-sm leading-relaxed mb-3">{{ service.description }}</p>
              <ul class="space-y-1.5">
                <li v-for="(feature, i) in service.features" :key="i" class="flex items-start text-stone-400 text-sm">
                  <img src="/src/assets/icons/next.svg" class="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" alt="" />
                  {{ feature }}
                </li>
              </ul>
            </div>
            <RouterLink to="/book" class="mt-3 block">
              <button class="w-full bg-brand-gold text-brand-charcoal px-6 py-2.5 rounded-lg font-semibold font-heading hover:bg-brand-gold-dark transition-all duration-300 hover:scale-105 text-sm">
                {{ t('message.book_now') }}
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

import airportimg    from '/src/assets/airport-chania-services.jpg';
import airportimg2   from '/src/assets/airport-heraklion-services.jpg';
import knossosimg    from '/src/assets/reliability-aboutus.jpg';
import preveliimg    from '/src/assets/preveli-services.jpg';
import arkadiimg     from '/src/assets/arkadi-services.jpg';
import kalypsoimg    from '/src/assets/kalypso-tours.jpg';
import elafonisiimg  from '/src/assets/elafonisi-tours.jpeg';
import balosimg      from '/src/assets/balos-tours.jpg';
import kournasimg    from '/src/assets/kournas-tours.jpg';
import samariaimg    from '/src/assets/samaria-tours.jpg';
import chaniaimg     from '/src/assets/chania-tours.jpg';
import matalaimg     from '/src/assets/matala-malia-tours.jpg';
import heraklionimg  from '/src/assets/heraklion-tours.jpg';
import seitanimg     from '/src/assets/seitan-services.jpg';
import sfakiaimg     from '/src/assets/sfakia-tours.jpg';
import phalasarnaimg from '/src/assets/phalasarna-tours.jpg';

const { t } = useI18n();

const services = computed(() => [
  { image: airportimg,    category: 'Airport Transfer', title: t('message.airport_transfer_chania_title'),     description: t('message.airport_transfer_chania_description'),     features: [t('message.airport_transfer_chania_feature1'),     t('message.airport_transfer_chania_feature2'),     t('message.airport_transfer_chania_feature3')] },
  { image: airportimg2,   category: 'Airport Transfer', title: t('message.airport_transfer_heraklion_title'),  description: t('message.airport_transfer_heraklion_description'),  features: [t('message.airport_transfer_heraklion_feature1'),  t('message.airport_transfer_heraklion_feature2'),  t('message.airport_transfer_heraklion_feature3')] },
  { image: knossosimg,    category: 'Historical Tour',  title: t('message.knossos_tour_title'),                description: t('message.knossos_tour_description'),                features: [t('message.knossos_tour_feature1'),                t('message.knossos_tour_feature2'),                t('message.knossos_tour_feature3')] },
  { image: preveliimg,    category: 'Nature Tour',      title: t('message.preveli_tour_title'),                description: t('message.preveli_tour_description'),                features: [t('message.preveli_tour_feature1'),                t('message.preveli_tour_feature2'),                t('message.preveli_tour_feature3')] },
  { image: arkadiimg,     category: 'Historical Tour',  title: t('message.arkadi_tour_title'),                 description: t('message.arkadi_tour_description'),                 features: [t('message.arkadi_tour_feature1'),                 t('message.arkadi_tour_feature2'),                 t('message.arkadi_tour_feature3')] },
  { image: kalypsoimg,    category: 'Beach Tour',       title: t('message.kalypso_plakia_tour_title'),         description: t('message.kalypso_plakia_tour_description'),         features: [t('message.kalypso_plakia_tour_feature1'),         t('message.kalypso_plakia_tour_feature2'),         t('message.kalypso_plakia_tour_feature3')] },
  { image: elafonisiimg,  category: 'Beach Tour',       title: t('message.elafonisi_tour_title'),              description: t('message.elafonisi_tour_description'),              features: [t('message.elafonisi_tour_feature1'),              t('message.elafonisi_tour_feature2'),              t('message.elafonisi_tour_feature3')] },
  { image: balosimg,      category: 'Beach Tour',       title: t('message.balos_tour_title'),                  description: t('message.balos_tour_description'),                  features: [t('message.balos_tour_feature1'),                  t('message.balos_tour_feature2'),                  t('message.balos_tour_feature3')] },
  { image: kournasimg,    category: 'Nature Tour',      title: t('message.kournas_lake_tour_title'),           description: t('message.kournas_lake_tour_description'),           features: [t('message.kournas_lake_tour_feature1'),           t('message.kournas_lake_tour_feature2'),           t('message.kournas_lake_tour_feature3')] },
  { image: samariaimg,    category: 'Nature Tour',      title: t('message.samaria_tour_title'),                description: t('message.samaria_tour_description'),                features: [t('message.samaria_tour_feature1'),                t('message.samaria_tour_feature2'),                t('message.samaria_tour_feature3')] },
  { image: chaniaimg,     category: 'City Tour',        title: t('message.chania_old_town_tour_title'),        description: t('message.chania_old_town_tour_description'),        features: [t('message.chania_old_town_tour_feature1'),        t('message.chania_old_town_tour_feature2'),        t('message.chania_old_town_tour_feature3')] },
  { image: matalaimg,     category: 'Beach Tour',       title: t('message.matala_tour_title'),                 description: t('message.matala_tour_description'),                 features: [t('message.matala_tour_feature1'),                 t('message.matala_tour_feature2'),                 t('message.matala_tour_feature3')] },
  { image: heraklionimg,  category: 'City Tour',        title: t('message.heraklion_tour_title'),              description: t('message.heraklion_tour_description'),              features: [t('message.heraklion_tour_feature1'),              t('message.heraklion_tour_feature2'),              t('message.heraklion_tour_feature3')] },
  { image: seitanimg,     category: 'Nature Tour',      title: t('message.seitan_harbor_tour_title'),          description: t('message.seitan_harbor_tour_description'),          features: [t('message.seitan_harbor_tour_feature1'),          t('message.seitan_harbor_tour_feature2'),          t('message.seitan_harbor_tour_feature3')] },
  { image: sfakiaimg,     category: 'Nature Tour',      title: t('message.sfakia_tour_title'),                 description: t('message.sfakia_tour_description'),                 features: [t('message.sfakia_tour_feature1'),                 t('message.sfakia_tour_feature2'),                 t('message.sfakia_tour_feature3')] },
  { image: phalasarnaimg, category: 'Beach Tour',       title: t('message.phalasarna_tour_title'),             description: t('message.phalasarna_tour_description'),             features: [t('message.phalasarna_tour_feature1'),             t('message.phalasarna_tour_feature2'),             t('message.phalasarna_tour_feature3')] },
]);

const flipped = ref(Array(16).fill(false));

const toggleFlip = (index) => {
  flipped.value = flipped.value.map((v, i) => i === index ? !v : v);
};
</script>
