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

export const properties: Property[] = [
  {
    id: 1,
    title: 'Moderne Eigentumswohnung',
    type: 'Eigentumswohnung',
    location: 'München-Schwabing',
    price: '850.000',
    size: '95',
    rooms: '3.5',
    images: [
      '/WhatsApp Image 2025-09-01 at 21.35.38 (1).jpeg',
      '/WhatsApp Image 2025-09-01 at 21.28.14.jpeg',
      '/WhatsApp Image 2025-09-01 at 21.33.23.jpeg',
      '/WhatsApp Image 2025-09-01 at 21.35.38.jpeg'
    ],
    description: 'Exklusive 3,5-Zimmer-Wohnung in begehrter Lage von München-Schwabing. Hochwertige Ausstattung, moderne Küche und großzügiger Balkon mit Südausrichtung.',
    features: [
      'Hochwertige Einbauküche',
      'Parkett in allen Räumen',
      'Fußbodenheizung',
      'Tiefgaragenstellplatz',
      'Balkon mit Südausrichtung',
      'Aufzug vorhanden'
    ],
    contact: {
      email: 'wohnung@immobilienmakler.de',
      phone: '+49 89 123 456'
    },
    details: {
      yearBuilt: '2018',
      condition: 'Neuwertig',
      heating: 'Fußbodenheizung',
      parking: 'Tiefgarage',
      balcony: true,
      elevator: true
    }
  },
  {
    id: 2,
    title: 'Einfamilienhaus mit Garten',
    type: 'Einfamilienhaus',
    location: 'München-Bogenhausen',
    price: '1.250.000',
    size: '140',
    rooms: '5',
    images: [
      '/WhatsApp Image 2025-09-01 at 21.33.23 (1).jpeg',
      '/WhatsApp Image 2025-09-01 at 21.35.38 (1) copy.jpeg',
      '/WhatsApp Image 2025-09-01 at 21.33.23 copy.jpeg',
      '/WhatsApp Image 2025-09-01 at 21.28.14.jpeg'
    ],
    description: 'Charmantes Einfamilienhaus in ruhiger Wohnlage mit großem Garten. Perfekt für Familien mit viel Platz und Gestaltungsmöglichkeiten.',
    features: [
      'Großer Garten (400m²)',
      'Offener Wohn-/Essbereich',
      'Moderne Küche',
      'Gäste-WC',
      'Keller mit Hobbyraum',
      'Carport für 2 Fahrzeuge'
    ],
    contact: {
      email: 'haus@immobilienmakler.de',
      phone: '+49 89 234 567'
    },
    details: {
      yearBuilt: '1995',
      condition: 'Renoviert',
      heating: 'Gasheizung',
      parking: 'Carport',
      garden: true,
      elevator: false
    }
  },
  {
    id: 3,
    title: 'Penthouse mit Dachterrasse',
    type: 'Penthouse',
    location: 'München-Maxvorstadt',
    price: '1.850.000',
    size: '120',
    rooms: '4',
    images: [
      '/WhatsApp Image 2025-09-01 at 21.35.38.jpeg',
      '/WhatsApp Image 2025-09-01 at 21.35.38 (1).jpeg',
      '/WhatsApp Image 2025-09-01 at 21.33.23.jpeg',
      '/WhatsApp Image 2025-09-01 at 21.28.14.jpeg'
    ],
    description: 'Luxuriöses Penthouse mit spektakulärer Dachterrasse und Panoramablick über München. Exklusive Ausstattung auf höchstem Niveau.',
    features: [
      'Dachterrasse (80m²)',
      'Panoramablick',
      'Designerküche',
      'Master-Suite mit Ankleide',
      'Smart Home System',
      'Concierge Service'
    ],
    contact: {
      email: 'penthouse@immobilienmakler.de',
      phone: '+49 89 345 678'
    },
    details: {
      yearBuilt: '2020',
      condition: 'Neubau',
      heating: 'Fernwärme',
      parking: 'Tiefgarage',
      balcony: true,
      elevator: true
    }
  },
  {
    id: 4,
    title: 'Bürogebäude im Zentrum',
    type: 'Gewerbeimmobilie',
    location: 'München-Altstadt',
    price: '3.200.000',
    size: '450',
    rooms: '12',
    images: [
      '/WhatsApp Image 2025-09-01 at 21.33.23 copy.jpeg',
      '/WhatsApp Image 2025-09-01 at 21.35.38 (1) copy.jpeg',
      '/WhatsApp Image 2025-09-01 at 21.33.23 (1).jpeg',
      '/WhatsApp Image 2025-09-01 at 21.35.38.jpeg'
    ],
    description: 'Repräsentatives Bürogebäude in zentraler Lage der Münchner Altstadt. Ideal für Unternehmen, die Wert auf Prestige und Erreichbarkeit legen.',
    features: [
      'Zentrale Innenstadtlage',
      'Flexible Raumaufteilung',
      'Moderne Haustechnik',
      'Klimaanlage',
      'Aufzug',
      'Parkplätze verfügbar'
    ],
    contact: {
      email: 'gewerbe@immobilienmakler.de',
      phone: '+49 89 456 789'
    },
    details: {
      yearBuilt: '2010',
      condition: 'Sehr gut',
      heating: 'Fernwärme',
      parking: 'Öffentliche Parkplätze',
      elevator: true
    }
  }
]

export const getAllPropertyTypes = (): string[] => {
  return [...new Set(properties.map(p => p.type))].sort()
}