<template>
  <div ref="aboutSection" class="py-16 px-4 sm:px-6 lg:px-8 bg-[#2C2C2C]" id="about">
    <div class="max-w-7xl mx-auto text-center">
      <Transition appear enter-active-class="transition duration-1000" enter-from-class="opacity-0 translate-y-6" enter-to-class="opacity-100 translate-y-0">
        <h2 class="text-3xl font-extrabold text-[#E5E5E5] tracking-tight sm:text-4xl mb-16">
          About Cretan Royal Transfer
        </h2>
      </Transition>
    </div>
    
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
      <TransitionGroup appear enter-active-class="transition duration-1000 delay-300" enter-from-class="opacity-0 translate-y-6" enter-to-class="opacity-100 translate-y-0">
        <div v-for="(item, index) in features" :key="index">
          <div class="flex items-center justify-center h-16 w-16 rounded-full bg-[#D8A444] text-[#2C2C2C] mx-auto">
            <img :src="item.icon" class="h-10 w-10" :alt="item.alt" />
          </div>
          <h3 class="text-lg font-medium text-[#E5E5E5] mt-6">{{ item.title }}</h3>
          <p class="mt-4 text-base text-[#E5E5E5] text-justify">{{ item.description }}</p>
        </div>
      </TransitionGroup>
    </div>
    
    <div class="max-w-5xl mx-auto mt-16 relative">
      <div class="overflow-hidden relative w-full rounded-lg shadow-lg">
        <TransitionGroup name="fade-slide" tag="div" class="flex transition-transform duration-1000 ease-in-out" id="carousel">
          <img v-for="(image, i) in images" :key="i" :src="image" class="w-full flex-shrink-0 object-cover" alt="Cretan Royal Transfer Image" />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>

<script setup>
import caricon from '/src/assets/icons/car.svg';
import shieldicon from '/src/assets/icons/shield.svg';
import airporticon from '/src/assets/icons/airport.svg';
import mapicon from '/src/assets/icons/map.svg';
import reliabilityimg from '/src/assets/reliability-aboutus.jpg';
import safetyimg from '/src/assets/safety-aboutus.jpg';
import airportimg from '/src/assets/airport-aboutus.jpg';
import leasureimg from '/src/assets/leasure-aboutus.jpg';
import { ref, onMounted } from 'vue';

const aboutSection = ref(null);
const isVisible = ref(false);
const index = ref(0);
const totalSlides = 4;

const features = [
  { icon: caricon, title: 'Reliable Transfers', description: 'We provide efficient and comfortable transfers across Crete with professional drivers ensuring a hassle-free experience.', alt: 'Car Icon' },
  { icon: shieldicon, title: 'Safety First', description: 'Our top priority is your safety. We maintain our vehicles to the highest standards and provide professional drivers for a secure journey.', alt: 'Shield Icon' },
  { icon: airporticon, title: 'Airport Transfers', description: 'We offer punctual and stress-free airport transfers, ensuring you reach your destination on time and in comfort.', alt: 'Airport Icon' },
  { icon: mapicon, title: 'Leisure Trips', description: 'Explore Crete in style with our leisure trip services. Discover the island\'s beauty with our luxurious and comfortable transport options.', alt: 'Map Icon' }
];

const images = [
  reliabilityimg,
  safetyimg,
  airportimg,
  leasureimg
];

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.3 }
  );

  if (aboutSection.value) {
    observer.observe(aboutSection.value);
  }

  // Auto-change slides every 2 seconds
  setInterval(() => {
    index.value = (index.value + 1) % totalSlides;
    document.getElementById('carousel').style.transform = `translateX(-${index.value * 100}%)`;
  }, 2000);
});
</script>
