<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Login Form -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p class="text-gray-600 mt-2">Melden Sie sich an, um das Admin Panel zu verwenden</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              Benutzername
            </label>
            <input
              id="username"
              v-model="loginForm.username"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Passwort
            </label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ihr Passwort"
            />
          </div>
          
          <div v-if="loginError" class="text-red-600 text-sm text-center">
            {{ loginError }}
          </div>
          
          <button
            type="submit"
            :disabled="loginLoading"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ loginLoading ? 'Anmelden...' : 'Anmelden' }}
          </button>
        </form>
        
        <div class="mt-6 p-4 bg-gray-50 rounded-md">
          <p class="text-sm text-gray-600 text-center">
            <strong>Demo-Zugangsdaten:</strong><br>
            Benutzername: admin<br>
            Passwort: password
          </p>
        </div>
      </div>
    </div>

    <!-- Admin Panel -->
    <div v-else class="admin-container">
      <div class="admin-header">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="admin-title">Admin Panel</h1>
            <p class="admin-subtitle">Verwalten Sie Immobilien und Unternehmen</p>
          </div>
          <button
            @click="handleLogout"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Abmelden
          </button>
        </div>
      </div>

      <div class="admin-tabs">
        <button 
          @click="activeTab = 'properties'" 
          :class="['tab-button', { active: activeTab === 'properties' }]"
        >
          Immobilien
        </button>
        <button 
          @click="activeTab = 'companies'" 
          :class="['tab-button', { active: activeTab === 'companies' }]"
        >
          Unternehmen
        </button>
      </div>

      <!-- Properties Tab -->
      <div v-if="activeTab === 'properties'" class="tab-content">
        <div class="form-container">
          <h2>Neue Immobilie hinzufügen</h2>
          <form @submit.prevent="addProperty" class="property-form">
            <div class="form-group">
              <label for="title">Titel:</label>
              <input 
                id="title"
                v-model="newProperty.title" 
                type="text" 
                required 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="price">Preis:</label>
              <input 
                id="price"
                v-model="newProperty.price" 
                type="text" 
                required 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="location">Standort:</label>
              <input 
                id="location"
                v-model="newProperty.location" 
                type="text" 
                required 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="type">Typ:</label>
              <select 
                id="type"
                v-model="newProperty.type" 
                required 
                class="form-input"
              >
                <option value="">Typ wählen</option>
                <option value="Wohnung">Wohnung</option>
                <option value="Haus">Haus</option>
                <option value="Gewerbe">Gewerbe</option>
                <option value="Grundstück">Grundstück</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="size">Größe:</label>
              <input 
                id="size"
                v-model="newProperty.size" 
                type="text" 
                required 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="description">Beschreibung:</label>
              <textarea 
                id="description"
                v-model="newProperty.description" 
                required 
                class="form-textarea"
              ></textarea>
            </div>
            
            <div class="form-group">
              <MultiImageUpload
                label="Immobilien-Bilder"
                v-model="newProperty.images"
              />
            </div>
            
            <button type="submit" class="submit-button" :disabled="loading">
              {{ loading ? 'Wird hinzugefügt...' : 'Immobilie hinzufügen' }}
            </button>
          </form>
        </div>

        <!-- Properties List -->
        <div class="list-container">
          <h3>Vorhandene Immobilien</h3>
          <div v-if="loading" class="loading">Lade Daten...</div>
          <div v-else-if="error" class="error">{{ error }}</div>
          <div v-else class="properties-list">
            <div v-for="property in properties" :key="property.id" class="property-item">
              <img 
                :src="property.images && property.images.length > 0 ? property.images[0] : '/placeholder-image.jpg'" 
                :alt="property.title" 
                class="property-image" 
              />
              <div class="property-info">
                <h4>{{ property.title }}</h4>
                <p class="property-price">{{ property.price }}</p>
                <p class="property-location">{{ property.location }}</p>
                <p class="property-type">{{ property.type }} • {{ property.size }}</p>
              </div>
              <button @click="deleteProperty(property.id)" class="delete-button">
                Löschen
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Companies Tab -->
      <div v-if="activeTab === 'companies'" class="tab-content">
        <div class="form-container">
          <h2>Neues Unternehmen hinzufügen</h2>
          <form @submit.prevent="addCompany" class="company-form">
            <div class="form-group">
              <label for="company-name">Name:</label>
              <input 
                id="company-name"
                v-model="newCompany.name" 
                type="text" 
                required 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="company-industry">Branche:</label>
              <input 
                id="company-industry"
                v-model="newCompany.industry" 
                type="text" 
                required 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="company-location">Standort:</label>
              <input 
                id="company-location"
                v-model="newCompany.location" 
                type="text" 
                required 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="company-description">Beschreibung:</label>
              <textarea 
                id="company-description"
                v-model="newCompany.description" 
                required 
                class="form-textarea"
              ></textarea>
            </div>
            
            <div class="form-group">
              <MultiImageUpload
                label="Firmen-Bilder"
                v-model="newCompany.images"
              />
            </div>
            
            <button type="submit" class="submit-button" :disabled="loading">
              {{ loading ? 'Wird hinzugefügt...' : 'Unternehmen hinzufügen' }}
            </button>
          </form>
        </div>

        <!-- Companies List -->
        <div class="list-container">
          <h3>Vorhandene Unternehmen</h3>
          <div v-if="loading" class="loading">Lade Daten...</div>
          <div v-else-if="error" class="error">{{ error }}</div>
          <div v-else class="companies-list">
            <div v-for="company in companies" :key="company.id" class="company-item">
              <img 
                :src="company.images && company.images.length > 0 ? company.images[0] : '/placeholder-image.jpg'" 
                :alt="company.name" 
                class="company-logo" 
              />
              <div class="company-info">
                <h4>{{ company.name }}</h4>
                <p class="company-industry">{{ company.industry }}</p>
                <p class="company-location">{{ company.location }}</p>
                <p class="company-description">{{ company.description }}</p>
              </div>
              <button @click="deleteCompany(company.id)" class="delete-button">
                Löschen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { propertiesAPI, companiesAPI } from '../services/api'
