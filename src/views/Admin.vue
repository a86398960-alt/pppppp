<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Login Form -->
      <div v-if="!isAuthenticated" class="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Passwort
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Admin-Passwort eingeben"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Anmelden
          </button>
          <p v-if="loginError" class="text-red-600 text-sm text-center">{{ loginError }}</p>
        </form>
      </div>

      <!-- Admin Dashboard -->
      <div v-else class="space-y-8">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              @click="logout"
              class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>

        <!-- Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Immobilien</h3>
            <p class="text-3xl font-bold text-blue-600">{{ properties.length }}</p>
            <p class="text-gray-600">Einträge im Katalog</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Unternehmen</h3>
            <p class="text-3xl font-bold text-green-600">{{ companies.length }}</p>
            <p class="text-gray-600">Einträge im Katalog</p>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8 px-6">
              <button
                @click="activeTab = 'properties'"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm',
                  activeTab === 'properties'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Immobilie hinzufügen
              </button>
              <button
                @click="activeTab = 'companies'"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm',
                  activeTab === 'companies'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Unternehmen hinzufügen
              </button>
            </nav>
          </div>

          <!-- Property Form -->
          <div v-if="activeTab === 'properties'" class="p-6">
            <form @submit.prevent="addProperty" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Titel *</label>
                  <input
                    v-model="propertyForm.title"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Typ *</label>
                  <select
                    v-model="propertyForm.type"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Typ auswählen</option>
                    <option value="Wohnung">Wohnung</option>
                    <option value="Haus">Haus</option>
                    <option value="Büro">Büro</option>
                    <option value="Gewerbe">Gewerbe</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Standort *</label>
                  <input
                    v-model="propertyForm.location"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Preis *</label>
                  <input
                    v-model="propertyForm.price"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="z.B. 450.000 €"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Größe *</label>
                  <input
                    v-model="propertyForm.size"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="z.B. 120 m²"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Zimmer *</label>
                  <input
                    v-model="propertyForm.rooms"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="z.B. 4 Zimmer"
                  />
                </div>
              </div>

              <!-- Images -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bilder (URLs)</label>
                <div class="space-y-2">
                  <div v-for="(image, index) in propertyForm.images" :key="index" class="flex gap-2">
                    <input
                      v-model="propertyForm.images[index]"
                      type="url"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      @click="removePropertyImage(index)"
                      class="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addPropertyImage"
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    + Bild hinzufügen
                  </button>
                </div>
              </div>

              <!-- Features -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ausstattung</label>
                <div class="space-y-2">
                  <div v-for="(feature, index) in propertyForm.features" :key="index" class="flex gap-2">
                    <input
                      v-model="propertyForm.features[index]"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="z.B. Balkon, Garage, etc."
                    />
                    <button
                      type="button"
                      @click="removePropertyFeature(index)"
                      class="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addPropertyFeature"
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    + Ausstattung hinzufügen
                  </button>
                </div>
              </div>

              <!-- Contact -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kontakt Name *</label>
                  <input
                    v-model="propertyForm.contact.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                  <input
                    v-model="propertyForm.contact.phone"
                    type="tel"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">E-Mail *</label>
                  <input
                    v-model="propertyForm.contact.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Unternehmen</label>
                  <input
                    v-model="propertyForm.contact.company"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <!-- Additional Details -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Baujahr</label>
                  <input
                    v-model="propertyForm.yearBuilt"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Zustand</label>
                  <select
                    v-model="propertyForm.condition"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Zustand auswählen</option>
                    <option value="Neubau">Neubau</option>
                    <option value="Sehr gut">Sehr gut</option>
                    <option value="Gut">Gut</option>
                    <option value="Renovierungsbedürftig">Renovierungsbedürftig</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Heizung</label>
                  <input
                    v-model="propertyForm.heating"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="z.B. Gasheizung"
                  />
                </div>
              </div>

              <!-- Checkboxes -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label class="flex items-center">
                  <input v-model="propertyForm.hasGarden" type="checkbox" class="mr-2" />
                  <span class="text-sm text-gray-700">Garten</span>
                </label>
                <label class="flex items-center">
                  <input v-model="propertyForm.hasBalcony" type="checkbox" class="mr-2" />
                  <span class="text-sm text-gray-700">Balkon</span>
                </label>
                <label class="flex items-center">
                  <input v-model="propertyForm.hasElevator" type="checkbox" class="mr-2" />
                  <span class="text-sm text-gray-700">Aufzug</span>
                </label>
                <label class="flex items-center">
                  <input v-model="propertyForm.hasParking" type="checkbox" class="mr-2" />
                  <span class="text-sm text-gray-700">Parkplatz</span>
                </label>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {{ isLoading ? 'Wird hinzugefügt...' : 'Immobilie hinzufügen' }}
              </button>
            </form>
          </div>

          <!-- Company Form -->
          <div v-if="activeTab === 'companies'" class="p-6">
            <form @submit.prevent="addCompany" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Firmenname *</label>
                  <input
                    v-model="companyForm.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Branche *</label>
                  <input
                    v-model="companyForm.industry"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Standort *</label>
                  <input
                    v-model="companyForm.location"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Mitarbeiter</label>
                  <input
                    v-model="companyForm.employees"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="z.B. 50-100"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Gegründet</label>
                  <input
                    v-model="companyForm.founded"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    v-model="companyForm.website"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung *</label>
                <textarea
                  v-model="companyForm.description"
                  required
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <!-- Highlights -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
                <div class="space-y-2">
                  <div v-for="(highlight, index) in companyForm.highlights" :key="index" class="flex gap-2">
                    <input
                      v-model="companyForm.highlights[index]"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="z.B. Marktführer in der Region"
                    />
                    <button
                      type="button"
                      @click="removeCompanyHighlight(index)"
                      class="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addCompanyHighlight"
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    + Highlight hinzufügen
                  </button>
                </div>
              </div>

              <!-- Specializations -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Spezialisierungen</label>
                <div class="space-y-2">
                  <div v-for="(spec, index) in companyForm.specializations" :key="index" class="flex gap-2">
                    <input
                      v-model="companyForm.specializations[index]"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="z.B. Digitale Transformation"
                    />
                    <button
                      type="button"
                      @click="removeCompanySpecialization(index)"
                      class="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addCompanySpecialization"
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    + Spezialisierung hinzufügen
                  </button>
                </div>
              </div>

              <!-- Contact -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kontakt Name *</label>
                  <input
                    v-model="companyForm.contact.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                  <input
                    v-model="companyForm.contact.phone"
                    type="tel"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">E-Mail *</label>
                  <input
                    v-model="companyForm.contact.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    v-model="companyForm.contact.position"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {{ isLoading ? 'Wird hinzugefügt...' : 'Unternehmen hinzufügen' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useData } from '../composables/useData'
