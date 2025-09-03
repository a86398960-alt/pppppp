<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = {
  services: [
    { name: 'Immobilienvermittlung', to: '/dienstleistungen' },
    { name: 'Finanzierungsberatung', to: '/dienstleistungen' },
    { name: 'Verkaufsexposés', to: '/dienstleistungen' },
    { name: 'Versicherungsanalyse', to: '/dienstleistungen' }
  ],
  company: [
    { name: 'Über uns', to: '/ueber-uns' },
    { name: 'Karriere', to: '/kontakt' },
    { name: 'Presse', to: '/kontakt' },
    { name: 'Partner', to: '/kontakt' }
  ],
  legal: [
    { name: 'Impressum', to: '/agb' },
    { name: 'Datenschutz', to: '/kontakt' },
    { name: 'AGB', to: '/agb' },
    { name: 'Cookie-Richtlinie', to: '/kontakt' }
  ]
}
</script>

<template>
  <footer class="bg-secondary-900 text-white">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Company Info -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-2 mb-3">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">IM</span>
            </div>
            <span class="text-lg font-bold">ImmobilienMakler</span>
          </div>
          <p class="text-gray-300 leading-relaxed mb-4 text-sm">
            Ihr vertrauensvoller Partner für alle Immobilienangelegenheiten. 
            Professionell, zuverlässig und mit Leidenschaft für Immobilien.
          </p>
          <div class="flex space-x-3">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <span class="sr-only">Facebook</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Services -->
        <div>
          <h3 class="text-base font-semibold mb-3">Dienstleistungen</h3>
          <ul class="space-y-1">
            <li v-for="link in footerLinks.services" :key="link.name">
              <router-link :to="link.to" class="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Company -->
        <div>
          <h3 class="text-base font-semibold mb-3">Unternehmen</h3>
          <ul class="space-y-1">
            <li v-for="link in footerLinks.company" :key="link.name">
              <router-link :to="link.to" class="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Legal -->
        <div>
          <h3 class="text-base font-semibold mb-3">Rechtliches</h3>
          <ul class="space-y-1">
            <li v-for="link in footerLinks.legal" :key="link.name">
              <router-link :to="link.to" class="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 pt-6 border-t border-gray-700">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} ImmobilienMakler. Alle Rechte vorbehalten.
          </p>
          <p class="text-gray-400 text-xs mt-2 md:mt-0">
            Erstellt mit Vue.js & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>