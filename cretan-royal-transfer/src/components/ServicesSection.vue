<template>
  <div class="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50" id="services">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-stone-900 sm:text-4xl">
          {{ t('message.services_title') }}
        </h2>
        <p class="mt-4 text-lg text-stone-600">
          {{ t('message.services_subtitle') }}
        </p>
      </div>

      <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(service, index) in services" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200">
          <img :src="service.image" :alt="service.alt" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-stone-900 mb-2">{{ service.title }}</h3>
            <p class="text-stone-600 mb-4">{{ service.description }}</p>
            <ul class="text-stone-500 mb-4">
              <li v-for="(feature, i) in service.features" :key="i" class="flex items-center">
                <img src="/src/assets/icons/next.svg" class="h-5 w-5 text-amber-600 mr-2" alt="Next Icon" />
                {{ feature }}
              </li>
            </ul>
            <RouterLink to="/book">
              <button class="w-full bg-stone-800 text-white py-2 rounded-md hover:bg-stone-900 transition-colors">
                {{ t('message.book_now') }}
              </button>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Added View More button section -->
      <div class="mt-12 text-center">
        <RouterLink to="/tours-airports">
          <button class="bg-stone-800 text-white py-3 px-6 rounded-md hover:bg-stone-900 transition-colors text-lg font-semibold">
            {{ t('message.view_more') }}
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import aiportchaniaimg from '/src/assets/airport-chania-services.jpg';
import airportheraklionimg from '/src/assets/airport-heraklion-services.jpg';
import knossostourimg from '/src/assets/reliability-aboutus.jpg';
import prevelitourimg from '/src/assets/preveli-services.jpg';
import arkaditourimg from '/src/assets/arkadi-services.jpg';
import elafonisiimg from '/src/assets/elafonisi-services.jpg';

const { t } = useI18n();

const services = computed(() => [
  {
    image: aiportchaniaimg,
    title: t('message.airport_transfer_chania_title'),
    description: t('message.airport_transfer_chania_description'),
    features: [t('message.airport_transfer_chania_feature1'), t('message.airport_transfer_chania_feature2'), t('message.airport_transfer_chania_feature3')],
    alt: 'Airport Transfer Chania'
  },
  {
    image: airportheraklionimg,
    title: t('message.airport_transfer_heraklion_title'),
    description: t('message.airport_transfer_heraklion_description'),
    features: [t('message.airport_transfer_heraklion_feature1'), t('message.airport_transfer_heraklion_feature2'), t('message.airport_transfer_heraklion_feature3')],
    alt: 'Airport Transfer Heraklion'
  },
  {
    image: knossostourimg,
    title: t('message.knossos_tour_title'),
    description: t('message.knossos_tour_description'),
    features: [t('message.knossos_tour_feature1'), t('message.knossos_tour_feature2'), t('message.knossos_tour_feature3')],
    alt: 'Knossos Tour'
  },
  {
    image: prevelitourimg,
    title: t('message.preveli_tour_title'),
    description: t('message.preveli_tour_description'),
    features: [t('message.preveli_tour_feature1'), t('message.preveli_tour_feature2'), t('message.preveli_tour_feature3')],
    alt: 'Preveli Tour'
  },
  {
    image: arkaditourimg,
    title: t('message.arkadi_tour_title'),
    description: t('message.arkadi_tour_description'),
    features: [t('message.arkadi_tour_feature1'), t('message.arkadi_tour_feature2'), t('message.arkadi_tour_feature3')],
    alt: 'Arkadi Tour'
  },
  {
    image: elafonisiimg,
    title: t('message.elafonisi_tour_title'),
    description: t('message.elafonisi_tour_description'),
    features: [t('message.elafonisi_tour_feature1'), t('message.elafonisi_tour_feature2'), t('message.elafonisi_tour_feature3')],
    alt: 'Elafonisi Tour'
  }
]);
</script>
