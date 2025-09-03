<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

const benefits = [
  'Kostenersparnis beim An- und Verkauf',
  'Minimierung von Verkaufsrisiken',
  'Professionelle Marktbewertung',
  'Umfassende Rechtsberatung',
  'Qualifizierte Notarverträge',
  'Langjährige Markterfahrung'
]
</script>

<template>
  <section id="about" class="py-12 bg-white">
    <div class="mx-auto max-w-6xl px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Warum ImmobilienMakler?
          </h2>
          <p class="text-base text-gray-600 mb-6 leading-relaxed">
            Mit jahrelanger Erfahrung im Immobilienmarkt bieten wir Ihnen einen umfassenden Service, 
            der weit über die reine Vermittlung hinausgeht. Unser Ziel ist es, Ihnen Kosten, Ärger 
            und Verkaufsrisiken zu ersparen.
          </p>
          
          <div class="space-y-3">
            <div 
              v-for="benefit in benefits" 
              :key="benefit"
              class="flex items-center"
            >
              <CheckCircleIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span class="text-gray-700 text-sm">{{ benefit }}</span>
            </div>
          </div>
          
          <div class="mt-6">
            <a href="#contact" class="btn-primary inline-flex items-center">
              Kostenlose Beratung anfragen
            </a>
          </div>
        </div>
        
        <div class="relative">
          <div class="rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Beratungsgespräch" 
              class="w-full h-64 object-cover"
            />
          </div>
          
          <!-- Stats Cards -->
          <div class="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-600">Rund um die Uhr</div>
              <div class="text-sm text-gray-600">Erfolgreiche Vermittlungen</div>
            </div>
          </div>
          
          <div class="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-600">12</div>
              <div class="text-sm text-gray-600">Jahre Erfahrung</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>