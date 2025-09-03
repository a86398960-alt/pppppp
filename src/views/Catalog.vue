<script setup lang="ts">
import { ref, computed } from 'vue'
import { BuildingOfficeIcon, MapPinIcon, CurrencyEuroIcon, UsersIcon, CalendarIcon, PlusIcon, HomeIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { companies, type Company, getAllIndustries } from '../data/companies'
import { properties, type Property, getAllPropertyTypes } from '../data/properties'

const selectedCompany = ref<Company | null>(null)
const selectedProperty = ref<Property | null>(null)
const searchTerm = ref('')
const selectedIndustry = ref('')
const selectedPropertyType = ref('')
const activeTab = ref<'companies' | 'properties'>('properties')
const currentImageIndex = ref(0)

const industries = computed(() => getAllIndustries())
const propertyTypes = computed(() => getAllPropertyTypes())

const filteredCompanies = computed(() => {
  return companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesIndustry = !selectedIndustry.value || company.industry === selectedIndustry.value
    return matchesSearch && matchesIndustry
  })
})

const filteredProperties = computed(() => {
  return properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         property.type.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesType = !selectedPropertyType.value || property.type === selectedPropertyType.value
    return matchesSearch && matchesType
  })
})

const clearFilters = () => {
  searchTerm.value = ''
  selectedIndustry.value = ''
  selectedPropertyType.value = ''
}

const nextImage = () => {
  if (selectedProperty.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedProperty.value.images.length
  }
}

const prevImage = () => {
  if (selectedProperty.value) {
    currentImageIndex.value = currentImageIndex.value === 0 
      ? selectedProperty.value.images.length - 1 
      : currentImageIndex.value - 1
  }
}

