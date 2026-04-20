# Site Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full visual and motion revamp of all pages and components — new typography, design tokens, scroll animations, parallax, route transitions, card hover effects, and a structural fix for the AboutSection carousel.

**Architecture:** Install `@vueuse/motion`, add brand color tokens to Tailwind, swap fonts in `index.html`, create one `useParallax` composable, then enhance each component in-place. The AboutSection carousel is the only structural rewrite (replaces fragile `getElementById` DOM mutation with Vue reactive state). All other components are enhanced without restructuring.

**Tech Stack:** Vue 3, Pinia, Tailwind CSS, `@vueuse/motion`, `@vueuse/core` (already installed), Vite

---

## File Map

| Action | Path | What changes |
|--------|------|-------------|
| Modify | `index.html` | Swap Schibsted Grotesk → Plus Jakarta Sans + Inter |
| Modify | `tailwind.config.js` | Add `brand` color tokens |
| Modify | `src/style.css` | Font families, page transition CSS, background color |
| Modify | `src/main.js` | Register MotionPlugin |
| Create | `src/composables/useParallax.js` | Scroll-based parallax composable |
| Modify | `src/App.vue` | Route transition wrapper |
| Modify | `src/components/Navbar.vue` | Active link underline, mobile menu transition |
| Modify | `src/components/HeroBanner.vue` | Parallax bg + motion stagger + CTA pulse |
| Modify | `src/components/AboutSection.vue` | Fix carousel + scroll animations |
| Modify | `src/components/ServicesSection.vue` | brand-stone bg, card hover, gold buttons, motion |
| Modify | `src/components/MeetTheTeam.vue` | Scroll-triggered fade-in |
| Modify | `src/components/ContactSection.vue` | brand-dark bg, gold divider, stagger |
| Modify | `src/pages/ToursAirports.vue` | brand-stone bg, gold selected state, motion panel |
| Modify | `src/pages/Book.vue` | Apply font tokens |

---

## Task 1: Foundation — fonts, color tokens, MotionPlugin, style.css

**Files:**
- Modify: `index.html`
- Modify: `tailwind.config.js`
- Modify: `src/style.css`
- Modify: `src/main.js`

- [ ] **Step 1: Install @vueuse/motion**

```bash
cd "c:/Users/Ryzen/Desktop/Cretan Royal Transfer/cretan-royal-transfer"
npm install @vueuse/motion
```

Expected: package added successfully.

- [ ] **Step 2: Update `index.html` — swap fonts**

Replace the existing Google Fonts `<link>` (Schibsted Grotesk) with:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

- [ ] **Step 3: Update `tailwind.config.js`**

Replace the entire file with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold:        '#D8A444',
          'gold-dark': '#B4952E',
          dark:        '#1A1A1A',
          charcoal:    '#2C2C2C',
          stone:       '#F5F0E8',
        }
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Replace `src/style.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background-color: #F5F0E8;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Route page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
```

- [ ] **Step 5: Update `src/main.js` — register MotionPlugin**

```js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import './style.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(MotionPlugin);
app.mount('#app');
```

- [ ] **Step 6: Verify build passes**

```bash
npm run build
```

Expected: `✓ built in` — no errors.

- [ ] **Step 7: Commit**

```bash
git add index.html tailwind.config.js src/style.css src/main.js package.json package-lock.json
git commit -m "feat: install @vueuse/motion, add brand tokens, swap fonts"
```

---

## Task 2: Create useParallax composable

**Files:**
- Create: `src/composables/useParallax.js`

- [ ] **Step 1: Create `src/composables/useParallax.js`**

```js
import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax(speed = 0.3) {
  const offsetY = ref(0)

  const onScroll = () => {
    offsetY.value = window.scrollY * speed
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { offsetY }
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/composables/useParallax.js
git commit -m "feat: add useParallax composable"
```

---

## Task 3: App.vue — route transition + bg token

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Replace `src/App.vue`**

```vue
<script setup>
import Navbar from './components/Navbar.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <div class="min-h-screen bg-brand-stone">
    <Navbar />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
    <ContactSection />
  </div>
</template>
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.vue
git commit -m "feat: add page route transitions to App.vue"
```

---

## Task 4: Navbar — active link underline + mobile menu transition

**Files:**
- Modify: `src/components/Navbar.vue`

- [ ] **Step 1: Replace `src/components/Navbar.vue`**

