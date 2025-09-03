<script setup lang="ts">
import { ref } from 'vue'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: 'general',
  message: ''
})

const submitForm = () => {
  console.log('Form submitted:', form.value)
  alert('Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.')
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'general',
    message: ''
  }
}

const contactInfo = [
  {
    icon: PhoneIcon,
    title: 'Telefon',
    details: '+49 (0) 89 123 456 789',
    subtitle: 'Mo-Fr 9:00-18:00 Uhr'
  },
  {
    icon: EnvelopeIcon,
    title: 'E-Mail',
    details: 'info@immobilienmakler.de',
    subtitle: 'Wir antworten innerhalb 24h'
  },
  {
    icon: MapPinIcon,
    title: 'Adresse',
    details: 'Musterstraße 123, 80331 München',
    subtitle: 'Zentral gelegen'
  },
  {
    icon: ClockIcon,
    title: 'Öffnungszeiten',
    details: 'Mo-Fr: 9:00-18:00',
    subtitle: 'Sa: 10:00-14:00'
  }
]

const subjects = [
  { value: 'general', label: 'Allgemeine Anfrage' },
  { value: 'property', label: 'Immobilienvermittlung' },
  { value: 'company', label: 'Firmenvermittlung' },
  { value: 'valuation', label: 'Immobilienbewertung' },
  { value: 'financing', label: 'Finanzierungsberatung' }
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
  { 
    icon: () => import('@heroicons/vue/24/solid').then(m => m.TrophyIcon), 
    number: '500+', 
    label: 'Erfolgreiche Vermittlungen' 
  },
  { 
    icon: () => import('@heroicons/vue/24/solid').then(m => m.UserGroupIcon), 
    number: '15+', 
    label: 'Jahre Erfahrung' 
  },
  { 
    icon: () => import('@heroicons/vue/24/solid').then(m => m.HeartIcon), 
    number: '98%', 
    label: 'Kundenzufriedenheit' 
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
      <div class="mx-auto max-w-6xl px-4">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Kontakt aufnehmen
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Lassen Sie uns über Ihr Immobilien- oder Firmenprojekt sprechen. 
            Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Contact Content -->
    <section class="py-12 bg-white">
      <div class="mx-auto max-w-6xl px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-900 mb-8">Wir sind für Sie da</h2>
            
            <div class="space-y-6 mb-8">
              <div 
                v-for="info in contactInfo" 
                :key="info.title"
                class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <component :is="info.icon" class="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ info.title }}</h3>
                  <p class="text-gray-700 font-medium">{{ info.details }}</p>
                  <p class="text-sm text-gray-500">{{ info.subtitle }}</p>
                </div>
              </div>
            </div>
            
            <div class="p-6 bg-primary-50 rounded-lg">
              <h3 class="font-semibold text-primary-900 mb-3">Kostenlose Erstberatung</h3>
              <p class="text-primary-700 mb-4">
                Nutzen Sie unser kostenloses Beratungsgespräch, um Ihre Immobilien- oder Firmenziele zu besprechen. 
                Wir entwickeln gemeinsam die optimale Strategie für Ihr Vorhaben.
              </p>
              <div class="rounded-lg overflow-hidden">
                <img 
                  src="/WhatsApp Image 2025-09-01 at 21.33.23 (1).jpeg" 
                  alt="Beratung" 
                  class="w-full h-32 object-cover"
                />
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="card p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Nachricht senden</h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input 
                    id="name"
                    v-model="form.name" 
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Ihr Name"
                  />
                </div>
                
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input 
                    id="phone"
                    v-model="form.phone" 
                    type="tel"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Ihre Telefonnummer"
                  />
                </div>
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">E-Mail *</label>
                <input 
                  id="email"
                  v-model="form.email" 
                  type="email" 
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="ihre.email@beispiel.de"
                />
              </div>
              
              <div>
                <label for="company" class="block text-sm font-medium text-gray-700 mb-2">Unternehmen</label>
                <input 
                  id="company"
                  v-model="form.company" 
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Ihr Unternehmen (optional)"
                />
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Betreff</label>
                <select 
                  id="subject"
                  v-model="form.subject"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                >
                  <option v-for="subject in subjects" :key="subject.value" :value="subject.value">
                    {{ subject.label }}
                  </option>
                </select>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Nachricht *</label>
                <textarea 
                  id="message"
                  v-model="form.message" 
                  required
                  rows="6"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                ></textarea>
              </div>
              
              <button type="submit" class="w-full btn-primary">
                Nachricht senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Team Section -->
    <section class="py-12 bg-gray-50">
      <div class="mx-auto max-w-6xl px-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Unser Expertenteam
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="member in team" 
            :key="member.name"
            class="text-center card p-6"
          >
            <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <img 
                :src="member.image" 
                :alt="member.name"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ member.name }}</h3>
            <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
            <p class="text-gray-600">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Stats Section -->
    <section class="py-12 bg-white">
      <div class="mx-auto max-w-6xl px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="stat in stats" 
            :key="stat.label"
            class="text-center p-8 card"
          >
            <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <component :is="stat.icon" class="w-8 h-8 text-primary-600" />
            </div>
            <div class="text-4xl font-bold text-gray-900 mb-2">{{ stat.number }}</div>
            <div class="text-gray-600 text-lg">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>