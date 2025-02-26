<script setup>
import { ref, watch, onMounted, onUnmounted,computed  } from 'vue';
import { useRoute } from 'vue-router';

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
</script>

<template>
  <nav 
    class="fixed w-full z-50 transition-all duration-500 backdrop-blur-sm"
    :class="{ 'bg-stone-900/90 shadow-md text-white': !isAtTop || isWhitePage, 'bg-transparent text-black': isAtTop && isWhitePage }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <RouterLink to="/" class="text-xl font-bold text-stone-200":class="{'text-black':isAtTop && isWhitePage}" style="font-family: 'Poppins', sans-serif;">
          <img src="/src/assets/crt-logo.png" alt="Cretan Royal Transfer Logo" class="h-20 w-auto transition-all duration-300" />
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 items-center">
          <RouterLink
            to="/"
            class="hover:text-white transition"
            :class="{ 'text-white': !isAtTop || !isWhiteBackgroundPage, 'text-black': isAtTop && isWhiteBackgroundPage }"
          >Home</RouterLink>
          <RouterLink
            to="/tours-airports"
            class="hover:text-white transition"
            :class="{ 'text-white': !isAtTop || !isWhiteBackgroundPage, 'text-black': isAtTop && isWhiteBackgroundPage }"
          >Tours-Airports</RouterLink>
          <RouterLink
            to="/book"
            class="hover:text-white transition"
            :class="{ 'text-white': !isAtTop || !isWhiteBackgroundPage, 'text-black': isAtTop && isWhiteBackgroundPage }"
          >Book Us</RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="isMenuOpen = !isMenuOpen" class="text-stone-200 focus:outline-none">
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div v-if="isMenuOpen" class="md:hidden bg-stone-900/95 backdrop-blur-md">
        <div class="px-4 pt-2 pb-3 space-y-2">
          <RouterLink to="/" class="block text-stone-200 hover:text-white transition py-2">Home</RouterLink>
          <RouterLink to="/tours-airports" class="block text-stone-200 hover:text-white transition py-2">Tours-Airports</RouterLink>
          <RouterLink to="/book" class="block text-stone-200 hover:text-white transition py-2">Book Us</RouterLink>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style>
/* Ensures content isn't hidden behind fixed navbar */


/* Mobile menu slide animation */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