```vue
<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const isMenuOpen = ref(false);
const route = useRoute();
const isAtTop = ref(true);

const isWhiteBackgroundPage = computed(() => route.path === "/tours-airports");

watch(route, () => {
  isMenuOpen.value = false;
});

const handleScroll = () => {
  isAtTop.value = window.scrollY === 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function changeLanguage(lang) {
  locale.value = lang;
}
</script>

<template>
  <nav
    class="fixed w-full z-50 transition-all duration-500 backdrop-blur-sm"
    :class="{ 'bg-brand-dark/90 shadow-md': !isAtTop, 'bg-transparent': isAtTop }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <RouterLink to="/">
          <img src="/src/assets/crt-logo.png" alt="Cretan Royal Transfer Logo" class="h-20 w-auto transition-all duration-300" />
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 items-center">
          <RouterLink
            v-for="link in [{ to: '/', label: t('message.home') }, { to: '/tours-airports', label: t('message.tours_airports') }, { to: '/book', label: t('message.book_us') }]"
            :key="link.to"
            :to="link.to"
            class="relative text-stone-200 hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-brand-gold after:scale-x-0 after:transition-transform after:duration-300 [&.router-link-exact-active]:after:scale-x-100 [&.router-link-exact-active]:text-white pb-1"
            :class="{ 'text-brand-charcoal hover:text-brand-charcoal [&.router-link-exact-active]:text-brand-charcoal': isAtTop && isWhiteBackgroundPage }"
          >
            {{ link.label }}
          </RouterLink>
          <select
            v-model="locale"
            @change="changeLanguage($event.target.value)"
            class="cursor-pointer bg-transparent text-stone-200"
            :class="{ 'text-brand-charcoal': isAtTop && isWhiteBackgroundPage }"
          >
            <option value="en" class="bg-stone-900 text-white">EN</option>
            <option value="gr" class="bg-stone-900 text-white">GR</option>
            <option value="de" class="bg-stone-900 text-white">DE</option>
            <option value="fr" class="bg-stone-900 text-white">FR</option>
          </select>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="isMenuOpen = !isMenuOpen" class="text-stone-200 focus:outline-none">
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      class="md:hidden bg-brand-dark/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out"
      :class="isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="px-4 pt-2 pb-3 space-y-2">
        <RouterLink to="/" class="block text-stone-200 hover:text-white transition py-2">{{ t('message.home') }}</RouterLink>
        <RouterLink to="/tours-airports" class="block text-stone-200 hover:text-white transition py-2">{{ t('message.tours_airports') }}</RouterLink>
        <RouterLink to="/book" class="block text-stone-200 hover:text-white transition py-2">{{ t('message.book_us') }}</RouterLink>
        <select v-model="locale" @change="changeLanguage($event.target.value)" class="cursor-pointer bg-transparent text-white">
          <option value="en" class="bg-stone-900 text-white">EN</option>
          <option value="gr" class="bg-stone-900 text-white">GR</option>
          <option value="de" class="bg-stone-900 text-white">DE</option>
          <option value="fr" class="bg-stone-900 text-white">FR</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Tailwind JIT handles the after: pseudo-elements — no extra CSS needed */
</style>
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.vue
git commit -m "feat: navbar active link underline + smooth mobile menu"
```

---

## Task 5: HeroBanner — parallax + motion stagger + CTA pulse

**Files:**
- Modify: `src/components/HeroBanner.vue`

- [ ] **Step 1: Replace `src/components/HeroBanner.vue`**

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
git commit -m "feat: hero banner parallax + motion stagger + CTA pulse"
```

---

## Task 6: AboutSection — fix carousel + scroll animations

**Files:**
- Modify: `src/components/AboutSection.vue`

- [ ] **Step 1: Replace `src/components/AboutSection.vue`**

```vue
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
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-800 ease-in-out"
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
  { icon: caricon,    title: t('message.reliable_transfers_title'),  description: t('message.reliable_transfers_description'),  alt: 'Car Icon' },
  { icon: shieldicon, title: t('message.safety_first_title'),        description: t('message.safety_first_description'),        alt: 'Shield Icon' },
  { icon: airporticon,title: t('message.airport_transfers_title'),   description: t('message.airport_transfers_description'),   alt: 'Airport Icon' },
  { icon: mapicon,    title: t('message.leisure_trips_title'),       description: t('message.leisure_trips_description'),       alt: 'Map Icon' },
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
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutSection.vue
git commit -m "fix: replace getElementById carousel with reactive Vue state + scroll animations"
```

---

## Task 7: ServicesSection — brand-stone bg, hover effects, gold buttons, motion

**Files:**
- Modify: `src/components/ServicesSection.vue`

- [ ] **Step 1: Replace `src/components/ServicesSection.vue`**

```vue
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
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ServicesSection.vue
git commit -m "feat: services section brand-stone bg, card hover effects, gold buttons, motion"
```

---

## Task 8: MeetTheTeam — scroll-triggered fade-in

**Files:**
- Modify: `src/components/MeetTheTeam.vue`

- [ ] **Step 1: Replace `src/components/MeetTheTeam.vue`**

```vue
<template>
  <div class="relative text-center md:text-left max-w-4xl">
    <div
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
    >
      <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-stone-100 mb-6 font-heading">
        {{ t('message.meet_the_team_title') }}
      </h1>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
    >
      <p class="text-lg sm:text-xl md:text-2xl text-stone-200 leading-relaxed text-justify" v-html="t('message.meet_the_team_description')" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/MeetTheTeam.vue
