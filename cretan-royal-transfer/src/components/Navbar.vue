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
