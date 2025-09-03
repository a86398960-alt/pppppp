<script setup lang="ts">
import { ref } from 'vue'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form.value)
  alert('Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.')
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    phone: '',
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
</script>

<template>
  <section id="contact" class="py-12 bg-gray-50">
    <div class="mx-auto max-w-6xl px-4">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Kontakt aufnehmen
        </h2>
        <p class="text-lg text-gray-600">
          Lassen Sie uns über Ihr Immobilienprojekt sprechen
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Contact Information -->
        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-6">Wir sind für Sie da</h3>
          
          <div class="space-y-4">
            <div 
              v-for="info in contactInfo" 
              :key="info.title"
              class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <component :is="info.icon" class="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm">{{ info.title }}</h4>
                <p class="text-gray-700 font-medium text-sm">{{ info.details }}</p>
                <p class="text-sm text-gray-500">{{ info.subtitle }}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-primary-50 rounded-lg">
            <h4 class="font-semibold text-primary-900 mb-2 text-sm">Kostenlose Erstberatung</h4>
            <p class="text-primary-700 text-sm">
              Nutzen Sie unser kostenloses Beratungsgespräch, um Ihre Immobilienziele zu besprechen. 
              Wir entwickeln gemeinsam die optimale Strategie für Ihr Vorhaben.
            </p>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div class="card p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Nachricht senden</h3>
          
          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input 
                  id="name"
                  v-model="form.name" 
                  type="text" 
                  required
                  class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-sm"
                  placeholder="Ihr Name"
                />
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input 
                  id="phone"
                  v-model="form.phone" 
                  type="tel"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-sm"
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
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-sm"
                placeholder="ihre.email@beispiel.de"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Nachricht *</label>
              <textarea 
                id="message"
                v-model="form.message" 
                required
                rows="5"
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-sm"
                placeholder="Beschreiben Sie Ihr Anliegen..."
              ></textarea>
            </div>
            
            <button type="submit" class="w-full btn-primary text-sm">
              Nachricht senden
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>