git commit -m "feat: meet the team scroll-triggered entrance animations"
```

---

## Task 9: ContactSection — brand-dark bg, gold divider, stagger

**Files:**
- Modify: `src/components/ContactSection.vue`

- [ ] **Step 1: Replace `src/components/ContactSection.vue`**

```vue
<template>
  <div class="bg-brand-dark text-white py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-brand-gold" id="contact">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
      <!-- Contact Details -->
      <div class="flex flex-col sm:flex-row sm:space-x-12 items-center text-center sm:text-left">
        <div
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 0 } }"
          class="flex items-center space-x-3"
        >
          <svg class="h-6 w-6 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <p class="text-lg">+30 697 385 7378</p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 100 } }"
          class="flex items-center space-x-3 mt-6 sm:mt-0"
        >
          <svg class="h-6 w-6 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p class="text-lg">cretanroyaltransfer@gmail.com</p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 200 } }"
          class="flex items-center space-x-3 mt-6 sm:mt-0"
        >
          <svg class="h-6 w-6 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p class="text-lg">Rethymno, Crete, Greece</p>
        </div>
      </div>

      <!-- Social Media Links -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
        class="flex space-x-6"
      >
        <a href="#" class="text-white hover:text-brand-gold transition-colors duration-300">
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" class="text-white hover:text-brand-gold transition-colors duration-300">
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "feat: contact section brand-dark bg, gold divider, stagger animations"
```

---

## Task 10: ToursAirports — brand-stone bg, gold selected state, motion panel

**Files:**
- Modify: `src/pages/ToursAirports.vue`

- [ ] **Step 1: Update the `<template>` section of `src/pages/ToursAirports.vue`**

Replace the entire `<template>` block (lines 1–44) with:

```vue
<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 bg-brand-stone min-h-screen pt-24" id="tours-airports">
    <div class="max-w-7xl mx-auto text-center">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-3xl font-extrabold text-brand-charcoal sm:text-4xl font-heading"
      >
        {{ t('message.tours_airports_title') }}
      </h2>
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 150 } }"
        class="mt-4 text-lg text-stone-600"
      >
        {{ t('message.tours_airports_subtitle') }}
      </p>
    </div>

    <div class="mt-12 max-w-7xl mx-auto p-2 scrollbar-hide">
      <swiper
        v-if="isMobile"
        :slides-per-view="1"
        :space-between="10"
        :autoplay="{ delay: 3000 }"
        @slide-change="updateActiveIndex"
        class="swiper-container"
        :navigation="true"
        :modules="[Navigation]"
        ref="carousel"
      >
        <swiper-slide v-for="(service, index) in services" :key="index">
          <button
            @click="selectService(service)"
            class="bg-white rounded-xl shadow border-2 transition-all duration-300 flex items-center justify-center p-4 text-center min-w-[180px] h-24 w-full"
            :class="selectedService === service ? 'border-brand-gold bg-brand-gold/10 text-brand-charcoal' : 'border-stone-200 hover:border-brand-gold/50 hover:shadow-lg'"
          >
            <h3 class="text-md font-semibold text-brand-charcoal whitespace-normal break-words font-heading">{{ service.title }}</h3>
          </button>
        </swiper-slide>
      </swiper>
      <div class="pagination-dots" v-if="isMobile">
        <span v-for="(service, index) in services" :key="index" class="dot" :class="{ active: index === activeIndex }"></span>
      </div>

      <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <button
          v-for="(service, index) in services"
          :key="index"
          @click="selectService(service)"
          class="rounded-xl shadow border-2 transition-all duration-300 flex items-center justify-center p-4 text-center w-full h-24 font-heading font-semibold text-brand-charcoal hover:scale-[1.02] hover:shadow-lg"
          :class="selectedService === service ? 'border-brand-gold bg-brand-gold/10' : 'bg-white border-stone-200 hover:border-brand-gold/50'"
        >
          <h3 class="text-md whitespace-normal break-words">{{ service.title }}</h3>
        </button>
      </div>
    </div>

    <Transition name="detail-panel">
      <div
        v-if="selectedService"
        class="max-w-5xl mx-auto mt-12 p-6 bg-white shadow-xl rounded-2xl border border-stone-200"
      >
        <div class="overflow-hidden rounded-xl">
          <img :src="selectedService.image" :alt="selectedService.title" class="w-full h-64 object-cover" />
        </div>
        <div class="mt-6">
          <h3 class="text-2xl font-bold text-brand-charcoal font-heading">{{ selectedService.title }}</h3>
          <p class="mt-4 text-lg text-stone-600">{{ selectedService.description }}</p>
          <ul class="mt-4 text-stone-500 space-y-1">
            <li v-for="(feature, i) in selectedService.features" :key="i" class="flex items-center">
              <img src="/src/assets/icons/next.svg" class="h-5 w-5 mr-2 flex-shrink-0" />
              {{ feature }}
            </li>
          </ul>
          <RouterLink to="/book" class="inline-block mt-6">
            <button class="bg-brand-gold text-brand-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-dark transition-all duration-300 hover:scale-105 font-heading">
              {{ t('message.book_now') }}
            </button>
          </RouterLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
