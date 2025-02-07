<script setup>
import { ref, onMounted } from 'vue';

const images = ref([]);
const selectedImage = ref(null);

onMounted(() => {
  const imageNames = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg',
    'image7.jpg',
    'image8.jpg'
  ];

  images.value = imageNames.map(name => `/gallery/${name}`);
});

// Function to open the modal
const openModal = (image) => {
  selectedImage.value = image;
};

// Function to close the modal
const closeModal = () => {
  selectedImage.value = null;
};
</script>

<template>
  <div class="py-16 px-4 sm:px-6 lg:px-8 bg-stone-100">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl text-stone-900 mb-8 text-center font-extrabold sm:text-4xl">Adventure Gallery</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="(image, index) in images" 
          :key="index" 
          class="aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer"
          @click="openModal(image)"
        >
          <img 
            :src="image"
            :alt="`Safari Image ${index + 1}`"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div 
    v-if="selectedImage" 
    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div class="relative max-w-3xl w-full p-4">
      <img :src="selectedImage" class="w-full h-auto max-h-[80vh] rounded-lg shadow-xl" />
    </div>
  </div>
</template>
