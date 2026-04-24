# Homepage Mobile Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage services section with a flip-card carousel, add an About Us section, add a Call Us button to the hero, and convert ToursAirports cards to CSS 3D flip cards.

**Architecture:** Five focused component changes — each file has one responsibility. The flip card mechanic is implemented inline per component using plain CSS transforms and a toggled `flipped` ref, with no shared abstraction needed (only two components use it and they have different layouts). The About Us section is a new standalone component inserted into Home.vue.

**Tech Stack:** Vue 3 (Composition API), Tailwind CSS, vue-i18n, @vueuse/motion for scroll animations. Dev server: `npm run dev` (Vite).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/HeroBanner.vue` | Modify | Add Call Us `<a>` button next to Book Us |
| `src/components/ServicesSection.vue` | Rewrite | Horizontal scroll-snap carousel of CSS 3D flip cards |
| `src/components/AboutUsSection.vue` | Create | Company story section (text from aboutus.txt) |
| `src/pages/Home.vue` | Modify | Import and place `<AboutUsSection />` |
| `src/pages/ToursAirports.vue` | Rewrite | Grid of CSS 3D flip cards, remove detail panel |

---

## Task 1: HeroBanner — Add Call Us Button

**Files:**
- Modify: `src/components/HeroBanner.vue:44-49`

- [ ] **Step 1: Open HeroBanner.vue and locate the button block**

The current button block (lines 44–49) looks like:

```html
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
```

- [ ] **Step 2: Replace the button block with two-button flex row**

Replace the entire `<div>` block above with:

```html
<div
  v-motion
  :initial="{ opacity: 0, y: 20 }"
  :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
  class="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
>
  <RouterLink to="/book">
    <button class="bg-brand-gold text-brand-charcoal px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-gold-dark transition-all duration-300 hover:ring-4 hover:ring-brand-gold/40 hover:scale-105 w-full sm:w-auto font-heading">
      {{ t('message.book_us') }}
    </button>
  </RouterLink>
  <a href="tel:+306973857378">
    <button class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto font-heading">
      {{ t('message.call_now') }}
    </button>
  </a>
</div>
```

Note: `message.call_now` already exists in all 4 locales (en/gr/de/fr) in `src/i18n.js` — no new i18n keys needed.

- [ ] **Step 3: Start dev server and verify**

```bash
npm run dev
```

Open `http://localhost:5173`. Verify:
- Hero shows two buttons side by side on desktop: gold "Book Us" and outlined white "Call Us"
- On mobile (DevTools → responsive), buttons stack vertically
- Tapping "Call Us" triggers `tel:+306973857378` (browser may show a dial prompt)

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroBanner.vue
git commit -m "feat: add Call Us button to hero banner"
```

---

## Task 2: ServicesSection — Flip Card Carousel

**Files:**
- Rewrite: `src/components/ServicesSection.vue`

- [ ] **Step 1: Replace ServicesSection.vue with the carousel implementation**

Replace the entire file content with:

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

    <!-- Carousel wrapper -->
    <div class="bg-brand-stone pb-12">
      <div
        ref="carousel"
        class="flex overflow-x-auto gap-6 px-6 md:px-12 lg:px-16 scroll-smooth"
        style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none;"
        @scroll="onScroll"
      >
        <!-- Flip cards -->
        <div
          v-for="(service, index) in services"
          :key="index"
          class="flex-shrink-0 w-[280px] sm:w-[320px] h-[400px] cursor-pointer"
          style="scroll-snap-align: start;"
          @click="toggleFlip(index)"
        >
          <!-- Perspective wrapper -->
          <div
            class="relative w-full h-full transition-transform duration-700"
            :style="{ transformStyle: 'preserve-3d', transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
          >
            <!-- Front face -->
            <div
              class="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
              style="backface-visibility: hidden;"
            >
              <img :src="service.image" :alt="service.alt" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <!-- Flip hint -->
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
            <div
              class="absolute inset-0 rounded-2xl bg-brand-charcoal p-6 flex flex-col justify-between shadow-lg"
              style="backface-visibility: hidden; transform: rotateY(180deg);"
            >
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
  const cardWidth = carousel.value.querySelector('div')?.offsetWidth ?? 296;
  activeIndex.value = Math.round(carousel.value.scrollLeft / (cardWidth + 24));
};

const scrollToCard = (index) => {
  if (!carousel.value) return;
  const cardWidth = carousel.value.querySelector('div')?.offsetWidth ?? 296;
  carousel.value.scrollTo({ left: index * (cardWidth + 24), behavior: 'smooth' });
};
</script>

<style scoped>
/* Hide scrollbar across browsers */
div[style*="scroll-snap-type"]::-webkit-scrollbar {
  display: none;
}
</style>
```