import { propertiesAPI, companiesAPI } from '../services/api'

const { properties, companies, loadData } = useData()

const isAuthenticated = ref(false)
const password = ref('')
const loginError = ref('')
const activeTab = ref('properties')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Property Form
const propertyForm = ref({
  title: '',
  type: '',
  location: '',
  price: '',
  size: '',
  rooms: '',
  images: [''],
  features: [''],
  contact: {
    name: '',
    phone: '',
    email: '',
    company: ''
  },
  yearBuilt: null,
  condition: '',
  heating: '',
  hasGarden: false,
  hasBalcony: false,
  hasElevator: false,
  hasParking: false
})

// Company Form
const companyForm = ref({
  name: '',
  industry: '',
  location: '',
  employees: '',
  founded: null,
  website: '',
  description: '',
  highlights: [''],
  specializations: [''],
  contact: {
    name: '',
    phone: '',
    email: '',
    position: ''
  }
})

const login = () => {
  if (password.value === 'admin123') {
    isAuthenticated.value = true
    loginError.value = ''
  } else {
    loginError.value = 'Falsches Passwort'
  }
}

const logout = () => {
  isAuthenticated.value = false
  password.value = ''
}

const addPropertyImage = () => {
  propertyForm.value.images.push('')
}

const removePropertyImage = (index: number) => {
  propertyForm.value.images.splice(index, 1)
}

const addPropertyFeature = () => {
  propertyForm.value.features.push('')
}

const removePropertyFeature = (index: number) => {
  propertyForm.value.features.splice(index, 1)
}

const addCompanyHighlight = () => {
  companyForm.value.highlights.push('')
}

const removeCompanyHighlight = (index: number) => {
  companyForm.value.highlights.splice(index, 1)
}

const addCompanySpecialization = () => {
  companyForm.value.specializations.push('')
}

const removeCompanySpecialization = (index: number) => {
  companyForm.value.specializations.splice(index, 1)
}

const addProperty = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    // Filter out empty images and features
    const cleanedProperty = {
      ...propertyForm.value,
      images: propertyForm.value.images.filter(img => img.trim() !== ''),
      features: propertyForm.value.features.filter(feature => feature.trim() !== '')
    }

    await propertiesAPI.create(cleanedProperty)
    await loadData()
    
    successMessage.value = 'Immobilie erfolgreich hinzugefügt!'
    setTimeout(() => { successMessage.value = '' }, 3000)
    
    // Reset form
    propertyForm.value = {
      title: '',
      type: '',
      location: '',
      price: '',
      size: '',
      rooms: '',
      images: [''],
      features: [''],
      contact: {
        name: '',
        phone: '',
        email: '',
        company: ''
      },
      yearBuilt: null,
      condition: '',
      heating: '',
      hasGarden: false,
      hasBalcony: false,
      hasElevator: false,
      hasParking: false
    }
  } catch (error) {
    errorMessage.value = 'Fehler beim Hinzufügen der Immobilie'
    console.error('Error adding property:', error)
  } finally {
    isLoading.value = false
  }
}

const addCompany = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    // Filter out empty highlights and specializations
    const cleanedCompany = {
      ...companyForm.value,
      highlights: companyForm.value.highlights.filter(highlight => highlight.trim() !== ''),
      specializations: companyForm.value.specializations.filter(spec => spec.trim() !== '')
    }

    await companiesAPI.create(cleanedCompany)
    await loadData()
    
    successMessage.value = 'Unternehmen erfolgreich hinzugefügt!'
    setTimeout(() => { successMessage.value = '' }, 3000)
    
    // Reset form
    companyForm.value = {
      name: '',
      industry: '',
      location: '',
      employees: '',
      founded: null,
      website: '',
      description: '',
      highlights: [''],
      specializations: [''],
      contact: {
        name: '',
        phone: '',
        email: '',
        position: ''
      }
    }
  } catch (error) {
    errorMessage.value = 'Fehler beim Hinzufügen des Unternehmens'
    console.error('Error adding company:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>