```

- [ ] **Step 2: Add detail panel transition CSS to the `<style>` block in `src/pages/ToursAirports.vue`**

Add these rules inside the existing `<style>` block (after the existing `.swiper-pagination-bullet` rule):

```css
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
```

Also add a `RouterLink` import to the `<script setup>` block — add `import { RouterLink } from 'vue-router';` after the existing imports if not already present.

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ToursAirports.vue
git commit -m "feat: tours page brand-stone bg, gold selected state, animated detail panel"
```

---

## Task 11: Book.vue — apply font tokens

**Files:**
- Modify: `src/pages/Book.vue`

- [ ] **Step 1: Update heading classes in `src/pages/Book.vue`**

Replace the current `Book.vue` content with:

```vue
<script setup>
import BookingWizard from '../components/booking/BookingWizard.vue'
</script>

<template>
  <div class="relative min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 py-24" id="booking">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img
        src="../assets/chania-meetteam.jpg"
        class="w-full h-full object-cover"
        alt="Crete Transfer"
      />
      <div class="absolute inset-0 bg-stone-900/75 backdrop-blur-sm"></div>
    </div>

    <!-- Wizard Container -->
    <div class="relative w-full max-w-2xl bg-stone-900/85 p-6 sm:p-10 rounded-2xl shadow-2xl border border-stone-700/50">
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-stone-100 mb-2 font-heading">Book Your Transfer</h1>
        <p class="text-stone-400">Private transfers and tours across Crete</p>
      </div>
      <BookingWizard />
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Book.vue
git commit -m "feat: apply font-heading token to book page"
```

---

## Spec Coverage Check

| Requirement | Task |
|---|---|
| Install @vueuse/motion | Task 1 |
| Plus Jakarta Sans + Inter fonts | Task 1 |
| Brand color tokens in tailwind.config.js | Task 1 |
| Global font families in style.css | Task 1 |
| Page route transitions CSS | Task 1 |
| MotionPlugin registered in main.js | Task 1 |
| useParallax composable | Task 2 |
| App.vue RouterView wrapped in Transition | Task 3 |
| bg-brand-stone on App.vue root | Task 3 |
| Navbar active link gold underline | Task 4 |
| Navbar mobile menu height transition | Task 4 |
| HeroBanner parallax background | Task 5 |
| HeroBanner motion stagger (title/subtitle/CTA) | Task 5 |
| CTA button hover:ring pulse | Task 5 |
| AboutSection carousel structural fix (no getElementById) | Task 6 |
| AboutSection reactive carousel with v-show + opacity | Task 6 |
| AboutSection scroll-triggered stagger on feature cards | Task 6 |
| ServicesSection bg-brand-stone | Task 7 |
| ServicesSection card hover scale + image zoom | Task 7 |
| ServicesSection gold buttons | Task 7 |
| ServicesSection scroll-triggered entrance | Task 7 |
| MeetTheTeam scroll-triggered fade-in | Task 8 |
| ContactSection bg-brand-dark + gold divider | Task 9 |
| ContactSection stagger animations | Task 9 |
| ToursAirports bg-brand-stone | Task 10 |
| ToursAirports gold border on selected service | Task 10 |
| ToursAirports detail panel slide-in transition | Task 10 |
| Book.vue font-heading token | Task 11 |
