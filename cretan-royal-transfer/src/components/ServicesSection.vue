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

    <!-- Carousel wrapper: mobile/tablet only -->
    <div class="bg-brand-stone pb-12 block lg:hidden">
      <div
        ref="carousel"
        class="flex overflow-x-auto gap-6 px-6 md:px-12"
        style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none;"
        @scroll="onScroll"
      >
        <div
          v-for="(service, index) in services"
          :key="'carousel-' + index"
          class="flex-shrink-0 w-[280px] sm:w-[320px] h-[400px] cursor-pointer"
          style="scroll-snap-align: start; perspective: 1000px;"
          @click="toggleFlip(index)"
        >
          <div
            class="relative w-full h-full transition-transform duration-700"
            :style="{ transformStyle: 'preserve-3d', transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
          >
            <!-- Front face -->
            <div class="absolute inset-0 rounded-2xl overflow-hidden shadow-lg" style="backface-visibility: hidden;">
              <img :src="service.image" :alt="service.alt" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ service.category }}</span>
                <h3 class="text-white text-xl font-bold font-heading mt-1">{{ service.title }}</h3>
              </div>
            </div>
            <!-- Back face -->
            <div class="absolute inset-0 rounded-2xl bg-brand-charcoal p-6 flex flex-col justify-between shadow-lg" style="backface-visibility: hidden; transform: rotateY(180deg);">
              <div class="overflow-y-auto flex-1 pr-1">
                <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ service.category }}</span>
                <h3 class="text-stone-100 text-lg font-bold font-heading mt-1 mb-3">{{ service.title }}</h3>
                <p class="text-stone-300 text-sm leading-relaxed mb-4">{{ service.description }}</p>
                <ul class="space-y-2">
                  <li v-for="(feature, i) in service.features" :key="i" class="flex items-start text-stone-400 text-sm">
                    <img src="/src/assets/icons/next.svg" class="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" alt="" />
                    {{ feature }}
                  </li>
                </ul>
              </div>
              <RouterLink to="/book" class="mt-4 block">
                <button class="w-full bg-brand-gold text-brand-charcoal px-6 py-3 rounded-lg font-semibold font-heading hover:bg-brand-gold-dark transition-all duration-300 hover:scale-105 text-sm">
                  {{ t('message.book_now') }}
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <!-- Dot indicators -->
      <div class="flex justify-center gap-2 mt-6">
        <button
          v-for="(service, index) in services"
          :key="index"
          class="w-2.5 h-2.5 rounded-full transition-all duration-300"
          :class="activeIndex === index ? 'bg-brand-gold w-6' : 'bg-stone-400'"
          @click="scrollToCard(index)"
        />
      </div>
    </div>

    <!-- Grid layout: large screens only -->
    <div class="bg-brand-stone pb-12 hidden lg:block px-6 lg:px-16">
      <div class="grid grid-cols-3 gap-6">
        <div
          v-for="(service, index) in services"
          :key="'grid-' + index"
          class="h-[400px] cursor-pointer"
          style="perspective: 1000px;"
          @click="toggleFlip(index)"
        >
          <div
            class="relative w-full h-full transition-transform duration-700"
            :style="{ transformStyle: 'preserve-3d', transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
          >
            <!-- Front face -->
            <div class="absolute inset-0 rounded-2xl overflow-hidden shadow-lg" style="backface-visibility: hidden;">
              <img :src="service.image" :alt="service.alt" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ service.category }}</span>
                <h3 class="text-white text-xl font-bold font-heading mt-1">{{ service.title }}</h3>
              </div>
            </div>
            <!-- Back face -->
            <div class="absolute inset-0 rounded-2xl bg-brand-charcoal p-6 flex flex-col justify-between shadow-lg" style="backface-visibility: hidden; transform: rotateY(180deg);">
              <div class="overflow-y-auto flex-1 pr-1">
                <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ service.category }}</span>
                <h3 class="text-stone-100 text-lg font-bold font-heading mt-1 mb-3">{{ service.title }}</h3>
                <p class="text-stone-300 text-sm leading-relaxed mb-4">{{ service.description }}</p>
                <ul class="space-y-2">
                  <li v-for="(feature, i) in service.features" :key="i" class="flex items-start text-stone-400 text-sm">
                    <img src="/src/assets/icons/next.svg" class="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" alt="" />
                    {{ feature }}
                  </li>
                </ul>
              </div>
              <RouterLink to="/book" class="mt-4 block">
                <button class="w-full bg-brand-gold text-brand-charcoal px-6 py-3 rounded-lg font-semibold font-heading hover:bg-brand-gold-dark transition-all duration-300 hover:scale-105 text-sm">
                  {{ t('message.book_now') }}
                </button>
              </RouterLink>
            </div>
          </div>
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
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
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

const flipped = ref(Array(6).fill(false));
const activeIndex = ref(0);
const carousel = ref(null);

const toggleFlip = (index) => {
  flipped.value = flipped.value.map((v, i) => i === index ? !v : v);
};

const onScroll = () => {
  if (!carousel.value) return;
  const cardWidth = carousel.value.children[0]?.offsetWidth ?? 296;
  activeIndex.value = Math.round(carousel.value.scrollLeft / (cardWidth + 24));
};

const scrollToCard = (index) => {
  if (!carousel.value) return;
  const cardWidth = carousel.value.children[0]?.offsetWidth ?? 296;
  carousel.value.scrollTo({ left: index * (cardWidth + 24), behavior: 'smooth' });
};
</script>

<style scoped>
/* Hide scrollbar across browsers */
div[style*="scroll-snap-type"]::-webkit-scrollbar {
  display: none;
}
</style>
