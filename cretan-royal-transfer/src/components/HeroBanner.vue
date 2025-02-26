<template>
  <div class="relative h-screen bg-[#2C2C2C]">
    <div class="absolute inset-0">
      <img 
        src="../assets/airport-hero.jpg" 
        class="w-full h-full object-cover"
        alt="Crete Transfer"
      />
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center md:text-left">
      <div class="w-full md:w-2/3 mt-12 md:mt-0">
        <Transition
          appear
          enter-active-class="transition duration-1000"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
          <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-[#E5E5E5] mb-6 flex items-center justify-center">
            <img src="../assets/crt-hero.png" alt="Cretan Royal Transfer" class="h-40  w-auto md:h-auto" />
          </h1>
        </Transition>

        <Transition
          appear
          enter-active-class="transition duration-1000 delay-300"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
          <p class="text-lg sm:text-xl md:text-2xl text-[#E5E5E5] mb-8 text-justify md:text-justify">
            Cretan Royal Transfer is dedicated to providing a seamless and comfortable travel experience across Crete. With a focus on security, reliability, and customer satisfaction, our professional drivers ensure a stress-free journey. Whether you're heading to the airport, a hotel, or a scenic destination, you can trust us for a premium transfer service tailored to your needs.
          </p>
        </Transition>

        <Transition
          appear
          enter-active-class="transition duration-1000 delay-500"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
        
          <div class="mt-6 flex justify-center md:justify-start">
            <RouterLink to="/book">
            <button 
              class="bg-[#D8A444] text-[#2C2C2C] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#B4952E] transition-colors w-full sm:w-auto">
              Book Us
            </button>
          </RouterLink>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
const scrollToBooking = () => {
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
};
</script>
