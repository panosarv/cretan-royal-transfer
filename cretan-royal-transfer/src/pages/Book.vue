<script setup>
import BookingWizard from '../components/booking/BookingWizard.vue'
</script>

<template>
  <div class="relative min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 py-24" id="booking">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img
        src="../assets/chania-meetteam.jpg"
        class="w-full h-full object-cover"
        alt="Crete Transfer"
      />
      <div class="absolute inset-0 bg-stone-900/75 backdrop-blur-sm"></div>
    </div>

    <!-- Wizard Container -->
    <div class="relative w-full max-w-2xl bg-stone-900/85 p-6 sm:p-10 rounded-2xl shadow-2xl border border-stone-700/50">
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-stone-100 mb-2">Book Your Transfer</h1>
        <p class="text-stone-400">Private transfers and tours across Crete</p>
      </div>
      <BookingWizard />
    </div>
  </div>
</template>
