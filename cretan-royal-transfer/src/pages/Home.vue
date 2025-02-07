<script setup>
import Navbar from '../components/Navbar.vue'
import HeroBanner from '../components/HeroBanner.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import MeetTheTeam from '../components/MeetTheTeam.vue'
</script>

<template>
  <div class="min-h-screen bg-stone-50">
    <Navbar />
    <HeroBanner />
    <AboutSection />
    <ServicesSection />
    <div class="relative py-16 px-4 sm:px-6 lg:px-8" id="booking">
      <div class="absolute inset-0">
        <img 
          src="../assets/chania-meetteam.jpg"
          class="w-full h-full object-cover"
          alt="Safari Background"
        />
        <div class="absolute inset-0 bg-stone-900/70 backdrop-blur-sm"></div>
      </div>
      <div class="relative max-w-4xl mx-auto">
        <div class="text-center mb-12">
          
        </div>
        <MeetTheTeam />
      </div>
    </div>
  </div>
</template>