<script setup lang="ts">
import { CheckCircleIcon, UserGroupIcon, TrophyIcon, HeartIcon } from '@heroicons/vue/24/solid'

const benefits = [
  'Kostenersparnis beim An- und Verkauf',
  'Minimierung von Verkaufsrisiken',
  'Professionelle Marktbewertung',
  'Umfassende Rechtsberatung',
  'Qualifizierte Notarverträge',
  'Langjährige Markterfahrung'
]

const team = [
  {
    name: 'Michael Weber',
    role: 'Geschäftsführer',
    image: '/WhatsApp Image 2025-09-01 at 21.33.23 copy.jpeg',
    description: 'Über 20 Jahre Erfahrung in der Immobilienbranche'
  },
  {
    name: 'Sarah Müller',
    role: 'Leiterin Firmenvermittlung',
    image: '/WhatsApp Image 2025-09-01 at 21.28.14.jpeg',
    description: 'Spezialistin für Unternehmenstransaktionen'
  },
  {
    name: 'Thomas Schmidt',
    role: 'Senior Immobilienmakler',
    image: '/WhatsApp Image 2025-09-01 at 21.35.38.jpeg',
    description: 'Experte für Gewerbeimmobilien'
  }
]

const stats = [
  { icon: TrophyIcon, number: '500+', label: 'Erfolgreiche Vermittlungen' },
  { icon: UserGroupIcon, number: '15+', label: 'Jahre Erfahrung' },
  { icon: HeartIcon, number: '98%', label: 'Kundenzufriedenheit' }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
      <div class="mx-auto max-w-6xl px-4">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Über ImmobilienMakler
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Seit über 15 Jahren Ihr vertrauensvoller Partner für Immobilien- und Firmenvermittlung in München
          </p>
        </div>
      </div>
    </section>
    
    <!-- Main Content -->
    <section class="py-12 bg-white">
      <div class="mx-auto max-w-6xl px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Warum ImmobilienMakler?
            </h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Mit jahrelanger Erfahrung im Immobilienmarkt bieten wir Ihnen einen umfassenden Service, 
              der weit über die reine Vermittlung hinausgeht. Unser Ziel ist es, Ihnen Kosten, Ärger 
              und Verkaufsrisiken zu ersparen.
            </p>
            
            <div class="space-y-3 mb-8">
              <div 
                v-for="benefit in benefits" 
                :key="benefit"
                class="flex items-center"
              >
                <CheckCircleIcon class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span class="text-gray-700">{{ benefit }}</span>
              </div>
            </div>
            
            <router-link to="/kontakt" class="btn-primary inline-flex items-center">
              Kostenlose Beratung anfragen
            </router-link>
          </div>
          
          <div class="relative">
            <div class="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="/WhatsApp Image 2025-09-01 at 21.28.14.jpeg" 
                alt="Beratungsgespräch" 
                class="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div 
            v-for="stat in stats" 
            :key="stat.label"
            class="text-center p-6 card"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <component :is="stat.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-2">{{ stat.number }}</div>
            <div class="text-gray-600">{{ stat.label }}</div>
          </div>
        </div>
        
        <!-- Team -->
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Unser Team
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="member in team" 
              :key="member.name"
              class="text-center card p-6"
            >
              <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  :src="member.image" 
                  :alt="member.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ member.name }}</h3>
              <p class="text-primary-600 font-medium mb-2">{{ member.role }}</p>
              <p class="text-gray-600 text-sm">{{ member.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>