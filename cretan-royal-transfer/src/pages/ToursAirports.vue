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

    <!-- Card grid -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(service, index) in services"
        :key="index"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: (index % 6) * 80, duration: 500 } }"
        class="group relative rounded-2xl overflow-hidden cursor-pointer h-[300px] shadow-lg transition-all duration-300"
        :class="selectedService === service ? 'ring-2 ring-brand-gold ring-offset-2 ring-offset-brand-stone' : 'hover:shadow-2xl'"
        @click="selectService(service)"
      >
        <img
          :src="service.image"
          :alt="service.title"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />

        <div class="absolute bottom-0 left-0 right-0 p-5">
          <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ service.category }}</span>
          <h3 class="text-white text-lg font-bold font-heading mt-1">{{ service.title }}</h3>
          <p class="text-stone-300 text-sm mt-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
            {{ service.description }}
          </p>
        </div>

        <div v-if="selectedService === service" class="absolute top-4 right-4 bg-brand-gold rounded-full p-1.5">
          <svg class="w-4 h-4 text-brand-charcoal" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Detail panel -->
    <Transition name="detail-panel">
      <div
        v-if="selectedService"
        class="max-w-5xl mx-auto mt-12 bg-white shadow-2xl rounded-2xl overflow-hidden border border-stone-200"
      >
        <img :src="selectedService.image" :alt="selectedService.title" class="w-full h-72 object-cover" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div class="border-t-4 border-brand-gold pt-5">
            <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ selectedService.category }}</span>
            <h3 class="text-2xl font-bold text-brand-charcoal font-heading mt-2 mb-4">{{ selectedService.title }}</h3>
            <p class="text-stone-600 leading-relaxed">{{ selectedService.description }}</p>
          </div>
          <div class="flex flex-col justify-between">
            <ul class="space-y-3">
              <li v-for="(feature, i) in selectedService.features" :key="i" class="flex items-start text-stone-600">
                <img src="/src/assets/icons/next.svg" class="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" alt="" />
                {{ feature }}
              </li>
            </ul>
            <RouterLink to="/book" class="mt-6 inline-block">
              <button class="w-full bg-brand-gold text-brand-charcoal px-8 py-3 rounded-lg font-semibold font-heading hover:bg-brand-gold-dark transition-all duration-300 hover:scale-105">
                {{ t('message.book_now') }}
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
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

const selectedService = ref(null);

const selectService = (service) => {
  selectedService.value = selectedService.value === service ? null : service;
};
</script>

<style scoped>
.detail-panel-enter-active,
.detail-panel-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.detail-panel-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.detail-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
