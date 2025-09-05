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

export const companies: Company[] = [
  {
    id: 1,
    name: 'TechStart GmbH',
    industry: 'Software Development',
    location: 'München-Maxvorstadt',
    employees: '25-50',
    founded: '2019',
    revenue: '2.5M',
    images: ['/WhatsApp Image 2025-09-01 at 21.28.14.jpeg'],
    description: 'Innovative Software-Entwicklung für digitale Lösungen im B2B-Bereich',
    highlights: [
      'Agile Entwicklungsmethoden',
      'Cloud-native Architektur',
      'Internationale Kunden',
      'Starkes Wachstum (+40% p.a.)'
    ],
    contact: {
      email: 'info@techstart.de',
      phone: '+49 89 123 456'
    },
    details: {
      website: 'www.techstart.de',
      legalForm: 'GmbH',
      specialties: ['SaaS-Entwicklung', 'Mobile Apps', 'Cloud-Integration'],
      certifications: ['ISO 27001', 'GDPR-konform']
    }
  },
  {
    id: 2,
    name: 'Baumeister & Co KG',
    industry: 'Baugewerbe',
    location: 'München-Sendling',
    employees: '100-200',
    founded: '1995',
    revenue: '15M',
    images: ['/WhatsApp Image 2025-09-01 at 21.33.23.jpeg'],
    description: 'Traditionelles Bauunternehmen mit moderner Ausrichtung und nachhaltigen Konzepten',
    highlights: [
      '30 Jahre Erfahrung',
      'Nachhaltige Bauweise',
      'Komplettlösungen',
      'Zertifizierte Qualität'
    ],
    contact: {
      email: 'kontakt@baumeister-co.de',
      phone: '+49 89 234 567'
    },
    details: {
      legalForm: 'KG',
      specialties: ['Wohnungsbau', 'Gewerbebau', 'Sanierung'],
      certifications: ['DGNB Gold', 'Handwerkskammer München']
    }
  },
  {
    id: 3,
    name: 'Green Energy Solutions',
    industry: 'Erneuerbare Energien',
    location: 'München-Schwabing',
    employees: '50-75',
    founded: '2015',
    revenue: '8M',
    images: ['/WhatsApp Image 2025-09-01 at 21.35.38.jpeg'],
    description: 'Spezialist für nachhaltige Energielösungen und Smart Grid Technologien',
    highlights: [
      'Photovoltaik-Anlagen',
      'Energieberatung',
      'Smart Grid Technologie',
      'CO2-neutral zertifiziert'
    ],
    contact: {
      email: 'info@green-energy.de',
      phone: '+49 89 345 678'
    },
    details: {
      legalForm: 'GmbH',
      specialties: ['Solarenergie', 'Windkraft', 'Energiespeicher'],
      certifications: ['TÜV-zertifiziert', 'B-Corp']
    }
  },
  {
    id: 4,
    name: 'Logistik Pro GmbH',
    industry: 'Logistik & Transport',
    location: 'München-Riem',
    employees: '75-100',
    founded: '2010',
    revenue: '12M',
    images: ['/WhatsApp Image 2025-09-01 at 21.35.38 (1).jpeg'],
    description: 'Moderne Logistiklösungen für den E-Commerce mit automatisierten Prozessen',
    highlights: [
      'Automatisierte Lager',
      'Same-Day Delivery',
      'Nachhaltige Flotte',
      'KI-gestützte Routenoptimierung'
    ],
    contact: {
      email: 'service@logistik-pro.de',
      phone: '+49 89 456 789'
    },
    details: {
      legalForm: 'GmbH',
      specialties: ['E-Commerce Fulfillment', 'B2B-Logistik', 'Lagerautomatisierung'],
      certifications: ['ISO 9001', 'AEO-zertifiziert']
    }
  },
  {
    id: 5,
    name: 'MedTech Innovations',
    industry: 'Medizintechnik',
    location: 'München-Bogenhausen',
    employees: '30-50',
    founded: '2018',
    revenue: '5M',
    images: ['/WhatsApp Image 2025-09-01 at 21.33.23 (1).jpeg'],
    description: 'Entwicklung innovativer Medizingeräte für die moderne Diagnostik',
    highlights: [
      'FDA-zugelassene Produkte',
      'Forschung & Entwicklung',
      'Internationale Märkte',
      'Patentierte Technologien'
    ],
    contact: {
      email: 'info@medtech-innovations.de',
      phone: '+49 89 567 890'
    },
    details: {
      legalForm: 'GmbH',
      specialties: ['Diagnostikgeräte', 'Bildgebung', 'KI-Diagnostik'],
      certifications: ['CE-Kennzeichnung', 'ISO 13485']
    }
  },
  {
    id: 6,
    name: 'Gastro Excellence',
    industry: 'Gastronomie',
    location: 'München-Altstadt',
    employees: '20-30',
    founded: '2012',
    revenue: '3M',
    images: ['/WhatsApp Image 2025-09-01 at 21.35.38 (1) copy.jpeg'],
    description: 'Premium Gastronomie-Konzepte mit regionaler Küche und nachhaltigen Zutaten',
    highlights: [
      'Mehrere Standorte',
      'Regionale Bio-Küche',
      'Zero-Waste Konzept',
      'Michelin-empfohlen'
    ],
    contact: {
      email: 'info@gastro-excellence.de',
      phone: '+49 89 678 901'
    },
    details: {
      legalForm: 'GmbH & Co. KG',
      specialties: ['Fine Dining', 'Catering', 'Event-Gastronomie'],
      certifications: ['Bio-zertifiziert', 'Dehoga-Mitglied']
    }
  },
  {
    id: 6,
    name: 'Gastro Excellence',
    industry: 'Gastronomie',
    location: 'München-Altstadt',
    employees: '20-30',
    founded: '2012',
    revenue: '3M',
    images: ['/WhatsApp Image 2025-09-01 at 21.35.38 (1) copy.jpeg'],
    description: 'Premium Gastronomie-Konzepte mit regionaler Küche und nachhaltigen Zutaten',
    highlights: [
      'Mehrere Standorte',
      'Regionale Bio-Küche',
      'Zero-Waste Konzept',
      'Michelin-empfohlen'
    ],
    contact: {
      email: 'info@gastro-excellence.de',
      phone: '+49 89 678 901'
    },
    details: {
      legalForm: 'GmbH & Co. KG',
      specialties: ['Fine Dining', 'Catering', 'Event-Gastronomie'],
      certifications: ['Bio-zertifiziert', 'Dehoga-Mitglied']
    }
  },
  {
    id: 6,
    name: 'Gastro Excellence',
    industry: 'Gastronomie',
    location: 'München-Altstadt',
    employees: '20-30',
    founded: '2012',
    revenue: '3M',
    images: ['/WhatsApp Image 2025-09-01 at 21.35.38 (1) copy.jpeg'],
    description: 'Premium Gastronomie-Konzepte mit regionaler Küche und nachhaltigen Zutaten',
    highlights: [
      'Mehrere Standorte',
      'Regionale Bio-Küche',
      'Zero-Waste Konzept',
      'Michelin-empfohlen'
    ],
    contact: {
      email: 'info@gastro-excellence.de',
      phone: '+49 89 678 901'
    },
    details: {
      legalForm: 'GmbH & Co. KG',
      specialties: ['Fine Dining', 'Catering', 'Event-Gastronomie'],
      certifications: ['Bio-zertifiziert', 'Dehoga-Mitglied']
    }
  },
  {
    id: 6,
    name: 'Gastro Excellence',
    industry: 'Gastronomie',
    location: 'München-Altstadt',
    employees: '20-30',
    founded: '2012',
    revenue: '3M',
    images: ['/WhatsApp Image 2025-09-01 at 21.35.38 (1) copy.jpeg'],
    description: 'Premium Gastronomie-Konzepte mit regionaler Küche und nachhaltigen Zutaten',
    highlights: [
      'Mehrere Standorte',
      'Regionale Bio-Küche',
      'Zero-Waste Konzept',
      'Michelin-empfohlen'
    ],
    contact: {
      email: 'info@gastro-excellence.de',
      phone: '+49 89 678 901'
    },
    details: {
      legalForm: 'GmbH & Co. KG',
      specialties: ['Fine Dining', 'Catering', 'Event-Gastronomie'],
      certifications: ['Bio-zertifiziert', 'Dehoga-Mitglied']
    }
  }
]

// Helper function to add new companies easily
export const addCompany = (newCompany: Omit<Company, 'id'>): Company => {
  const maxId = Math.max(...companies.map(c => c.id))
  const company: Company = {
    ...newCompany,
    id: maxId + 1
  }
  companies.push(company)
  return company
}

// Helper function to get companies by industry
export const getCompaniesByIndustry = (industry: string): Company[] => {
  return companies.filter(c => c.industry === industry)
}

// Helper function to get all industries
export const getAllIndustries = (): string[] => {
  return [...new Set(companies.map(c => c.industry))].sort()
}