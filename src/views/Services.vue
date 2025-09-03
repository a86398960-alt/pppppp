<script setup lang="ts">
import { 
  HomeIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  ScaleIcon
} from '@heroicons/vue/24/outline'

const services = [
  {
    icon: BuildingOfficeIcon,
    title: 'Gewerbeimmobilien-Vermittlung',
    description: 'Spezialisiert auf die Vermittlung von Bürogebäuden, Produktionsstätten, Lagerhallen und Einzelhandelsflächen für Unternehmen.',
    features: [
      'Standortanalyse für Unternehmen',
      'Gewerbeimmobilien-Portfolio',
      'Mietvertragsverhandlungen',
      'Expansionsberatung'
    ],
    image: '/WhatsApp Image 2025-09-01 at 21.35.38 (1).jpeg'
  },
  {
    icon: UserGroupIcon,
    title: 'Firmenvermittlung & Nachfolge',
    description: 'Unterstützung bei Firmenübernahmen, Nachfolgeregelungen und strategischen Unternehmenskäufen.',
    features: [
      'Unternehmensbewertung',
      'Nachfolgeplanung',
      'Due Diligence Begleitung',
      'Vertragsverhandlungen'
    ],
    image: '/WhatsApp Image 2025-09-01 at 21.28.14.jpeg'
  },
  {
    icon: ChartBarIcon,
    title: 'Unternehmensbewertung',
    description: 'Professionelle Bewertung von Unternehmen nach anerkannten Standards für Verkauf, Kauf oder Nachfolge.',
    features: [
      'Ertragswertverfahren',
      'Substanzwertermittlung',
      'Marktvergleichsverfahren',
      'Gutachten für Banken'
    ],
    image: '/WhatsApp Image 2025-09-01 at 21.33.23 (1).jpeg'
  },
  {
    icon: DocumentTextIcon,
    title: 'Verkaufsexposés',
    description: 'Professionelle Verkaufsexposés mit allen wichtigen Daten sind essentiell für erfolgreiche Immobilientransaktionen.',
    features: [
      'Vollständige Objektdokumentation',
      'Professionelle Fotografie',
      'Marktgerechte Präsentation',
      'Digitale und Print-Versionen'
    ],
    image: '/WhatsApp Image 2025-09-01 at 21.35.38.jpeg'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Finanzierungsvermittlung',
    description: 'Durch unsere guten Kontakte zu Kreditinstituten finden wir die optimale Finanzierung und öffentliche Förderungen für Sie.',
    features: [
      'Bankenkontakte nutzen',
      'Förderungen identifizieren',
      'Konditionsvergleich',
      'Finanzierungsberatung'
    ],
    image: '/WhatsApp Image 2025-09-01 at 21.33.23.jpeg'
  },
  {
    icon: ScaleIcon,
    title: 'Rechtsberatung',
    description: 'Juristische Unterstützung bei Immobilien- und Unternehmenstransaktionen durch unsere Partnerkanzleien.',
    features: [
      'Vertragsgestaltung',
      'Rechtsprüfung',
      'Notartermine koordinieren',
      'Haftungsminimierung'
    ],
    image: '/WhatsApp Image 2025-09-01 at 21.33.23 copy.jpeg'
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
      <div class="mx-auto max-w-6xl px-4">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Unsere Dienstleistungen
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Professionelle Immobilien- und Firmenvermittlung mit umfassendem Service. 
            Von der Bewertung bis zum Notarvertrag begleiten wir Sie durch den gesamten Prozess.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Services Grid -->
    <section class="py-12 bg-white">
      <div class="mx-auto max-w-6xl px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="service in services" 
            :key="service.title"
            class="card overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="relative overflow-hidden h-48">
              <img 
                :src="service.image" 
                :alt="service.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <div class="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <component :is="service.icon" class="w-5 h-5 text-primary-600" />
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                {{ service.title }}
              </h3>
              
              <p class="text-gray-600 mb-6 leading-relaxed">{{ service.description }}</p>
              
              <ul class="space-y-2">
                <li 
                  v-for="feature in service.features" 
                  :key="feature"
                  class="flex items-center text-sm text-gray-500"
                >
                  <div class="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Process Section -->
    <section class="py-12 bg-gray-50">
      <div class="mx-auto max-w-6xl px-4">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Unser Prozess
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            So läuft eine erfolgreiche Vermittlung ab
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">1</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Erstberatung</h3>
            <p class="text-gray-600 text-sm">Kostenlose Analyse Ihrer Situation und Ziele</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">2</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Bewertung</h3>
            <p class="text-gray-600 text-sm">Professionelle Marktbewertung Ihrer Immobilie oder Firma</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">3</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Vermarktung</h3>
            <p class="text-gray-600 text-sm">Zielgerichtete Vermarktung an qualifizierte Interessenten</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">4</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Abschluss</h3>
            <p class="text-gray-600 text-sm">Begleitung bis zur erfolgreichen Übergabe</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-12 bg-white">
      <div class="mx-auto max-w-4xl px-4 text-center">
        <div class="card p-8 bg-gradient-to-br from-primary-50 to-white">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Bereit für Ihr Projekt?
          </h2>
          <p class="text-gray-600 mb-6">
            Kontaktieren Sie uns für eine kostenlose Erstberatung und lassen Sie uns gemeinsam 
            die beste Lösung für Ihre Immobilie oder Ihr Unternehmen finden.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/kontakt" class="btn-primary">
              Kostenlose Beratung anfragen
            </router-link>
            <router-link to="/katalog" class="btn-secondary">
              Aktuelle Angebote ansehen
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>