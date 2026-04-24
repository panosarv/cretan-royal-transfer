<script setup>
import HeroBanner from '../components/HeroBanner.vue'
import AboutSection from '../components/AboutSection.vue'
import AboutUsSection from '../components/AboutUsSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import MeetTheTeam from '../components/MeetTheTeam.vue'
</script>

<template>
  <div class="min-h-screen bg-brand-stone">
    <!-- 1. Hero -->
    <HeroBanner />

    <!-- 2. Services -->
    <ServicesSection />

    <!-- 3. About Us (company story) -->
    <AboutUsSection />

    <!-- 5. Why Choose Us -->
    <AboutSection />

    <!-- 6. Meet the Team -->
    <div class="relative z-10">
      <div class="relative py-20 px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0">
          <img
            src="../assets/chania-meetteam.jpg"
            class="w-full h-full object-cover"
            alt="Meet the Team Background"
          />
          <div class="absolute inset-0 bg-stone-900/70 backdrop-blur-sm"></div>
        </div>
        <div class="relative max-w-4xl mx-auto">
          <MeetTheTeam />
        </div>
      </div>
    </div>
  </div>
</template>
