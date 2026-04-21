# Aesthetic Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the site's visual quality by reordering Home page sections, adding SVG section transitions (diagonal cut, wave divider, overlap), replacing the Services card grid with alternating full-width rows, replacing the About carousel with an asymmetric mosaic grid, and replacing the Tours button grid with a premium image card grid.

**Architecture:** Five self-contained component rewrites, all in-place. No new files, no new routes, no new dependencies. All i18n keys preserved. Brand tokens (`brand-gold`, `brand-charcoal`, `brand-stone`, `brand-dark`) and `@vueuse/motion` are already installed.

**Tech Stack:** Vue 3, Tailwind CSS (brand tokens already configured), `@vueuse/motion` (already registered)

---

## File Map

| Action | Path | What changes |
|--------|------|-------------|
| Modify | `src/pages/Home.vue` | Remove duplicate Navbar, reorder sections, add wave divider + overlap wrapper |
| Modify | `src/components/HeroBanner.vue` | Add diagonal SVG clip at bottom |
| Modify | `src/components/ServicesSection.vue` | Full rewrite: 6 alternating image/text rows |
| Modify | `src/components/AboutSection.vue` | Replace carousel with 2-col mosaic grid + stacked feature list |
| Modify | `src/pages/ToursAirports.vue` | Replace Swiper/button grid with image card grid + premium detail panel |

---

## Task 1: Home.vue — reorder sections, fix duplicate Navbar, add transitions

**Files:**
- Modify: `src/pages/Home.vue`

- [ ] **Step 1: Replace `src/pages/Home.vue`**

```vue
<script setup>
import HeroBanner from '../components/HeroBanner.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import MeetTheTeam from '../components/MeetTheTeam.vue'
</script>

<template>
  <div class="min-h-screen bg-brand-stone">
    <!-- 1. Hero -->
    <HeroBanner />

    <!-- 2. Services (immediately after hero diagonal cut) -->
    <ServicesSection />

    <!-- 3. Wave divider: brand-stone → brand-charcoal -->
    <div class="overflow-hidden leading-none bg-brand-stone -mt-1">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" class="w-full h-[80px] block" fill="#2C2C2C">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>

    <!-- 4. About -->
    <AboutSection />

    <!-- 5. Meet the Team — overlaps About by 60px -->
    <div class="relative z-10 -mt-16">
      <div class="relative py-20 px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0">
          <img
            src="../assets/chania-meetteam.jpg"
            class="w-full h-full object-cover"
            alt="Meet the Team Background"
          />
          <div class="absolute inset-0 bg-stone-900/70 backdrop-blur-sm"></div>
        </div>
        <div class="relative max-w-4xl mx-auto">
          <MeetTheTeam />
        </div>
      </div>
    </div>
  </div>
</template>
```

**Why:** Navbar is already rendered in `App.vue` — the old Home.vue import created a duplicate. New order is Hero → Services → About → Team. The wave divider SVG is `brand-charcoal` (`#2C2C2C`) fill sitting inside a `brand-stone` container. The `-mt-16` on the Team wrapper creates the overlap effect over About's bottom edge.

- [ ] **Step 2: Verify build passes**

```bash
cd "c:/Users/Ryzen/Desktop/Cretan Royal Transfer/cretan-royal-transfer"
npm run build
```

Expected: `✓ built in` — no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.vue
git commit -m "feat: reorder home sections, add wave divider + team overlap, remove duplicate navbar"
```

---

## Task 2: HeroBanner — diagonal SVG clip at bottom

**Files:**
- Modify: `src/components/HeroBanner.vue`

- [ ] **Step 1: Replace `src/components/HeroBanner.vue`**

Add the diagonal SVG clip inside the hero's root div, just before the closing `</div>`. The SVG uses `brand-stone` fill (`#F5F0E8`) to match the Services section background below it.

```vue
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
          class="mt-6 flex justify-center md:justify-start"
        >
          <RouterLink to="/book">
            <button class="bg-brand-gold text-brand-charcoal px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-gold-dark transition-all duration-300 hover:ring-4 hover:ring-brand-gold/40 hover:scale-105 w-full sm:w-auto font-heading">
              {{ t('message.book_us') }}
            </button>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Diagonal cut into Services section -->
    <div class="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-[60px] block" fill="#F5F0E8">
        <polygon points="0,60 1440,0 1440,60" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useParallax } from '@/composables/useParallax';

const { t } = useI18n();
const { offsetY } = useParallax(0.15);
</script>
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroBanner.vue
git commit -m "feat: add diagonal SVG clip to hero bottom"
```

---

## Task 3: ServicesSection — alternating image/text rows

**Files:**
- Modify: `src/components/ServicesSection.vue`

