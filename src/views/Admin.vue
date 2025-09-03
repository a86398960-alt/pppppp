<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon, EyeIcon, EyeSlashIcon, BuildingOfficeIcon, HomeIcon } from '@heroicons/vue/24/outline'
import { properties, type Property } from '../data/properties'
import { companies, type Company } from '../data/companies'

const router = useRouter()
const isAuthenticated = ref(false)
const password = ref('')
const showPassword = ref(false)
const activeTab = ref<'properties' | 'companies'>('properties')

// Simple password check (in production, use proper authentication)
const adminPassword = 'admin123'

const authenticate = () => {
  if (password.value === adminPassword) {
    isAuthenticated.value = true
    password.value = ''
  } else {
    alert('Falsches Passwort!')
  }
}

const logout = () => {
  isAuthenticated.value = false
  router.push('/')
}

// Property form
const propertyForm = ref<Omit<Property, 'id'>>({
  title: '',
  type: '',
  location: '',
  price: '',
  size: '',
  rooms: '',
  images: [''],
  description: '',
  features: [''],
  contact: {
    email: '',
    phone: ''
  },
  details: {
    yearBuilt: '',
    condition: '',
    heating: '',
    parking: '',
    garden: false,
    balcony: false,
    elevator: false
  }
})

// Company form
const companyForm = ref<Omit<Company, 'id'>>({
  name: '',
  industry: '',
  location: '',
  employees: '',
  founded: '',
  revenue: '',
  image: '',
  description: '',
  highlights: [''],
  contact: {
    email: '',
    phone: ''
  },
  details: {
    website: '',
    legalForm: '',
    specialties: [''],
    certifications: ['']
  }
})

const propertyTypes = [
  'Eigentumswohnung',
  'Einfamilienhaus',
  'Penthouse',
  'Gewerbeimmobilie',
  'Altbauwohnung',
  'Maisonette',
  'Villa'
]

const industries = [
  'Software Development',
  'Baugewerbe',
  'Erneuerbare Energien',
  'Logistik & Transport',
  'Medizintechnik',
  'Gastronomie',
  'Einzelhandel',
  'Beratung',
  'Produktion',
  'Dienstleistung'
]

const addImageField = (form: any) => {
  if (activeTab.value === 'properties') {
    form.images.push('')
  }
}

const removeImageField = (form: any, index: number) => {
  if (activeTab.value === 'properties' && form.images.length > 1) {
    form.images.splice(index, 1)
  }
}

const addFeatureField = (form: any, field: string) => {
  form[field].push('')
}

const removeFeatureField = (form: any, field: string, index: number) => {
  if (form[field].length > 1) {
    form[field].splice(index, 1)
  }
}

const submitProperty = () => {
  // Clean up empty fields
  const cleanedProperty = {
    ...propertyForm.value,
    images: propertyForm.value.images.filter(img => img.trim() !== ''),
    features: propertyForm.value.features.filter(feature => feature.trim() !== '')
  }
  
  // Add new ID
  const newId = Math.max(...properties.map(p => p.id)) + 1
  const newProperty: Property = {
    ...cleanedProperty,
    id: newId
  }
  
  properties.push(newProperty)
  alert('Immobilie erfolgreich hinzugefügt!')
  resetPropertyForm()
}

const submitCompany = () => {
  // Clean up empty fields
  const cleanedCompany = {
    ...companyForm.value,
    highlights: companyForm.value.highlights.filter(h => h.trim() !== ''),
    details: {
      ...companyForm.value.details,
      specialties: companyForm.value.details?.specialties?.filter(s => s.trim() !== '') || [],
      certifications: companyForm.value.details?.certifications?.filter(c => c.trim() !== '') || []
    }
  }
  
  // Add new ID
  const newId = Math.max(...companies.map(c => c.id)) + 1
  const newCompany: Company = {
    ...cleanedCompany,
    id: newId
  }
  
  companies.push(newCompany)
  alert('Unternehmen erfolgreich hinzugefügt!')
  resetCompanyForm()
}

