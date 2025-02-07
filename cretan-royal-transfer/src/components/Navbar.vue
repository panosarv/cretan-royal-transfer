<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const isMenuOpen = ref(false);
const route = useRoute();

// Watch for route changes and close the menu
watch(route, () => {
  isMenuOpen.value = false;
});
</script>


<template>
  <nav class="bg-stone-900/90 fixed w-full z-50 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <RouterLink to="/" class="text-xl font-bold text-stone-200" style="font-family: 'Poppins', sans-serif;">
            Brand
          </RouterLink>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 items-center">
          <RouterLink to="/" class="text-stone-200 hover:text-white transition">Home</RouterLink>
          <RouterLink to="/tours-airports" class="text-stone-200 hover:text-white transition">Tours-Airports</RouterLink>
          <RouterLink to="/book" class="text-stone-200 hover:text-white transition">Book Us</RouterLink>
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
    <div v-if="isMenuOpen" class="md:hidden bg-stone-900/95 backdrop-blur-md">
      <div class="px-4 pt-2 pb-3 space-y-2">
        <RouterLink to="/" class="block text-stone-200 hover:text-white transition py-2">Home</RouterLink>
        <RouterLink to="/tours-airports" class="block text-stone-200 hover:text-white transition py-2">Tours-Airports</RouterLink>
        <RouterLink to="/book" class="block text-stone-200 hover:text-white transition py-2">Book Us</RouterLink>
      </div>
    </div>
  </nav>
</template>