const openPropertyModal = (property: Property) => {
  selectedProperty.value = property
  currentImageIndex.value = 0
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
      <div class="mx-auto max-w-6xl px-4">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Katalog
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Entdecken Sie aktuelle Immobilienangebote und etablierte Unternehmen in München und Umgebung.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Tabs -->
    <section class="py-6 bg-white border-b">
      <div class="mx-auto max-w-6xl px-4">
        <div class="flex justify-center">
          <div class="flex bg-gray-100 rounded-lg p-1">
            <button 
              @click="activeTab = 'properties'"
              :class="[
                'px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center',
                activeTab === 'properties' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              <HomeIcon class="w-4 h-4 mr-2" />
              Immobilien
            </button>
            <button 
              @click="activeTab = 'companies'"
              :class="[
                'px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center',
                activeTab === 'companies' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              <BuildingOfficeIcon class="w-4 h-4 mr-2" />
              Unternehmen
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Filters -->
    <section class="py-8 bg-white border-b">
      <div class="mx-auto max-w-6xl px-4">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <div class="flex-1">
            <input 
              v-model="searchTerm"
              type="text" 
              :placeholder="activeTab === 'properties' ? 'Immobilie, Lage oder Typ suchen...' : 'Firmenname, Branche oder Beschreibung suchen...'"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
          <div class="md:w-64">
            <select 
              v-if="activeTab === 'properties'"
              v-model="selectedPropertyType"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="">Alle Immobilientypen</option>
              <option v-for="type in propertyTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <select 
              v-else
              v-model="selectedIndustry"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="">Alle Branchen</option>
              <option v-for="industry in industries" :key="industry" :value="industry">
                {{ industry }}
              </option>
            </select>
          </div>
          <button 
            v-if="searchTerm || selectedIndustry || selectedPropertyType"
            @click="clearFilters"
            class="btn-secondary whitespace-nowrap"
          >
            Filter zurücksetzen
          </button>
        </div>
        
        <div class="mt-4 text-sm text-gray-600">
          <span v-if="activeTab === 'properties'">
            {{ filteredProperties.length }} von {{ properties.length }} Immobilien
          </span>
          <span v-else>
            {{ filteredCompanies.length }} von {{ companies.length }} Unternehmen
          </span>
        </div>
      </div>
    </section>
    
    <!-- Properties Grid -->
    <section v-if="activeTab === 'properties'" class="py-12 bg-gray-50">
      <div class="mx-auto max-w-6xl px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="property in filteredProperties" 
            :key="property.id"
            class="card overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            @click="openPropertyModal(property)"
          >
            <div class="relative overflow-hidden">
              <img 
                :src="property.images[0]" 
                :alt="property.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {{ property.type }}
              </div>
              <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded text-xs font-medium">
                {{ property.images.length }} Bilder
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {{ property.title }}
              </h3>
              
              <div class="flex items-center text-gray-600 mb-3">
                <MapPinIcon class="w-4 h-4 mr-2" />
                <span class="text-sm">{{ property.location }}</span>
              </div>
              
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <CurrencyEuroIcon class="w-5 h-5 text-primary-600 mr-1" />
                  <span class="text-lg font-bold text-primary-600">{{ property.price }}</span>
                </div>
                <div class="text-sm text-gray-500">
                  {{ property.size }}m² • {{ property.rooms }} Zimmer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Companies Grid -->
    <section v-else class="py-12 bg-gray-50">
      <div class="mx-auto max-w-6xl px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="company in filteredCompanies" 
            :key="company.id"
            class="card overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            @click="selectedCompany = company"
          >
            <div class="relative overflow-hidden">
              <img 
                :src="company.image" 
                :alt="company.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {{ company.industry }}
              </div>
              <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded text-xs font-medium">
                {{ company.employees }} MA
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {{ company.name }}
              </h3>
              
              <p class="text-gray-600 mb-4 text-sm line-clamp-2">{{ company.description }}</p>
              
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-gray-500 text-sm">
                  <MapPinIcon class="w-4 h-4 mr-2 flex-shrink-0" />
                  {{ company.location }}
                </div>
                <div class="flex items-center text-gray-500 text-sm">
                  <CalendarIcon class="w-4 h-4 mr-2 flex-shrink-0" />
                  Gegründet {{ company.founded }}
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <CurrencyEuroIcon class="w-5 h-5 text-primary-600 mr-1" />
                  <span class="text-lg font-bold text-primary-600">{{ company.revenue }}</span>
                  <span class="text-sm text-gray-500 ml-1">p.a.</span>
                </div>
                <button class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                  Details
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Add Company CTA -->
        <div class="mt-12 text-center">
          <div class="card p-8 max-w-2xl mx-auto bg-gradient-to-br from-primary-50 to-white">
            <PlusIcon class="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Ihr Unternehmen im Katalog
            </h3>
            <p class="text-gray-600 mb-6">
              Möchten Sie Ihr Unternehmen verkaufen oder sind auf der Suche nach einem Nachfolger? 
              Wir helfen Ihnen dabei, die richtige Lösung zu finden und vermitteln seriöse Interessenten.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <router-link to="/kontakt" class="btn-primary">
                Unternehmen eintragen
              </router-link>
              <router-link to="/dienstleistungen" class="btn-secondary">
                Mehr über Firmenvermittlung
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Property Detail Modal -->
    <div 
      v-if="selectedProperty" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="selectedProperty = null"
    >
      <div 
        class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Image Gallery -->
        <div class="relative">
          <div class="relative h-80 overflow-hidden">
            <img 
              :src="selectedProperty.images[currentImageIndex]" 
              :alt="selectedProperty.title"
              class="w-full h-full object-cover"
            />
            
            <!-- Navigation Arrows -->
            <button 
              v-if="selectedProperty.images.length > 1"
              @click="prevImage"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors duration-200"
            >
              <ChevronLeftIcon class="w-5 h-5 text-gray-700" />
            </button>
            <button 
              v-if="selectedProperty.images.length > 1"
              @click="nextImage"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors duration-200"
            >
              <ChevronRightIcon class="w-5 h-5 text-gray-700" />
            </button>
            
            <!-- Image Counter -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {{ currentImageIndex + 1 }} / {{ selectedProperty.images.length }}
            </div>
            
            <!-- Close Button -->
            <button 
              @click="selectedProperty = null"
              class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Image Thumbnails -->
          <div v-if="selectedProperty.images.length > 1" class="flex space-x-2 p-4 bg-gray-50 overflow-x-auto">
            <button
              v-for="(image, index) in selectedProperty.images"
              :key="index"
              @click="currentImageIndex = index"
              :class="[
                'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200',
                currentImageIndex === index ? 'border-primary-500' : 'border-gray-200 hover:border-gray-300'
              ]"
            >
              <img :src="image" :alt="`Bild ${index + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>
        
        <div class="p-8">
          <div class="mb-8">
            <div class="flex items-center mb-2">
              <span class="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                {{ selectedProperty.type }}
              </span>
              <span class="text-sm text-gray-500">{{ selectedProperty.location }}</span>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ selectedProperty.title }}</h2>
            <p class="text-lg text-gray-600 mb-6">{{ selectedProperty.description }}</p>
            
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="feature in selectedProperty.features" 
                :key="feature"
                class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {{ feature }}
              </span>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Objektdaten</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Wohnfläche:</span>
                  <span class="font-medium">{{ selectedProperty.size }}m²</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Zimmer:</span>
                  <span class="font-medium">{{ selectedProperty.rooms }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Kaufpreis:</span>
                  <span class="font-bold text-primary-600">€{{ selectedProperty.price }}</span>
                </div>
                <div v-if="selectedProperty.details.yearBuilt" class="flex justify-between">
                  <span class="text-gray-600">Baujahr:</span>
                  <span class="font-medium">{{ selectedProperty.details.yearBuilt }}</span>
                </div>
                <div v-if="selectedProperty.details.condition" class="flex justify-between">
                  <span class="text-gray-600">Zustand:</span>
                  <span class="font-medium">{{ selectedProperty.details.condition }}</span>
                </div>
                <div v-if="selectedProperty.details.heating" class="flex justify-between">
                  <span class="text-gray-600">Heizung:</span>
                  <span class="font-medium">{{ selectedProperty.details.heating }}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Ausstattung</h3>
              <div class="space-y-2">
                <div v-if="selectedProperty.details.garden" class="flex items-center text-green-600">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Garten vorhanden
                </div>
                <div v-if="selectedProperty.details.balcony" class="flex items-center text-green-600">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Balkon/Terrasse
                </div>
                <div v-if="selectedProperty.details.elevator" class="flex items-center text-green-600">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Aufzug vorhanden
                </div>
                <div v-if="selectedProperty.details.parking" class="flex items-center text-green-600">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  {{ selectedProperty.details.parking }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="border-t pt-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-1">Telefon</h4>
                <a :href="`tel:${selectedProperty.contact.phone}`" class="text-primary-600 hover:text-primary-700">
                  {{ selectedProperty.contact.phone }}
                </a>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-1">E-Mail</h4>
                <a :href="`mailto:${selectedProperty.contact.email}`" class="text-primary-600 hover:text-primary-700">
                  {{ selectedProperty.contact.email }}
                </a>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/kontakt" class="btn-primary flex-1 text-center">
                Besichtigung vereinbaren
              </router-link>
              <button class="btn-secondary">
                Weitere Informationen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Company Detail Modal -->
    <div 
      v-if="selectedCompany" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="selectedCompany = null"
    >
      <div 
        class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="relative">
          <img 
            :src="selectedCompany.image" 
            :alt="selectedCompany.name"
            class="w-full h-64 object-cover"
          />
          <button 
            @click="selectedCompany = null"
            class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span class="text-sm font-medium text-gray-700">{{ selectedCompany.industry }}</span>
          </div>
        </div>
        
        <div class="p-8">
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedCompany.name }}</h2>
            <p class="text-lg text-gray-600 mb-4">{{ selectedCompany.description }}</p>
            
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="highlight in selectedCompany.highlights" 
                :key="highlight"
                class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
              >
                {{ highlight }}
              </span>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Unternehmensdaten</h3>
              <div class="space-y-3">
                <div class="flex items-center">
                  <MapPinIcon class="w-5 h-5 text-gray-400 mr-3" />
                  <span class="text-gray-600">{{ selectedCompany.location }}</span>
                </div>
                <div class="flex items-center">
                  <UsersIcon class="w-5 h-5 text-gray-400 mr-3" />
                  <span class="text-gray-600">{{ selectedCompany.employees }} Mitarbeiter</span>
                </div>
                <div class="flex items-center">
                  <CalendarIcon class="w-5 h-5 text-gray-400 mr-3" />
                  <span class="text-gray-600">Gegründet {{ selectedCompany.founded }}</span>
                </div>
                <div class="flex items-center">
                  <CurrencyEuroIcon class="w-5 h-5 text-gray-400 mr-3" />
                  <span class="text-gray-600">{{ selectedCompany.revenue }} Jahresumsatz</span>
                </div>
                <div v-if="selectedCompany.details?.legalForm" class="flex items-center">
                  <BuildingOfficeIcon class="w-5 h-5 text-gray-400 mr-3" />
                  <span class="text-gray-600">{{ selectedCompany.details.legalForm }}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Spezialisierungen</h3>
              <ul class="space-y-2 mb-6">
                <li 
                  v-for="specialty in selectedCompany.details?.specialties || []" 
                  :key="specialty"
                  class="flex items-center text-gray-600"
                >
                  <div class="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  {{ specialty }}
                </li>
              </ul>
              
              <div v-if="selectedCompany.details?.certifications?.length">
                <h4 class="font-medium text-gray-900 mb-2">Zertifizierungen</h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="cert in selectedCompany.details.certifications" 
                    :key="cert"
                    class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                  >
                    {{ cert }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="border-t pt-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-1">Telefon</h4>
                <a :href="`tel:${selectedCompany.contact.phone}`" class="text-primary-600 hover:text-primary-700">
                  {{ selectedCompany.contact.phone }}
                </a>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-1">E-Mail</h4>
                <a :href="`mailto:${selectedCompany.contact.email}`" class="text-primary-600 hover:text-primary-700">
                  {{ selectedCompany.contact.email }}
                </a>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/kontakt" class="btn-primary flex-1 text-center">
                Interesse bekunden
              </router-link>
              <button class="btn-secondary">
                Weitere Informationen anfordern
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>