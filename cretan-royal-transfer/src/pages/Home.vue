<script setup>
import HeroBanner from '../components/HeroBanner.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import MeetTheTeam from '../components/MeetTheTeam.vue'
</script>

<template>
  <div class="min-h-screen bg-brand-stone">
    <!-- 1. Hero -->
    <HeroBanner />

    <!-- 2. Services (immediately after hero diagonal cut) -->
    <ServicesSection />

    <!-- 3. Wave divider: brand-stone → brand-charcoal -->
    <div class="overflow-hidden leading-none bg-brand-stone -mt-1">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" class="w-full h-[80px] block" fill="#2C2C2C">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>

    <!-- 4. About -->
    <AboutSection />

    <!-- 5. Meet the Team — overlaps About by 60px -->
    <div class="relative z-10 -mt-16">
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
