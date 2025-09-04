import { ref, onMounted } from 'vue'
import { propertiesAPI, companiesAPI, type Property, type Company } from '../services/api'

export function useProperties() {
  const properties = ref<Property[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadProperties = async () => {
    loading.value = true
    error.value = null
    try {
      properties.value = await propertiesAPI.getAll()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unbekannter Fehler'
      console.error('Fehler beim Laden der Immobilien:', err)
    } finally {
      loading.value = false
    }
  }

  const addProperty = async (property: Omit<Property, 'id'>) => {
    try {
      const newProperty = await propertiesAPI.create(property)
      properties.value.push(newProperty)
      return newProperty
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Fehler beim Hinzufügen'
      throw err
    }
  }

  const updateProperty = async (id: number, property: Omit<Property, 'id'>) => {
    try {
      const updatedProperty = await propertiesAPI.update(id, property)
      const index = properties.value.findIndex(p => p.id === id)
      if (index !== -1) {
        properties.value[index] = updatedProperty
      }
      return updatedProperty
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Fehler beim Aktualisieren'
      throw err
    }
  }

  const deleteProperty = async (id: number) => {
    try {
      await propertiesAPI.delete(id)
      properties.value = properties.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Fehler beim Löschen'
      throw err
    }
  }

  onMounted(() => {
    loadProperties()
  })

  return {
    properties,
    loading,
    error,
    loadProperties,
    addProperty,
    updateProperty,
    deleteProperty
  }
}

export function useCompanies() {
  const companies = ref<Company[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadCompanies = async () => {
    loading.value = true
    error.value = null
    try {
      companies.value = await companiesAPI.getAll()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unbekannter Fehler'
      console.error('Fehler beim Laden der Unternehmen:', err)
    } finally {
      loading.value = false
    }
  }

  const addCompany = async (company: Omit<Company, 'id'>) => {
    try {
      const newCompany = await companiesAPI.create(company)
      companies.value.push(newCompany)
      return newCompany
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Fehler beim Hinzufügen'
      throw err
    }
  }

  const updateCompany = async (id: number, company: Omit<Company, 'id'>) => {
    try {
      const updatedCompany = await companiesAPI.update(id, company)
      const index = companies.value.findIndex(c => c.id === id)
      if (index !== -1) {
        companies.value[index] = updatedCompany
      }
      return updatedCompany
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Fehler beim Aktualisieren'
      throw err
    }
  }

  const deleteCompany = async (id: number) => {
    try {
      await companiesAPI.delete(id)
      companies.value = companies.value.filter(c => c.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Fehler beim Löschen'
      throw err
    }
  }

  onMounted(() => {
    loadCompanies()
  })

  return {
    companies,
    loading,
    error,
    loadCompanies,
    addCompany,
    updateCompany,
    deleteCompany
  }
}