<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>