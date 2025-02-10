<template>
  <div class="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50" id="services">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-stone-900 sm:text-4xl">
          Our Premium Transport Services
        </h2>
        <p class="mt-4 text-lg text-stone-600">
          Choose from our top transport services designed for comfort and reliability.
        </p>
      </div>

      <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(service, index) in services" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200">
          <img :src="service.image" :alt="service.alt" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-stone-900 mb-2">{{ service.title }}</h3>
            <p class="text-stone-600 mb-4">{{ service.description }}</p>
            <ul class="text-stone-500 mb-4">
              <li v-for="(feature, i) in service.features" :key="i" class="flex items-center">
                <img src="/src/assets/icons/next.svg" class="h-5 w-5 text-amber-600 mr-2" alt="Next Icon" />
                {{ feature }}
              </li>
            </ul>
            <RouterLink to="/book">
              <button class="w-full bg-stone-800 text-white py-2 rounded-md hover:bg-stone-900 transition-colors">
                Book Now
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';
import aiportchaniaimg from '/src/assets/airport-chania-services.jpg';
import airportheraklionimg from '/src/assets/airport-heraklion-services.jpg';
import knossostourimg from '/src/assets/reliability-aboutus.jpg';
import prevelitourimg from '/src/assets/preveli-services.jpg';
import arkaditourimg from '/src/assets/arkadi-services.jpg';
import elafonisiimg from '/src/assets/elafonisi-services.jpg';


const services = [
  {
    image: aiportchaniaimg,
    title: 'Airport Transfer - Chania',
    description: 'Reliable and comfortable transfers from Chania Airport to your destination.',
    features: ['24/7 Availability', 'Luxury Vehicles', 'Meet & Greet Service'],
    alt: 'Airport Transfer Chania'
  },
  {
    image: airportheraklionimg,
    title: 'Airport Transfer - Heraklion',
    description: 'Efficient transfers from Heraklion Airport to any location in Crete.',
    features: ['Professional Drivers', 'VIP Service', 'Fast & Safe'],
    alt: 'Airport Transfer Heraklion'
  },
  {
    image: knossostourimg,
    title: 'Knossos Tour',
    description: 'Discover the ancient ruins of Knossos with a guided tour and transport.',
    features: ['Historical Landmarks', 'Expert Guide', 'Comfortable Transport'],
    alt: 'Knossos Tour'
  },
  {
    image: prevelitourimg,
    title: 'Preveli Tour',
    description: 'Visit the stunning Preveli beach and monastery with our guided tour.',
    features: ['Scenic Views', 'Luxury Transport', 'Local Guide'],
    alt: 'Preveli Tour'
  },
  {
    image: arkaditourimg,
    title: 'Arkadi Tour',
    description: 'Explore the historic Arkadi Monastery and its beautiful surroundings.',
    features: ['Cultural Experience', 'Private or Group Tours', 'Hotel Pickup'],
    alt: 'Arkadi Tour'
  },
  {
    image: elafonisiimg,
    title: 'Elafonisi Tour',
    description: 'Discover the pink sands of Elafonisi beach and its crystal-clear waters.',
    features: ['Beach Paradise', 'Luxury Transport', 'Local Guide'],
    alt: 'Elafonisi Tour'
  }
];
</script>
