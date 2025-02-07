<script setup>
import Navbar from './components/Navbar.vue'
import ContactSection from './components/ContactSection.vue';

</script>

<template>
  <div class="min-h-screen bg-stone-50">
    <Navbar />
    <router-view />
    <ContactSection />
  </div>
</template>