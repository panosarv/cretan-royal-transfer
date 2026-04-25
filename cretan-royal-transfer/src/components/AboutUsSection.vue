<template>
  <div class="bg-brand-stone py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-brand-gold">
    <div class="max-w-7xl mx-auto">

      <!-- Section header -->
      <div class="text-center mb-14">
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 400 } }"
          class="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3"
        >
          {{ t('message.about_us_section_label') }}
        </p>
        <h2
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="text-3xl font-extrabold text-brand-charcoal sm:text-4xl font-heading"
        >
          {{ t('message.about_us_section_heading') }}
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
          <p class="text-stone-600 leading-relaxed mb-6">{{ t('message.about_us_para_1') }}</p>
          <p class="text-stone-600 leading-relaxed mb-6">{{ t('message.about_us_para_2') }}</p>
          <p class="text-stone-600 leading-relaxed mb-10">{{ t('message.about_us_para_3') }}</p>

          <!-- Why choose us bullet list -->
          <h3 class="text-brand-charcoal font-bold font-heading text-lg mb-5">
            {{ t('message.about_us_why_title') }}
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
          class="grid gap-3 grid-cols-1 h-auto sm:grid-cols-2 sm:grid-rows-2 sm:h-[420px]"
        >
          <div class="overflow-hidden rounded-2xl h-48 sm:row-span-2 sm:h-full">
            <img :src="reliabilityimg" class="w-full h-full object-cover" alt="Αξιόπιστες Μεταφορές" />
          </div>
          <div class="overflow-hidden rounded-2xl h-48 sm:h-full">
            <img :src="safetyimg" class="w-full h-full object-cover" alt="Ασφάλεια" />
          </div>
          <div class="overflow-hidden rounded-2xl h-48 sm:h-full">
            <img :src="airportimg" class="w-full h-full object-cover" alt="Αεροδρόμιο" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import reliabilityimg from '/src/assets/reliability-aboutus.jpg';
import safetyimg from '/src/assets/safety-aboutus.jpg';
import airportimg from '/src/assets/airport-aboutus.jpg';

const { t } = useI18n();

const bullets = computed(() => [
  t('message.about_us_bullet_1'),
  t('message.about_us_bullet_2'),
  t('message.about_us_bullet_3'),
  t('message.about_us_bullet_4'),
  t('message.about_us_bullet_5'),
  t('message.about_us_bullet_6'),
  t('message.about_us_bullet_7'),
]);
</script>
