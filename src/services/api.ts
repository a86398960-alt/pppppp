const API_BASE_URL = 'http://localhost:3001/api';
import { authService } from './auth';

export interface Property {
  id: number
  title: string
  type: string
  location: string
  price: string
  size: string
  rooms: string
  images: string[]
  description: string
  features: string[]
  contact: {
    email: string
    phone: string
  }
  details: {
    yearBuilt?: string
    condition?: string
    heating?: string
    parking?: string
    garden?: boolean
    balcony?: boolean
    elevator?: boolean
  }
}

export interface Company {
  id: number
  name: string
  industry: string
  location: string
  employees: string
  founded: string
  revenue: string
  images: string[]
  description: string
  highlights: string[]
  contact: {
    email: string
    phone: string
  }
  details?: {
    website?: string
    legalForm?: string
    specialties?: string[]
    certifications?: string[]
  }
}

// Properties API
export const propertiesAPI = {
  async getAll(): Promise<Property[]> {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      headers: authService.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Fehler beim Laden der Immobilien');
    return response.json();
  },

  async create(property: Omit<Property, 'id'>): Promise<Property> {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authService.getAuthHeaders(),
      },
      body: JSON.stringify(property),
    });
    if (!response.ok) throw new Error('Fehler beim Speichern der Immobilie');
    return response.json();
  },

  async update(id: number, property: Omit<Property, 'id'>): Promise<Property> {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authService.getAuthHeaders(),
      },
      body: JSON.stringify(property),
    });
    if (!response.ok) throw new Error('Fehler beim Aktualisieren der Immobilie');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: authService.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Fehler beim Löschen der Immobilie');
  }
};

// Companies API
export const companiesAPI = {
  async getAll(): Promise<Company[]> {
    const response = await fetch(`${API_BASE_URL}/companies`, {
      headers: authService.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Fehler beim Laden der Unternehmen');
    return response.json();
  },

  async create(company: Omit<Company, 'id'>): Promise<Company> {
    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authService.getAuthHeaders(),
      },
      body: JSON.stringify(company),
    });
    if (!response.ok) throw new Error('Fehler beim Speichern des Unternehmens');
    return response.json();
  },

  async update(id: number, company: Omit<Company, 'id'>): Promise<Company> {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authService.getAuthHeaders(),
      },
      body: JSON.stringify(company),
    });
    if (!response.ok) throw new Error('Fehler beim Aktualisieren des Unternehmens');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'DELETE',
      headers: authService.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Fehler beim Löschen des Unternehmens');
  }
};