- [ ] **Step 1: Replace `src/components/ServicesSection.vue`**

Each service row is full-width, alternating image-left/text-right (odd) vs text-left/image-right (even). The `index % 2 !== 0` condition flips `flex-row-reverse` for even rows. Background alternates between `bg-brand-stone` (odd) and `bg-white` (even).

```vue
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
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ServicesSection.vue
git commit -m "feat: services section alternating image/text rows with category tags"
```

---

## Task 4: AboutSection — mosaic image grid + stacked feature list

**Files:**
- Modify: `src/components/AboutSection.vue`

- [ ] **Step 1: Replace `src/components/AboutSection.vue`**

Replaces the crossfade carousel with a 2×2 asymmetric mosaic. The left column uses CSS grid with `grid-rows-2` and the first image spans `row-span-2` to create the tall-left / two-square-right layout. The right column has the "WHY CHOOSE US" label, heading, and a stacked feature list with gold left-border accents. All carousel state (`currentSlide`, `setInterval`) is removed.

```vue
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
```

**Note:** `leasureimg` import is intentionally removed — only 3 images are needed for the mosaic (the 4th slot is covered by the tall image spanning 2 rows).

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutSection.vue
git commit -m "feat: about section mosaic image grid + stacked feature list, remove carousel"
```

---

## Task 5: ToursAirports — image card grid + premium detail panel

**Files:**
- Modify: `src/pages/ToursAirports.vue`

- [ ] **Step 1: Replace `src/pages/ToursAirports.vue`**

Removes Swiper, `isMobile`, `activeIndex`, `updateActiveIndex`. Replaces the button grid with a 3-column image card grid (hover reveal). Redesigns the detail panel as a two-column premium layout. Adds a `category` field to every service. All 16 services and their i18n keys are preserved.

```vue
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
        <!-- Background image -->
        <img
          :src="service.image"
          :alt="service.title"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />

        <!-- Content -->
        <div class="absolute bottom-0 left-0 right-0 p-5">
          <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ service.category }}</span>
          <h3 class="text-white text-lg font-bold font-heading mt-1">{{ service.title }}</h3>
          <p class="text-stone-300 text-sm mt-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
            {{ service.description }}
          </p>
        </div>

        <!-- Selected checkmark -->
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
        <!-- Hero image -->
        <img :src="selectedService.image" :alt="selectedService.title" class="w-full h-72 object-cover" />

        <!-- Two-column content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <!-- Left: title + description -->
          <div class="border-t-4 border-brand-gold pt-5">
            <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">{{ selectedService.category }}</span>
            <h3 class="text-2xl font-bold text-brand-charcoal font-heading mt-2 mb-4">{{ selectedService.title }}</h3>
            <p class="text-stone-600 leading-relaxed">{{ selectedService.description }}</p>
          </div>

          <!-- Right: features + CTA -->
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
```

**Note:** `selectedService` now starts as `null` (no card pre-selected). Clicking the same card a second time deselects it (toggle behaviour via `=== service ? null : service`). Swiper and all its imports are fully removed.

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors. If Swiper is no longer used anywhere, Vite will tree-shake it automatically.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ToursAirports.vue
git commit -m "feat: tours page image card grid with hover reveal + premium detail panel"
```

---

## Spec Coverage Check

| Requirement | Task |
|---|---|
| New section order: Hero → Services → About → Meet the Team | Task 1 |
| Remove duplicate Navbar from Home.vue | Task 1 |
| Wave divider Services → About | Task 1 |
| About → MeetTheTeam overlap (-mt-16) | Task 1 |
| Root bg fixed to brand-stone | Task 1 |
| Diagonal SVG cut at Hero bottom | Task 2 |
| ServicesSection alternating rows (image/text) | Task 3 |
| Category tags per service row | Task 3 |
| Odd rows brand-stone, even rows white | Task 3 |
| Scroll animations slide in from respective sides | Task 3 |
| "OUR SERVICES" gold label above heading | Task 3 |
| AboutSection mosaic image grid (row-span-2 tall left) | Task 4 |
| AboutSection stacked feature list with gold left border | Task 4 |
| "WHY CHOOSE US" gold label | Task 4 |
| Carousel + setInterval removed | Task 4 |
| ToursAirports image card grid (3-col desktop) | Task 5 |
| Card hover reveal (description slides up) | Task 5 |
| Selected card ring + checkmark | Task 5 |
| "EXPLORE CRETE" gold label | Task 5 |
| Premium 2-col detail panel (image + two columns) | Task 5 |
| Swiper + isMobile + activeIndex removed | Task 5 |
| Toggle deselect on second click | Task 5 |
| All 16 services + i18n keys preserved | Task 5 |