import { authService } from '../services/auth'
import MultiImageUpload from '../components/MultiImageUpload.vue'

const isAuthenticated = ref(false)
const activeTab = ref('properties')
const loading = ref(false)
const error = ref('')

// Login form
const loginForm = ref({
  username: '',
  password: ''
})
const loginLoading = ref(false)
const loginError = ref('')

// Properties data
const properties = ref([])
const newProperty = ref({
  title: '',
  price: '',
  location: '',
  type: '',
  size: '',
  description: '',
  rooms: '',
  images: [],
  features: [],
  contact: {
    email: 'info@immobilienmakler.de',
    phone: '+49 89 123 456'
  },
  details: {}
})

// Companies data
const companies = ref([])
const newCompany = ref({
  name: '',
  industry: '',
  location: '',
  description: '',
  images: [],
  employees: '',
  founded: '',
  revenue: '',
  highlights: [],
  contact: {
    email: 'info@immobilienmakler.de',
    phone: '+49 89 123 456'
  }
})

// Check authentication on mount
onMounted(async () => {
  const isValid = await authService.verifyToken()
  if (isValid) {
    isAuthenticated.value = true
    await loadProperties()
    await loadCompanies()
  }
})

// Authentication functions
async function handleLogin() {
  try {
    loginLoading.value = true
    loginError.value = ''
    
    await authService.login({
      username: loginForm.value.username,
      password: loginForm.value.password
    })
    
    isAuthenticated.value = true
    await loadProperties()
    await loadCompanies()
  } catch (err) {
    loginError.value = err instanceof Error ? err.message : 'Login fehlgeschlagen'
  } finally {
    loginLoading.value = false
  }
}