- [ ] **Step 2: Verify in browser**

With dev server running, navigate to the homepage. Verify:
- Services section shows horizontal scrollable cards (not alternating rows)
- On mobile (DevTools responsive mode, 375px width): 1 card visible, swipe scrolls to next
- Clicking/tapping a card flips it to show description, features, and Book Now button
- Flipping back (tap again) works
- Dot indicators update as you scroll; clicking a dot scrolls to that card
- "Book Now" on card back navigates to `/book`

- [ ] **Step 3: Commit**

```bash
git add src/components/ServicesSection.vue
git commit -m "feat: replace services rows with flip card carousel"
```

---

## Task 3: AboutUsSection — New Component

**Files:**
- Create: `src/components/AboutUsSection.vue`

- [ ] **Step 1: Create the new component**

Create `src/components/AboutUsSection.vue` with this content:

```vue
<template>
  <div class="bg-brand-stone py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">

      <!-- Section header -->
      <div class="text-center mb-14">
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 400 } }"
          class="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3"
        >
          ABOUT US
        </p>
        <h2
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="text-3xl font-extrabold text-brand-charcoal sm:text-4xl font-heading"
        >
          Cretan Royal Transfer
        </h2>
      </div>

      <!-- Two-column content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        <!-- Left: text -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <p class="text-stone-600 leading-relaxed mb-6">
            Η Cretan Royal Transfer δραστηριοποιείται στον τομέα των ιδιωτικών
            μεταφορών του τουρισμού στην Κρήτη, προσφέροντας υψηλού επιπέδου
            υπηρεσίες μετακίνησης, με συνέπεια, επαγγελματισμό και σεβασμό προς κάθε
            επισκέπτη.
          </p>
          <p class="text-stone-600 leading-relaxed mb-6">
            Με πολυετή εμπειρία στον χώρο των μεταφορών από και προς αεροδρόμια,
            ξενοδοχεία, βίλες και τουριστικούς προορισμούς, στόχος μας είναι να
            εξασφαλίζουμε σε κάθε πελάτη ένα άνετο ασφαλές και ευχάριστο ταξίδι από
            την πρώτη έως την τελευταία στιγμή παραμονής του στο νησί.
          </p>
          <p class="text-stone-600 leading-relaxed mb-10">
            Δίνουμε ιδιαίτερη σημασία στην αξιοπιστία και την ποιότητα των υπηρεσιών
            μας. Όλες οι μεταφορές πραγματοποιούνται με σύγχρονα, καθαρά και πλήρως
            συντηρημένα οχήματα, ενώ οι οδηγοί μας είναι έμπειροι επαγγελματίες με
            άριστη γνώση της Κρήτης και των αναγκών του σύγχρονου ταξιδιώτη.
          </p>

          <!-- Why choose us bullet list -->
          <h3 class="text-brand-charcoal font-bold font-heading text-lg mb-5">
            Γιατί να επιλέξετε την Cretan Royal Transfer
          </h3>
          <ul class="space-y-3">
            <li
              v-for="(item, i) in bullets"
              :key="i"
              class="flex items-start text-stone-600"
            >
              <img src="/src/assets/icons/next.svg" class="h-4 w-4 mr-3 flex-shrink-0 mt-1" alt="" />
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Right: image collage -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 100 } }"
          class="grid grid-cols-2 grid-rows-2 gap-3 h-[420px]"
        >
          <div class="row-span-2 overflow-hidden rounded-2xl">
            <img :src="reliabilityimg" class="w-full h-full object-cover" alt="Αξιόπιστες Μεταφορές" />
          </div>
          <div class="overflow-hidden rounded-2xl">
            <img :src="safetyimg" class="w-full h-full object-cover" alt="Ασφάλεια" />
          </div>
          <div class="overflow-hidden rounded-2xl">
            <img :src="airportimg" class="w-full h-full object-cover" alt="Αεροδρόμιο" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import reliabilityimg from '/src/assets/reliability-aboutus.jpg';
import safetyimg from '/src/assets/safety-aboutus.jpg';
import airportimg from '/src/assets/airport-aboutus.jpg';

const bullets = [
  'Πάντα στην ώρα μας – Παρακολουθούμε την πτήση σας και περιμένουμε.',
  'Σε περίπτωση καθυστέρησης πτήσεως, δεν χάνεται την κράτηση.',
  'Ασφαλείς και άνετες μετακινήσεις με σύγχρονο καθαρό όχημα.',
  'Επαγγελματίες και φιλικοί οδηγοί.',
  'Σταθερές τιμές – ξέρετε ακριβώς τι πληρώνετε.',
  'Ιδιωτική μεταφορά χωρίς αναμονές και χωρίς άλλους επιβάτες.',
  'Διαθέσιμοι 24 ώρες.',
];
</script>
```

