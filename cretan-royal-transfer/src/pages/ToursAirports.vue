<template>
  <div class="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50" id="tours-airports">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-3xl font-extrabold text-stone-900 sm:text-4xl">
        {{ t('message.tours_airports_title') }}
      </h2>
      <p class="mt-4 text-lg text-stone-600">
        {{ t('message.tours_airports_subtitle') }}
      </p>
    </div>

    <div class="mt-12 max-w-7xl mx-auto p-2 scrollbar-hide">
      <swiper v-if="isMobile" :slides-per-view="1" :space-between="10" :autoplay="{ delay: 3000 }" @slide-change="updateActiveIndex" class="swiper-container" :navigation="true" :modules="[Navigation]" ref="carousel">
        <swiper-slide v-for="(service, index) in services" :key="index">
          <button @click="selectService(service)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200 hover:shadow-xl transition flex items-center justify-center p-4 text-center min-w-[180px] h-24 w-full">
            <h3 class="text-md font-semibold text-stone-900 whitespace-normal break-words">{{ service.title }}</h3>
          </button>
        </swiper-slide>
      </swiper>
      <div class="pagination-dots" v-if="isMobile">
        <span v-for="(service, index) in services" :key="index" class="dot" :class="{ active: index === activeIndex }"></span>
      </div>
     
      <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <button v-for="(service, index) in services" :key="index" @click="selectService(service)" class="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200 hover:shadow-xl transition flex items-center justify-center p-4 text-center w-full h-24" :class="{'bg-gray-300': selectedService === service}">
          <h3 class="text-md font-semibold text-stone-900 whitespace-normal break-words">{{ service.title }}</h3>
        </button>
      </div>
    </div>

    <div v-if="selectedService" class="max-w-5xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg border border-stone-200">
      <img :src="selectedService.image" :alt="selectedService.title" class="w-full h-64 object-cover rounded-lg" />
      <div class="mt-6">
        <h3 class="text-2xl font-bold text-stone-900">{{ selectedService.title }}</h3>
        <p class="mt-4 text-lg text-stone-600">{{ selectedService.description }}</p>
        <ul class="mt-4 text-stone-500">
          <li v-for="(feature, i) in selectedService.features" :key="i" class="flex items-center">
            <img src="/src/assets/icons/next.svg" class="h-5 w-5 text-amber-600 mr-2" />
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { useI18n } from 'vue-i18n';

import airportimg from '/src/assets/airport-chania-services.jpg';
import airportimg2 from '/src/assets/airport-heraklion-services.jpg';
import knossosimg from '/src/assets/reliability-aboutus.jpg';
import preveliimg from '/src/assets/preveli-services.jpg';
import arkadiimg from '/src/assets/arkadi-services.jpg';
import kalypsoimg from '/src/assets/kalypso-tours.jpg';
import elafonisiimg from '/src/assets/elafonisi-tours.jpeg';
import balosimg from '/src/assets/balos-tours.jpg';
import kournasimg from '/src/assets/kournas-tours.jpg';
import samariaimg from '/src/assets/samaria-tours.jpg';
import chaniaimg from '/src/assets/chania-tours.jpg';
import matalaimg from '/src/assets/matala-malia-tours.jpg';
import heraklionimg from '/src/assets/heraklion-tours.jpg';
import seitanimg from '/src/assets/seitan-services.jpg';
import sfakiaimg from '/src/assets/sfakia-tours.jpg';
import phalasarnaimg from '/src/assets/phalasarna-tours.jpg';

const { t } = useI18n();

