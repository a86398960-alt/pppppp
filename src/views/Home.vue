<script setup lang="ts">
import Hero from '../components/Hero.vue'
</script>

<template>
  <div>
    <Hero />
    
    <!-- Quick Overview Section -->
    <section class="py-12 bg-white">
      <div class="mx-auto max-w-6xl px-4">
        <div class="text-center mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Willkommen bei ImmobilienMakler
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Ihr vertrauensvoller Partner für professionelle Immobilienvermittlung und umfassende Beratung 
            in München und Umgebung. Wir begleiten Sie von der ersten Idee bis zum erfolgreichen Abschluss.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link to="/dienstleistungen" class="card p-6 group hover:scale-105 transition-transform duration-200">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-200">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Dienstleistungen</h3>
            <p class="text-gray-600 text-sm">Umfassende Services von der Bewertung bis zum Notarvertrag</p>
          </router-link>
          
          <router-link to="/katalog" class="card p-6 group hover:scale-105 transition-transform duration-200">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-200">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Firmenkatalog</h3>
            <p class="text-gray-600 text-sm">Aktuelle Gewerbeimmobilien und Firmenstandorte</p>
          </router-link>
          
          <router-link to="/kontakt" class="card p-6 group hover:scale-105 transition-transform duration-200">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-200">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Kontakt</h3>
            <p class="text-gray-600 text-sm">Kostenlose Beratung und persönliche Betreuung</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>