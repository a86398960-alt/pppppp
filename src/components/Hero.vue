<script setup lang="ts">
import { ArrowRightIcon, BuildingOfficeIcon, HomeIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    icon: HomeIcon,
    title: 'Immobilienvermittlung',
    description: 'Professionelle Vermittlung von Wohn- und Gewerbeimmobilien'
  },
  {
    icon: BuildingOfficeIcon,
    title: 'Firmenvermittlung',
    description: 'Spezialisiert auf Unternehmensverkäufe und Nachfolgeregelungen'
  },
  {
    icon: UserGroupIcon,
    title: 'Persönliche Betreuung',
    description: 'Individuelle Beratung von der ersten Idee bis zum Abschluss'
  }
]
</script>

<template>
  <section id="home" class="relative bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
    <div class="absolute inset-0 bg-white/20"></div>
    <div class="relative mx-auto max-w-6xl px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-center lg:text-left">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Ihr Partner für
            <span class="text-primary-600 block">Immobilien & Firmen</span>
          </h1>
          <p class="mt-6 text-lg text-gray-600 leading-relaxed">
            Professionelle Vermittlung von Immobilien und Unternehmen mit umfassendem Service. 
            Von der Bewertung bis zum Notarvertrag - wir begleiten Sie durch den gesamten Prozess.
          </p>
          
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <router-link to="/dienstleistungen" class="btn-primary inline-flex items-center justify-center">
              Unsere Services
              <ArrowRightIcon class="ml-2 h-4 w-4" />
            </router-link>
            <router-link to="/katalog" class="btn-secondary">
              Firmenkatalog ansehen
            </router-link>
          </div>
          
          <!-- Quick Features -->
          <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              v-for="feature in features" 
              :key="feature.title"
              class="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg"
            >
              <component :is="feature.icon" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 class="font-semibold text-gray-900 text-sm mb-1">{{ feature.title }}</h3>
              <p class="text-xs text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="relative">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <div class="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/WhatsApp Image 2025-09-01 at 21.35.38 (1).jpeg" 
                  alt="Moderne Immobilie" 
                  class="w-full h-32 object-cover"
                />
              </div>
              <div class="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/WhatsApp Image 2025-09-01 at 21.33.23.jpeg" 
                  alt="Geschäftsgebäude" 
                  class="w-full h-40 object-cover"
                />
              </div>
            </div>
            <div class="space-y-4 mt-8">
              <div class="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/WhatsApp Image 2025-09-01 at 21.28.14.jpeg" 
                  alt="Beratungsgespräch" 
                  class="w-full h-40 object-cover"
                />
              </div>
              <div class="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/WhatsApp Image 2025-09-01 at 21.35.38.jpeg" 
                  alt="Bürogebäude" 
                  class="w-full h-32 object-cover"
                />
              </div>
            </div>
          </div>
          
          <!-- Floating Stats -->
          <div class="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 hidden lg:block">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-600">Rund um die Uhr</div>
              <div class="text-sm text-gray-600">Vermittlungen</div>
            </div>
          </div>
          
          <div class="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 hidden lg:block">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-600">15+</div>
              <div class="text-sm text-gray-600">Jahre Erfahrung</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>