const resetPropertyForm = () => {
  propertyForm.value = {
    title: '',
    type: '',
    location: '',
    price: '',
    size: '',
    rooms: '',
    images: [''],
    description: '',
    features: [''],
    contact: {
      email: '',
      phone: ''
    },
    details: {
      yearBuilt: '',
      condition: '',
      heating: '',
      parking: '',
      garden: false,
      balcony: false,
      elevator: false
    }
  }
}

const resetCompanyForm = () => {
  companyForm.value = {
    name: '',
    industry: '',
    location: '',
    employees: '',
    founded: '',
    revenue: '',
    image: '',
    description: '',
    highlights: [''],
    contact: {
      email: '',
      phone: ''
    },
    details: {
      website: '',
      legalForm: '',
      specialties: [''],
      certifications: ['']
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Login Screen -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center">
      <div class="card p-8 w-full max-w-md">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-xl">A</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Admin-Bereich</h1>
          <p class="text-gray-600">Bitte geben Sie das Passwort ein</p>
        </div>
        
        <form @submit.prevent="authenticate" class="space-y-4">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Passwort</label>
            <div class="relative">
              <input 
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                placeholder="Passwort eingeben"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeIcon v-if="!showPassword" class="w-5 h-5" />
                <EyeSlashIcon v-else class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <button type="submit" class="w-full btn-primary">
            Anmelden
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <router-link to="/" class="text-sm text-gray-500 hover:text-gray-700">
            ← Zurück zur Startseite
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Admin Dashboard -->
    <div v-else>
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="mx-auto max-w-6xl px-4 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">A</span>
              </div>
              <h1 class="text-xl font-bold text-gray-900">Admin-Bereich</h1>
            </div>
            <div class="flex items-center space-x-4">
              <router-link to="/katalog" class="text-sm text-gray-600 hover:text-gray-900">
                Katalog ansehen
              </router-link>
              <button @click="logout" class="btn-secondary text-sm">
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </header>
      
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
                Immobilie hinzufügen
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
                Unternehmen hinzufügen
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Property Form -->
      <section v-if="activeTab === 'properties'" class="py-8">
        <div class="mx-auto max-w-4xl px-4">
          <div class="card p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HomeIcon class="w-6 h-6 mr-2 text-primary-600" />
              Neue Immobilie hinzufügen
            </h2>
            
            <form @submit.prevent="submitProperty" class="space-y-6">
              <!-- Basic Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Titel *</label>
                  <input 
                    v-model="propertyForm.title"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. Moderne Eigentumswohnung"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Typ *</label>
                  <select 
                    v-model="propertyForm.type"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Typ auswählen</option>
                    <option v-for="type in propertyTypes" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Standort *</label>
                  <input 
                    v-model="propertyForm.location"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. München-Schwabing"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Preis (€) *</label>
                  <input 
                    v-model="propertyForm.price"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. 850.000"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Größe (m²) *</label>
                  <input 
                    v-model="propertyForm.size"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. 95"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Zimmer *</label>
                  <input 
                    v-model="propertyForm.rooms"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. 3.5"
                  />
                </div>
              </div>
              
              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung *</label>
                <textarea 
                  v-model="propertyForm.description"
                  required
                  rows="4"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Detaillierte Beschreibung der Immobilie..."
                ></textarea>
              </div>
              
              <!-- Images -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bilder</label>
                <div class="space-y-2">
                  <div 
                    v-for="(image, index) in propertyForm.images" 
                    :key="index"
                    class="flex gap-2"
                  >
                    <input 
                      v-model="propertyForm.images[index]"
                      type="text"
                      class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Bild-URL oder Pfad (z.B. /WhatsApp Image...)"
                    />
                    <button 
                      v-if="propertyForm.images.length > 1"
                      type="button"
                      @click="removeImageField(propertyForm, index)"
                      class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  <button 
                    type="button"
                    @click="addImageField(propertyForm)"
                    class="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                  >
                    <PlusIcon class="w-4 h-4 mr-1" />
                    Weiteres Bild hinzufügen
                  </button>
                </div>
              </div>
              
              <!-- Features -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ausstattungsmerkmale</label>
                <div class="space-y-2">
                  <div 
                    v-for="(feature, index) in propertyForm.features" 
                    :key="index"
                    class="flex gap-2"
                  >
                    <input 
                      v-model="propertyForm.features[index]"
                      type="text"
                      class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="z.B. Hochwertige Einbauküche"
                    />
                    <button 
                      v-if="propertyForm.features.length > 1"
                      type="button"
                      @click="removeFeatureField(propertyForm, 'features', index)"
                      class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  <button 
                    type="button"
                    @click="addFeatureField(propertyForm, 'features')"
                    class="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                  >
                    <PlusIcon class="w-4 h-4 mr-1" />
                    Weiteres Merkmal hinzufügen
                  </button>
                </div>
              </div>
              
              <!-- Contact Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kontakt E-Mail *</label>
                  <input 
                    v-model="propertyForm.contact.email"
                    type="email" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="kontakt@beispiel.de"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kontakt Telefon *</label>
                  <input 
                    v-model="propertyForm.contact.phone"
                    type="tel" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+49 89 123 456"
                  />
                </div>
              </div>
              
              <!-- Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Baujahr</label>
                  <input 
                    v-model="propertyForm.details.yearBuilt"
                    type="text"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. 2018"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Zustand</label>
                  <input 
                    v-model="propertyForm.details.condition"
                    type="text"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. Neuwertig"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Heizung</label>
                  <input 
                    v-model="propertyForm.details.heating"
                    type="text"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. Fußbodenheizung"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Parkplatz</label>
                  <input 
                    v-model="propertyForm.details.parking"
                    type="text"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. Tiefgarage"
                  />
                </div>
              </div>
              
              <!-- Checkboxes -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label class="flex items-center">
                  <input 
                    v-model="propertyForm.details.garden"
                    type="checkbox"
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Garten vorhanden</span>
                </label>
                
                <label class="flex items-center">
                  <input 
                    v-model="propertyForm.details.balcony"
                    type="checkbox"
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Balkon/Terrasse</span>
                </label>
                
                <label class="flex items-center">
                  <input 
                    v-model="propertyForm.details.elevator"
                    type="checkbox"
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Aufzug vorhanden</span>
                </label>
              </div>
              
              <div class="flex gap-4">
                <button type="submit" class="btn-primary flex-1">
                  Immobilie hinzufügen
                </button>
                <button type="button" @click="resetPropertyForm" class="btn-secondary">
                  Formular zurücksetzen
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <!-- Company Form -->
      <section v-if="activeTab === 'companies'" class="py-8">
        <div class="mx-auto max-w-4xl px-4">
          <div class="card p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BuildingOfficeIcon class="w-6 h-6 mr-2 text-primary-600" />
              Neues Unternehmen hinzufügen
            </h2>
            
            <form @submit.prevent="submitCompany" class="space-y-6">
              <!-- Basic Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Firmenname *</label>
                  <input 
                    v-model="companyForm.name"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. TechStart GmbH"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Branche *</label>
                  <select 
                    v-model="companyForm.industry"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Branche auswählen</option>
                    <option v-for="industry in industries" :key="industry" :value="industry">
                      {{ industry }}
                    </option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Standort *</label>
                  <input 
                    v-model="companyForm.location"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. München-Maxvorstadt"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Mitarbeiter *</label>
                  <input 
                    v-model="companyForm.employees"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. 25-50"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Gründungsjahr *</label>
                  <input 
                    v-model="companyForm.founded"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. 2019"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Umsatz *</label>
                  <input 
                    v-model="companyForm.revenue"
                    type="text" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. 2.5M"
                  />
                </div>
              </div>
              
              <!-- Image -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Hauptbild *</label>
                <input 
                  v-model="companyForm.image"
                  type="text" 
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Bild-URL oder Pfad (z.B. /WhatsApp Image...)"
                />
              </div>
              
              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung *</label>
                <textarea 
                  v-model="companyForm.description"
                  required
                  rows="4"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Detaillierte Beschreibung des Unternehmens..."
                ></textarea>
              </div>
              
              <!-- Highlights -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
                <div class="space-y-2">
                  <div 
                    v-for="(highlight, index) in companyForm.highlights" 
                    :key="index"
                    class="flex gap-2"
                  >
                    <input 
                      v-model="companyForm.highlights[index]"
                      type="text"
                      class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="z.B. Agile Entwicklungsmethoden"
                    />
                    <button 
                      v-if="companyForm.highlights.length > 1"
                      type="button"
                      @click="removeFeatureField(companyForm, 'highlights', index)"
                      class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  <button 
                    type="button"
                    @click="addFeatureField(companyForm, 'highlights')"
                    class="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                  >
                    <PlusIcon class="w-4 h-4 mr-1" />
                    Weiteres Highlight hinzufügen
                  </button>
                </div>
              </div>
              
              <!-- Contact Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kontakt E-Mail *</label>
                  <input 
                    v-model="companyForm.contact.email"
                    type="email" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="info@unternehmen.de"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kontakt Telefon *</label>
                  <input 
                    v-model="companyForm.contact.phone"
                    type="tel" 
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+49 89 123 456"
                  />
                </div>
              </div>
              
              <!-- Additional Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input 
                    v-model="companyForm.details!.website"
                    type="text"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="www.unternehmen.de"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Rechtsform</label>
                  <input 
                    v-model="companyForm.details!.legalForm"
                    type="text"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="z.B. GmbH"
                  />
                </div>
              </div>
              
              <!-- Specialties -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Spezialisierungen</label>
                <div class="space-y-2">
                  <div 
                    v-for="(specialty, index) in companyForm.details!.specialties" 
                    :key="index"
                    class="flex gap-2"
                  >
                    <input 
                      v-model="companyForm.details!.specialties![index]"
                      type="text"
                      class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="z.B. SaaS-Entwicklung"
                    />
                    <button 
                      v-if="companyForm.details!.specialties!.length > 1"
                      type="button"
                      @click="removeFeatureField(companyForm.details!, 'specialties', index)"
                      class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  <button 
                    type="button"
                    @click="addFeatureField(companyForm.details!, 'specialties')"
                    class="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                  >
                    <PlusIcon class="w-4 h-4 mr-1" />
                    Weitere Spezialisierung hinzufügen
                  </button>
                </div>
              </div>
              
              <!-- Certifications -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Zertifizierungen</label>
                <div class="space-y-2">
                  <div 
                    v-for="(cert, index) in companyForm.details!.certifications" 
                    :key="index"
                    class="flex gap-2"
                  >
                    <input 
                      v-model="companyForm.details!.certifications![index]"
                      type="text"
                      class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="z.B. ISO 27001"
                    />
                    <button 
                      v-if="companyForm.details!.certifications!.length > 1"
                      type="button"
                      @click="removeFeatureField(companyForm.details!, 'certifications', index)"
                      class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  <button 
                    type="button"
                    @click="addFeatureField(companyForm.details!, 'certifications')"
                    class="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                  >
                    <PlusIcon class="w-4 h-4 mr-1" />
                    Weitere Zertifizierung hinzufügen
                  </button>
                </div>
              </div>
              
              <div class="flex gap-4">
                <button type="submit" class="btn-primary flex-1">
                  Unternehmen hinzufügen
                </button>
                <button type="button" @click="resetCompanyForm" class="btn-secondary">
                  Formular zurücksetzen
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <!-- Current Stats -->
      <section class="py-8 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card p-6 text-center">
              <HomeIcon class="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div class="text-2xl font-bold text-gray-900">{{ properties.length }}</div>
              <div class="text-gray-600">Immobilien im Katalog</div>
            </div>
            
            <div class="card p-6 text-center">
              <BuildingOfficeIcon class="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div class="text-2xl font-bold text-gray-900">{{ companies.length }}</div>
              <div class="text-gray-600">Unternehmen im Katalog</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300;
}

.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg;
}

.btn-secondary {
  @apply bg-white hover:bg-gray-50 text-primary-600 font-medium py-3 px-6 rounded-lg border border-primary-200 transition-all duration-200 shadow-sm hover:shadow-md;
}
</style>