const carousel = ref(null);
const services = computed(() => [
  {
      image: airportimg,
      title: t('message.airport_transfer_chania_title'),
      description: t('message.airport_transfer_chania_description'),
      features: [t('message.airport_transfer_chania_feature1'), t('message.airport_transfer_chania_feature2'), t('message.airport_transfer_chania_feature3')]
    },
    {
      image: airportimg2,
      title: t('message.airport_transfer_heraklion_title'),
      description: t('message.airport_transfer_heraklion_description'),
      features: [t('message.airport_transfer_heraklion_feature1'), t('message.airport_transfer_heraklion_feature2'), t('message.airport_transfer_heraklion_feature3')]
    },
    {
      image: knossosimg,
      title: t('message.knossos_tour_title'),
      description: t('message.knossos_tour_description'),
      features: [t('message.knossos_tour_feature1'), t('message.knossos_tour_feature2'), t('message.knossos_tour_feature3')]
    },
    {
      image: preveliimg,
      title: t('message.preveli_tour_title'),
      description: t('message.preveli_tour_description'),
      features: [t('message.preveli_tour_feature1'), t('message.preveli_tour_feature2'), t('message.preveli_tour_feature3')]
    },
    {
      image: arkadiimg,
      title: t('message.arkadi_tour_title'),
      description: t('message.arkadi_tour_description'),
      features: [t('message.arkadi_tour_feature1'), t('message.arkadi_tour_feature2'), t('message.arkadi_tour_feature3')]
    },
    {
      image: kalypsoimg,
      title: t('message.kalypso_plakia_tour_title'),
      description: t('message.kalypso_plakia_tour_description'),
      features: [t('message.kalypso_plakia_tour_feature1'), t('message.kalypso_plakia_tour_feature2'), t('message.kalypso_plakia_tour_feature3')]
    },
    {
      image: elafonisiimg,
      title: t('message.elafonisi_tour_title'),
      description: t('message.elafonisi_tour_description'),
      features: [t('message.elafonisi_tour_feature1'), t('message.elafonisi_tour_feature2'), t('message.elafonisi_tour_feature3')]
    },
    {
      image: balosimg,
      title: t('message.balos_tour_title'),
      description: t('message.balos_tour_description'),
      features: [t('message.balos_tour_feature1'), t('message.balos_tour_feature2'), t('message.balos_tour_feature3')]
    },
    {
      image: kournasimg,
      title: t('message.kournas_lake_tour_title'),
      description: t('message.kournas_lake_tour_description'),
      features: [t('message.kournas_lake_tour_feature1'), t('message.kournas_lake_tour_feature2'), t('message.kournas_lake_tour_feature3')]
    },
    {
      image: samariaimg,
      title: t('message.samaria_tour_title'),
      description: t('message.samaria_tour_description'),
      features: [t('message.samaria_tour_feature1'), t('message.samaria_tour_feature2'), t('message.samaria_tour_feature3')]
    },
    {
      image: chaniaimg,
      title: t('message.chania_old_town_tour_title'),
      description: t('message.chania_old_town_tour_description'),
      features: [t('message.chania_old_town_tour_feature1'), t('message.chania_old_town_tour_feature2'), t('message.chania_old_town_tour_feature3')]
    },
    {
      image: matalaimg,
      title: t('message.matala_tour_title'),
      description: t('message.matala_tour_description'),
      features: [t('message.matala_tour_feature1'), t('message.matala_tour_feature2'), t('message.matala_tour_feature3')]
    },
    {
      image: heraklionimg,
      title: t('message.heraklion_tour_title'),
      description: t('message.heraklion_tour_description'),
      features: [t('message.heraklion_tour_feature1'), t('message.heraklion_tour_feature2'), t('message.heraklion_tour_feature3')]
    },
    {
      image: seitanimg,
      title: t('message.seitan_harbor_tour_title'),
      description: t('message.seitan_harbor_tour_description'),
      features: [t('message.seitan_harbor_tour_feature1'), t('message.seitan_harbor_tour_feature2'), t('message.seitan_harbor_tour_feature3')]
    },
    {
      image: sfakiaimg,
      title: t('message.sfakia_tour_title'),
      description: t('message.sfakia_tour_description'),
      features: [t('message.sfakia_tour_feature1'), t('message.sfakia_tour_feature2'), t('message.sfakia_tour_feature3')]
    },
    {
      image:phalasarnaimg,
      title: t('message.phalasarna_tour_title'),
      description: t('message.phalasarna_tour_description'),
      features: [t('message.phalasarna_tour_feature1'), t('message.phalasarna_tour_feature2'), t('message.phalasarna_tour_feature3')]
    }
  ]);

const selectedService = ref(services.value[0]);
const isMobile = ref(false);
const activeIndex = ref(0);

const selectService = (service) => {
  selectedService.value = service;
};

const updateActiveIndex = (swiper) => {
  activeIndex.value = swiper.realIndex;
  selectService(services.value[swiper.realIndex]);
};

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
  });
});
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.pagination-dots {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #ccc;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.dot.active {
  background-color: #333;
}
.swiper-button-next, .swiper-button-prev {
  color: #333;
}
.swiper-button-next:hover, .swiper-button-prev:hover {
  color: #000;
}
.swiper-button-next:after, .swiper-button-prev:after {
  font-size: 20px;
}
.swiper-pagination-bullet {
  background: #333;
} 

</style>

