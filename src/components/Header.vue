<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Dienstleistungen', to: '/dienstleistungen' },
  { name: 'Katalog', to: '/katalog' },
  { name: 'Über uns', to: '/ueber-uns' },
  { name: 'Kontakt', to: '/kontakt' },
  { name: 'Admin', to: '/admin' },
]
</script>

<template>
  <header class="bg-white shadow-lg sticky top-0 z-50">
    <nav class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex w-full items-center justify-between py-4">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">EK</span>
            </div>
            <span class="text-xl font-bold text-gray-900">eurokoncept</span>
          </router-link>
        </div>
        
        <div class="ml-6 hidden space-x-6 lg:block">
          <router-link 
            v-for="link in navigation" 
            :key="link.name" 
            :to="link.to"
            class="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
            active-class="text-primary-600"
          >
            {{ link.name }}
          </router-link>
        </div>
        
        <div class="ml-6 lg:hidden">
          <button
            type="button"
            class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-700"
            @click="mobileMenuOpen = true"
          >
            <Bars3Icon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      
      <div class="flex flex-wrap justify-center space-x-4 py-3 lg:hidden">
        <router-link 
          v-for="link in navigation" 
          :key="link.name" 
          :to="link.to"
          class="text-sm font-medium text-gray-700 hover:text-primary-600"
          active-class="text-primary-600"
          @click="mobileMenuOpen = false"
        >
          {{ link.name }}
        </router-link>
      </div>
    </nav>
  </header>
</template>