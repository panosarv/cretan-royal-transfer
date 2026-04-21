<template>
  <div id="services">
    <!-- Section header -->
    <div class="bg-brand-stone pt-16 pb-8 text-center px-4">
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 400 } }"
        class="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3"
      >
        OUR SERVICES
      </p>
      <h2
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
        class="text-3xl font-extrabold text-brand-charcoal sm:text-4xl font-heading"
      >
        {{ t('message.services_title') }}
      </h2>
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
        class="mt-4 text-lg text-stone-600 max-w-2xl mx-auto"
      >
        {{ t('message.services_subtitle') }}
      </p>
    </div>

    <!-- Alternating rows -->
    <div
      v-for="(service, index) in services"
      :key="index"
      class="flex flex-col min-h-[420px]"
      :class="index % 2 !== 0 ? 'md:flex-row-reverse bg-white' : 'md:flex-row bg-brand-stone'"
    >
      <!-- Image side -->
      <div
        class="w-full md:w-1/2 overflow-hidden min-h-[280px] md:min-h-full"
        v-motion
        :initial="{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }"
        :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
      >
        <img
          :src="service.image"
          :alt="service.alt"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      <!-- Text side -->
      <div
        class="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12"
        v-motion
        :initial="{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }"
        :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
      >
        <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-2">{{ service.category }}</span>
        <h3 class="text-2xl sm:text-3xl font-bold text-brand-charcoal font-heading mb-4">{{ service.title }}</h3>
        <p class="text-stone-600 mb-5 leading-relaxed">{{ service.description }}</p>
        <ul class="space-y-2 mb-7">
          <li v-for="(feature, i) in service.features" :key="i" class="flex items-center text-stone-500">
            <img src="/src/assets/icons/next.svg" class="h-4 w-4 mr-3 flex-shrink-0" alt="" />
            {{ feature }}
          </li>
        </ul>
        <div>
          <RouterLink to="/book">
            <button class="bg-brand-gold text-brand-charcoal px-8 py-3 rounded-lg font-semibold font-heading hover:bg-brand-gold-dark transition-all duration-300 hover:scale-105">
              {{ t('message.book_now') }}
            </button>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="bg-brand-stone py-16 text-center"
    >
      <RouterLink to="/tours-airports">
        <button class="bg-brand-charcoal text-white py-3 px-10 rounded-lg hover:bg-brand-dark transition-all duration-300 text-lg font-semibold font-heading hover:scale-105">
          {{ t('message.view_more') }}
        </button>
      </RouterLink>
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
  { image: aiportchaniaimg,     category: 'Airport Transfer',  title: t('message.airport_transfer_chania_title'),     description: t('message.airport_transfer_chania_description'),     features: [t('message.airport_transfer_chania_feature1'),     t('message.airport_transfer_chania_feature2'),     t('message.airport_transfer_chania_feature3')],     alt: 'Airport Transfer Chania' },
  { image: airportheraklionimg, category: 'Airport Transfer',  title: t('message.airport_transfer_heraklion_title'),  description: t('message.airport_transfer_heraklion_description'),  features: [t('message.airport_transfer_heraklion_feature1'),  t('message.airport_transfer_heraklion_feature2'),  t('message.airport_transfer_heraklion_feature3')],  alt: 'Airport Transfer Heraklion' },
  { image: knossostourimg,      category: 'Historical Tour',   title: t('message.knossos_tour_title'),                description: t('message.knossos_tour_description'),                features: [t('message.knossos_tour_feature1'),                t('message.knossos_tour_feature2'),                t('message.knossos_tour_feature3')],                alt: 'Knossos Tour' },
  { image: prevelitourimg,      category: 'Nature Tour',       title: t('message.preveli_tour_title'),                description: t('message.preveli_tour_description'),                features: [t('message.preveli_tour_feature1'),                t('message.preveli_tour_feature2'),                t('message.preveli_tour_feature3')],                alt: 'Preveli Tour' },
  { image: arkaditourimg,       category: 'Historical Tour',   title: t('message.arkadi_tour_title'),                 description: t('message.arkadi_tour_description'),                 features: [t('message.arkadi_tour_feature1'),                 t('message.arkadi_tour_feature2'),                 t('message.arkadi_tour_feature3')],                 alt: 'Arkadi Tour' },
  { image: elafonisiimg,        category: 'Beach Tour',        title: t('message.elafonisi_tour_title'),              description: t('message.elafonisi_tour_description'),              features: [t('message.elafonisi_tour_feature1'),              t('message.elafonisi_tour_feature2'),              t('message.elafonisi_tour_feature3')],              alt: 'Elafonisi Tour' },
]);
</script>