- [ ] **Step 2: Insert AboutUsSection into Home.vue**

Open `src/pages/Home.vue` and replace the file with:

```vue
<script setup>
import HeroBanner from '../components/HeroBanner.vue'
import AboutSection from '../components/AboutSection.vue'
import AboutUsSection from '../components/AboutUsSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import MeetTheTeam from '../components/MeetTheTeam.vue'
</script>

<template>
  <div class="min-h-screen bg-brand-stone">
    <!-- 1. Hero -->
    <HeroBanner />

    <!-- 2. Services (immediately after hero diagonal cut) -->
    <ServicesSection />

    <!-- 3. About Us (company story) -->
    <AboutUsSection />

    <!-- 4. Wave divider: brand-stone → brand-charcoal -->
    <div class="overflow-hidden leading-none bg-brand-stone -mt-1">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" class="w-full h-[80px] block" fill="#2C2C2C">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>

    <!-- 5. Why Choose Us -->
    <AboutSection />

    <!-- 6. Meet the Team — overlaps About by 60px -->
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

- [ ] **Step 3: Verify in browser**

Navigate to homepage. Verify:
- After the services carousel, a new "ABOUT US" section appears with the Greek company story text and bullet list on the left, image collage on the right
- On mobile: text stacks above images
- Section transitions smoothly into the wave divider and "Why Choose Us" section below

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutUsSection.vue src/pages/Home.vue
git commit -m "feat: add About Us section to homepage"
```

---

## Task 4: ToursAirports — Flip Card Grid

**Files:**
- Rewrite: `src/pages/ToursAirports.vue`

- [ ] **Step 1: Replace ToursAirports.vue with flip card grid**

Replace the entire file content with:

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
```

- [ ] **Step 2: Verify in browser**

Navigate to `/tours-airports`. Verify:
- 16 cards shown in a 1/2/3 column grid (mobile/tablet/desktop)
- Each card has the image front with category + title at the bottom, and a flip-hint icon top-right
- Clicking a card flips it to show category, title, description, 3 features, and "Book Now" button
- Multiple cards can be flipped simultaneously (they're independent)
- No detail panel appears below the grid
- "Book Now" button navigates to `/book`
- On mobile (375px): 1-column grid, cards are full width, all flip correctly on tap

- [ ] **Step 3: Commit**

```bash
git add src/pages/ToursAirports.vue
git commit -m "feat: replace ToursAirports detail panel with flip cards"
```

---

## Self-Review

**Spec coverage:**
- ✅ ServicesSection → flip card carousel (Task 2)
- ✅ About Us section with aboutus.txt content (Task 3)
- ✅ HeroBanner Call Us button with tel:+306973857378 (Task 1)
- ✅ ToursAirports flip card grid, detail panel removed (Task 4)
- ✅ Both flip implementations use CSS 3D rotateY with backface-visibility: hidden
- ✅ Home.vue updated with new component order (Task 3 Step 2)

**Placeholder scan:** No TBDs or incomplete steps. All code blocks are complete. ✓

**Type consistency:** `flipped` ref is `Array(N).fill(false)` in both Task 2 and Task 4. `toggleFlip(index)` signature is identical in both. `services` computed array structure (image, category, title, description, features, alt) is consistent. ✓
