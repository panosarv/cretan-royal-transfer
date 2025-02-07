<template>
    <div class="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50" id="tours-airports">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold text-stone-900 sm:text-4xl">
          Explore Our Services & Tours
        </h2>
        <p class="mt-4 text-lg text-stone-600">
          Select a service or tour to view more details.
        </p>
      </div>
  
      <div class="mt-12 max-w-7xl mx-auto p-2 scrollbar-hide">
        <div v-if="isMobile" class="overflow-x-auto flex space-x-4 whitespace-nowrap pb-2">
          <button v-for="(service, index) in services" :key="index" @click="selectService(service)" 
            class="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200 hover:shadow-xl transition flex items-center justify-center p-4 text-center min-w-[180px] h-24"
            :class="{'bg-gray-300': selectedService === service}">
            <h3 class="text-md font-semibold text-stone-900 whitespace-normal break-words">{{ service.title }}</h3>
          </button>
        </div>
        <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <button v-for="(service, index) in services" :key="index" @click="selectService(service)" 
            class="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200 hover:shadow-xl transition flex items-center justify-center p-4 text-center w-full h-24"
            :class="{'bg-gray-300': selectedService === service}">
            <h3 class="text-md font-semibold text-stone-900 whitespace-normal break-words">{{ service.title }}</h3>
          </button>
        </div>
      </div>
  
      <div v-if="selectedService" class="max-w-5xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg border border-stone-200">
        <img :src="selectedService.image" :alt="selectedService.title" class="w-full h-64 object-cover rounded-lg" />
        <div class="mt-6">
          <h3 class="text-2xl font-bold text-stone-900">{{ selectedService.title }}</h3>
          <p class="mt-4 text-lg text-stone-600">{{ selectedService.description }}</p>
          <ul class="mt-4 text-stone-500">
            <li v-for="(feature, i) in selectedService.features" :key="i" class="flex items-center">
              <img src="/src/assets/icons/next.svg" class="h-5 w-5 text-amber-600 mr-2" />
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const services = ref([
  {
      image: '/src/assets/airport-chania-services.jpg',
      title: 'Airport Transfer - Chania',
      description: 'Reliable and comfortable transfers from Chania Airport to your destination.',
      features: ['24/7 Availability', 'Luxury Vehicles', 'Meet & Greet Service']
    },
    {
      image: '/src/assets/airport-heraklion-services.jpg',
      title: 'Airport Transfer - Heraklion',
      description: 'Efficient transfers from Heraklion Airport to any location in Crete.',
      features: ['Professional Drivers', 'VIP Service', 'Fast & Safe']
    },
    {
      image: '/src/assets/knossos-services.jpeg',
      title: 'Knossos Tour',
      description: 'Discover the ancient ruins of Knossos with a guided tour and transport.',
      features: ['Historical Landmarks', 'Expert Guide', 'Comfortable Transport']
    },
    {
      image: '/src/assets/preveli-services.jpg',
      title: 'Preveli Tour',
      description: 'Visit the stunning Preveli beach and monastery with our guided tour.',
      features: ['Scenic Views', 'Luxury Transport', 'Local Guide']
    },
    {
      image: '/src/assets/arkadi-services.jpg',
      title: 'Arkadi Tour',
      description: 'Explore the historic Arkadi Monastery and its beautiful surroundings.',
      features: ['Cultural Experience', 'Private or Group Tours', 'Hotel Pickup']
    },
    {
      image: '/src/assets/kalypso-tours.jpg',
      title: 'Kalypso - Plaka Tour',
      description: 'Experience the beautiful Kalypso and Plaka regions with stunning sea views.',
      features: ['Scenic Drives', 'Luxury Vehicles', 'Guided Experience']
    },
    {
      image: '/src/assets/elafonisi-tours.jpeg',
      title: 'Elafonisi Tour',
      description: 'Visit the breathtaking pink sand beaches of Elafonisi with expert guides.',
      features: ['Beach Exploration', 'Private Transfers', 'Nature Experience']
    },
    {
      image: '/src/assets/balos-tours.jpg',
      title: 'Balos Tour',
      description: 'Enjoy an unforgettable trip to the iconic Balos Lagoon with comfortable transport.',
      features: ['Boat Transfer', 'Luxury Transport', 'Private Tour Options']
    },
    {
      image: '/src/assets/kournas-tours.jpg',
      title: 'Kournas Lake',
      description: 'Discover the beauty of Kournas Lake, Crete’s only natural freshwater lake.',
      features: ['Relaxing Atmosphere', 'Nature Walks', 'Canoeing Option']
    },
    {
      image: '/src/assets/samaria-tours.jpg',
      title: 'Samaria Tour',
      description: 'Hike through the famous Samaria Gorge, Europe’s longest and most scenic gorge.',
      features: ['Guided Hiking', 'Stunning Views', 'Wildlife Spotting']
    },
    {
      image: '/src/assets/chania-old-town-tours.jpg',
      title: 'Chania Old Town',
      description: 'Explore the charming alleys, Venetian harbor, and cultural heritage of Chania Old Town.',
      features: ['Historical Landmarks', 'Local Guides', 'Shopping & Dining']
    },
    {
      image: '/src/assets/matala-malia-tours.jpg',
      title: 'Matala - Malia Tour',
      description: 'Discover the famous Matala caves and Malia’s vibrant atmosphere.',
      features: ['Cultural Sites', 'Beautiful Beaches', 'Guided Tour']
    },
    {
      image: '/src/assets/heraklion-tours.jpg',
      title: 'Heraklion Tour',
      description: 'Visit the capital of Crete, full of history, culture, and vibrant city life.',
      features: ['Archaeological Museum', 'City Exploration', 'Cretan Cuisine']
    },
    {
      image: '/src/assets/seitan-services.jpg',
      title: 'Seitan Harbor',
      description: 'Experience the breathtaking Seitan Harbor with its stunning blue waters and rocky formations.',
      features: ['Boat Tour', 'Scenic Views', 'Relaxation & Swimming']
    }
  ]);
  
  const selectedService = ref(services.value[0]);
  const isMobile = ref(false);
  
  const selectService = (service) => {
    selectedService.value = service;
  };
  
  onMounted(() => {
    isMobile.value = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
      isMobile.value = window.innerWidth <= 768;
    });
  });
  </script>
  
  <style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  </style>
  