function handleLogout() {
  authService.logout()
  isAuthenticated.value = false
  properties.value = []
  companies.value = []
  loginForm.value = { username: '', password: '' }
}

// Properties functions
async function loadProperties() {
  try {
    loading.value = true
    error.value = ''
    const response = await propertiesAPI.getAll()
    properties.value = response
  } catch (err) {
    error.value = 'Fehler beim Laden der Immobilien'
    console.error('Error loading properties:', err)
  } finally {
    loading.value = false
  }
}

async function addProperty() {
  try {
    loading.value = true
    error.value = ''
    await propertiesAPI.create(newProperty.value)
    await loadProperties()
    
    // Reset form
    newProperty.value = {
      title: '',
      price: '',
      location: '',
      type: '',
      size: '',
      description: '',
      rooms: '',
      images: [],
      features: [],
      contact: {
        email: 'info@immobilienmakler.de',
        phone: '+49 89 123 456'
      },
      details: {}
    }
  } catch (err) {
    error.value = 'Fehler beim Hinzufügen der Immobilie'
    console.error('Error adding property:', err)
  } finally {
    loading.value = false
  }
}

async function deleteProperty(id: number) {
  try {
    loading.value = true
    error.value = ''
    await propertiesAPI.delete(id)
    await loadProperties()
  } catch (err) {
    error.value = 'Fehler beim Löschen der Immobilie'
    console.error('Error deleting property:', err)
  } finally {
    loading.value = false
  }
}

// Companies functions
async function loadCompanies() {
  try {
    loading.value = true
    error.value = ''
    const response = await companiesAPI.getAll()
    companies.value = response
  } catch (err) {
    error.value = 'Fehler beim Laden der Unternehmen'
    console.error('Error loading companies:', err)
  } finally {
    loading.value = false
  }
}

async function addCompany() {
  try {
    loading.value = true
    error.value = ''
    await companiesAPI.create(newCompany.value)
    await loadCompanies()
    
    // Reset form
    newCompany.value = {
      name: '',
      industry: '',
      location: '',
      description: '',
      images: [],
      employees: '',
      founded: '',
      revenue: '',
      highlights: [],
      contact: {
        email: 'info@immobilienmakler.de',
        phone: '+49 89 123 456'
      }
    }
  } catch (err) {
    error.value = 'Fehler beim Hinzufügen des Unternehmens'
    console.error('Error adding company:', err)
  } finally {
    loading.value = false
  }
}

async function deleteCompany(id: number) {
  try {
    loading.value = true
    error.value = ''
    await companiesAPI.delete(id)
    await loadCompanies()
  } catch (err) {
    error.value = 'Fehler beim Löschen des Unternehmens'
    console.error('Error deleting company:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.admin-header {
  margin-bottom: 2rem;
}

.admin-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.admin-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
}

.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-button.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-button:hover {
  color: #3b82f6;
}

.tab-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.form-container {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.property-form,
.company-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-button {
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: #2563eb;
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.list-container {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.list-container h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.properties-list,
.companies-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.property-item,
.company-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  transition: box-shadow 0.2s;
}

.property-item:hover,
.company-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.property-image,
.company-logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.375rem;
}

.property-info,
.company-info {
  flex: 1;
}

.property-info h4,
.company-info h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.property-price {
  font-size: 1.125rem;
  font-weight: 600;
  color: #059669;
  margin-bottom: 0.25rem;
}

.property-location,
.property-type,
.company-industry,
.company-location,
.company-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.delete-button {
  background: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background: #dc2626;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #ef4444;
  background: #fef2f2;
  border-radius: 0.375rem;
}

@media (max-width: 768px) {
  .tab-content {
    grid-template-columns: 1fr;
  }
  
  .property-item,
  .company-item {
    flex-direction: column;
    text-align: center;
  }
  
  .property-image,
  .company-logo {
    width: 120px;
    height: 120px;
  }
}
</style>