<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-stone-900/90 fixed w-full z-50 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <a href="#" class="text-xl font-bold text-stone-200" style="font-family: 'Schibsted Grotesk', serif;">Cretan Royal Transfer </a>
        </div> 

        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#about" class="text-stone-200 hover:text-amber-500 transition-colors">About</a>
          <a href="#services" class="text-stone-200 hover:text-amber-500 transition-colors">Services</a>
          <a href="#booking" class="text-stone-200 hover:text-amber-500 transition-colors">Book Now</a>
          <a href="#contact" class="text-stone-200 hover:text-amber-500 transition-colors">Contact</a>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="text-stone-200 hover:text-amber-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-stone-900/95 backdrop-blur-sm">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a @click="closeMenu" href="#about" class="block px-3 py-2 text-stone-200 hover:text-amber-500 transition-colors">About</a>
        <a @click="closeMenu" href="#services" class="block px-3 py-2 text-stone-200 hover:text-amber-500 transition-colors">Services</a>
        <a @click="closeMenu" href="#booking" class="block px-3 py-2 text-stone-200 hover:text-amber-500 transition-colors">Book Now</a>
        <a @click="closeMenu" href="#contact" class="block px-3 py-2 text-stone-200 hover:text-amber-500 transition-colors">Contact</a>
      </div>
    </div>
  </nav>
</template>