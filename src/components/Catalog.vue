<script setup lang="ts">
import { ref } from 'vue'
import { HomeIcon, MapPinIcon, CurrencyEuroIcon } from '@heroicons/vue/24/outline'

defineProps<{
  showForm: boolean
}>()

defineEmits<{
  toggleForm: []
}>()

const properties = [
  {
    id: 1,
    title: 'Moderne Eigentumswohnung',
    location: 'München-Schwabing',
    price: '850.000',
    size: '95',
    rooms: '3.5',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'Eigentumswohnung'
  },
  {
    id: 2,
    title: 'Einfamilienhaus mit Garten',
    location: 'München-Bogenhausen',
    price: '1.250.000',
    size: '140',
    rooms: '5',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'Einfamilienhaus'
  },
  {
    id: 3,
    title: 'Penthouse mit Dachterrasse',
    location: 'München-Maxvorstadt',
    price: '1.850.000',
    size: '120',
    rooms: '4',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'Penthouse'
  },
  {
    id: 4,
    title: 'Charmante Altbauwohnung',
    location: 'München-Glockenbachviertel',
    price: '720.000',
    size: '85',
    rooms: '3',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'Altbauwohnung'
  },
  {
    id: 5,
    title: 'Neubau-Maisonette',
    location: 'München-Sendling',
    price: '950.000',
    size: '110',
    rooms: '4',
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'Maisonette'
  },
  {
    id: 6,
    title: 'Villa mit Pool',
    location: 'München-Grünwald',
    price: '2.500.000',
    size: '280',
    rooms: '7',
    image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'Villa'
  }
]

const selectedProperty = ref<typeof properties[0] | null>(null)
</script>

<template>
  <section id="catalog" class="py-12 bg-gray-50">
    <div class="mx-auto max-w-6xl px-4">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Aktuelle Immobilienangebote
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Entdecken Sie unsere handverlesenen Immobilien in Nürnberg und Umgebung
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="property in properties" 
          :key="property.id"
          class="card overflow-hidden group cursor-pointer"
          @click="selectedProperty = property"
        >
          <div class="relative overflow-hidden">
            <img 
              :src="property.image" 
              :alt="property.title"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
              {{ property.type }}
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
              {{ property.title }}
            </h3>
            
            <div class="flex items-center text-gray-600 mb-3">
              <MapPinIcon class="w-4 h-4 mr-1" />
              <span class="text-sm">{{ property.location }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <CurrencyEuroIcon class="w-4 h-4 text-primary-600 mr-1" />
                <span class="text-lg font-bold text-primary-600">{{ property.price }}</span>
              </div>
              <div class="text-sm text-gray-500">
                {{ property.size }}m² • {{ property.rooms }} Zimmer
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Property Detail Modal -->
      <div 
        v-if="selectedProperty" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="selectedProperty = null"
      >
        <div 
          class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="relative">
            <img 
              :src="selectedProperty.image" 
              :alt="selectedProperty.title"
              class="w-full h-64 object-cover"
            />
            <button 
              @click="selectedProperty = null"
              class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-6">
            <div class="mb-4">
              <span class="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-medium mb-2">
                {{ selectedProperty.type }}
              </span>
              <h3 class="text-2xl font-bold text-gray-900">{{ selectedProperty.title }}</h3>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="flex items-center">
                <MapPinIcon class="w-5 h-5 text-gray-400 mr-2" />
                <span class="text-gray-600">{{ selectedProperty.location }}</span>
              </div>
              <div class="flex items-center">
                <HomeIcon class="w-5 h-5 text-gray-400 mr-2" />
                <span class="text-gray-600">{{ selectedProperty.size }}m²</span>
              </div>
              <div class="flex items-center">
                <CurrencyEuroIcon class="w-5 h-5 text-gray-400 mr-2" />
                <span class="text-2xl font-bold text-primary-600">{{ selectedProperty.price }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-600">{{ selectedProperty.rooms }} Zimmer</span>
              </div>
            </div>
            
            <div class="flex space-x-3">
              <button class="btn-primary flex-1">
                Besichtigung vereinbaren
              </button>
              <button class="btn-secondary">
                Mehr Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>