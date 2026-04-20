<script setup>
import Navbar from './components/Navbar.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <div class="min-h-screen bg-brand-stone">
    <Navbar />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
    <ContactSection />
  </div>
</template>