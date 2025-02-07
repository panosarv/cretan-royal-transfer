<template>
  <div ref="aboutSection" class="py-16 px-4 sm:px-6 lg:px-8 bg-stone-100" id="about">
    <div class="max-w-7xl mx-auto">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <!-- Text Section -->
        <div 
          class="relative transform transition-transform duration-1000 ease-out opacity-0"
          :class="{'translate-x-0 opacity-100': isVisible, '-translate-x-10': !isVisible}"
        >
          <h2 class="text-3xl font-extrabold text-stone-900 tracking-tight sm:text-4xl">
            About Our Safari Adventures
          </h2>
          <p class="mt-3 text-lg text-stone-600">
            We are leading adventurous souls through the hidden gems of Crete. Our expert guides combine deep local knowledge with a passion for nature, creating unforgettable experiences that showcase the island's wild beauty.
          </p>
          <div class="mt-10 space-y-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-amber-600 text-white">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-stone-900">Expert Local Guides</h3>
                <p class="mt-2 text-base text-stone-600">Our guides are born and raised in Crete, with intimate knowledge of its terrain and wildlife.</p>
              </div>
            </div>
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-amber-600 text-white">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-stone-900">Small Group Tours</h3>
                <p class="mt-2 text-base text-stone-600">We keep our groups small to ensure a personal and immersive experience for every guest.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Section -->
        <div 
          class="mt-10 lg:mt-0 transform transition-transform duration-1000 ease-out opacity-0"
          :class="{'translate-x-0 opacity-100': isVisible, 'translate-x-10': !isVisible}"
        >
          <div class="aspect-w-16 aspect-h-9">
            <img 
              class="rounded-lg shadow-lg object-cover"
              src="../assets/crete_safari_logo.jpg"
              alt="Safari Experience Logo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const aboutSection = ref(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    },
    { threshold: 0.3 } // Trigger when 30% of the section is visible
  );

  if (aboutSection.value) {
    observer.observe(aboutSection.value);
  }
});
</script>
