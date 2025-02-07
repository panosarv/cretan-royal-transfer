<script setup>
import Navbar from './components/Navbar.vue'
import HeroBanner from './components/HeroBanner.vue'
import AboutSection from './components/AboutSection.vue'
import ImageGallery from './components/ImageGallery.vue'
import ServicesSection from './components/ServicesSection.vue'
import BookingForm from './components/BookingForm.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <div class="min-h-screen bg-stone-50">
    <Navbar />
    <HeroBanner />
    <AboutSection />
    <ImageGallery />
    <ServicesSection />
    <div class="relative py-16 px-4 sm:px-6 lg:px-8" id="booking">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?"
          class="w-full h-full object-cover"
          alt="Safari Background"
        />
        <div class="absolute inset-0 bg-stone-900/70 backdrop-blur-sm"></div>
      </div>
      <div class="relative max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">Book Your Adventure</h2>
          <p class="text-lg text-stone-200">Reserve your spot for an unforgettable Cretan safari experience</p>
        </div>
        <BookingForm />
      </div>
    </div>
    <ContactSection />
  </div>
</template>