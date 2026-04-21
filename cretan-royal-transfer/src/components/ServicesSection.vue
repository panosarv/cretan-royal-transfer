<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 bg-brand-stone" id="services">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl font-extrabold text-brand-charcoal sm:text-4xl font-heading"
        >
          {{ t('message.services_title') }}
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 150 } }"
          class="mt-4 text-lg text-stone-600"
        >
          {{ t('message.services_subtitle') }}
        </p>
      </div>

      <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(service, index) in services"
          :key="index"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }"
          class="group bg-white rounded-2xl shadow-md overflow-hidden border border-stone-200 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
        >
          <div class="overflow-hidden h-48">
            <img
              :src="service.image"
              :alt="service.alt"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-brand-charcoal mb-2 font-heading">{{ service.title }}</h3>
            <p class="text-stone-600 mb-4">{{ service.description }}</p>
            <ul class="text-stone-500 mb-4 space-y-1">
              <li v-for="(feature, i) in service.features" :key="i" class="flex items-center">
                <img src="/src/assets/icons/next.svg" class="h-5 w-5 mr-2 flex-shrink-0" alt="Next Icon" />
                {{ feature }}
              </li>
            </ul>
            <RouterLink to="/book">
              <button class="w-full bg-brand-gold text-brand-charcoal py-2.5 rounded-lg hover:bg-brand-gold-dark transition-all duration-300 font-semibold font-heading">
                {{ t('message.book_now') }}
              </button>
            </RouterLink>
          </div>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
        class="mt-12 text-center"
      >
        <RouterLink to="/tours-airports">
          <button class="bg-brand-charcoal text-white py-3 px-8 rounded-lg hover:bg-brand-dark transition-all duration-300 text-lg font-semibold font-heading hover:scale-105">
            {{ t('message.view_more') }}
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import aiportchaniaimg from '/src/assets/airport-chania-services.jpg';
import airportheraklionimg from '/src/assets/airport-heraklion-services.jpg';
import knossostourimg from '/src/assets/reliability-aboutus.jpg';
import prevelitourimg from '/src/assets/preveli-services.jpg';
import arkaditourimg from '/src/assets/arkadi-services.jpg';
import elafonisiimg from '/src/assets/elafonisi-services.jpg';

const { t } = useI18n();

const services = computed(() => [
  { image: aiportchaniaimg,     title: t('message.airport_transfer_chania_title'),     description: t('message.airport_transfer_chania_description'),     features: [t('message.airport_transfer_chania_feature1'),     t('message.airport_transfer_chania_feature2'),     t('message.airport_transfer_chania_feature3')],     alt: 'Airport Transfer Chania' },
  { image: airportheraklionimg, title: t('message.airport_transfer_heraklion_title'),  description: t('message.airport_transfer_heraklion_description'),  features: [t('message.airport_transfer_heraklion_feature1'),  t('message.airport_transfer_heraklion_feature2'),  t('message.airport_transfer_heraklion_feature3')],  alt: 'Airport Transfer Heraklion' },
  { image: knossostourimg,      title: t('message.knossos_tour_title'),                description: t('message.knossos_tour_description'),                features: [t('message.knossos_tour_feature1'),                t('message.knossos_tour_feature2'),                t('message.knossos_tour_feature3')],                alt: 'Knossos Tour' },
  { image: prevelitourimg,      title: t('message.preveli_tour_title'),                description: t('message.preveli_tour_description'),                features: [t('message.preveli_tour_feature1'),                t('message.preveli_tour_feature2'),                t('message.preveli_tour_feature3')],                alt: 'Preveli Tour' },
  { image: arkaditourimg,       title: t('message.arkadi_tour_title'),                 description: t('message.arkadi_tour_description'),                 features: [t('message.arkadi_tour_feature1'),                 t('message.arkadi_tour_feature2'),                 t('message.arkadi_tour_feature3')],                 alt: 'Arkadi Tour' },
  { image: elafonisiimg,        title: t('message.elafonisi_tour_title'),              description: t('message.elafonisi_tour_description'),              features: [t('message.elafonisi_tour_feature1'),              t('message.elafonisi_tour_feature2'),              t('message.elafonisi_tour_feature3')],              alt: 'Elafonisi Tour' },
]);
</script>
