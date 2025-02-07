<script setup>
const scrollToBooking = () => {
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
};

const scrollToServices = () => {
  document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <div class="relative h-screen">
    <div class="absolute inset-0">
      <img 
        src="../assets/crete_safari_nissan_river.jpg" 
        class="w-full h-full object-cover"
        alt="Safari Landscape"
      />
      <div class="absolute inset-0 bg-black opacity-40"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
      <div class="text-center w-full">
        <Transition
          appear
          enter-active-class="transition duration-1000"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Wild Adventures in Crete
          </h1>
        </Transition>

        <Transition
          appear
          enter-active-class="transition duration-1000 delay-300"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
          <p class="text-xl sm:text-2xl text-stone-200 mb-8">
            Experience the untamed beauty of Crete with our guided safari adventures
          </p>
        </Transition>

        <Transition
          appear
          enter-active-class="transition duration-1000 delay-500"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div class="space-x-4">
            <button 
              @click="scrollToBooking"
              class="bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Book Now
            </button>
            <button 
              @click="scrollToServices"
              class="bg-stone-800/80 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-stone-900/80 transition-colors inline-block backdrop-blur-sm"
            >
              Explore Tours
          </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>