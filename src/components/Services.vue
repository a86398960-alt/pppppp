<script setup lang="ts">
import { 
  HomeIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'

const services = [
  {
    icon: HomeIcon,
    title: 'Immobilienvermittlung',
    description: 'Wir bieten Ihr Objekt unseren Kunden an und schalten bei Bedarf Verkaufsanzeigen. Besichtigungen erfolgen nur mit solventen, bonitätsgeprüften Interessenten.',
    features: [
      'Professionelle Objektpräsentation',
      'Bonitätsprüfung der Interessenten',
      'Überregionale Vermarktung',
      'Betreuung von Verkäufer und Käufer'
    ]
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Veräußerungsalternativen',
    description: 'Schwer verkäufliche Immobilien durch ungünstige Aufteilung? Wir entwickeln Umbauvorschläge mit detaillierten Kostenaufstellungen.',
    features: [
      'Analyse der aktuellen Situation',
      'Umbauvorschläge entwickeln',
      'Kostenaufstellungen erstellen',
      'Zusammenarbeit mit Architekten'
    ]
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
    ]
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
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Versicherungen & Analyse',
    description: 'Immobilien müssen richtig versichert sein. Wir arbeiten mit unabhängigen Maklerbüros für optimalen Schutz.',
    features: [
      'Versicherungsanalyse',
      'Unabhängige Beratung',
      'Schadensabwicklung',
      'Risikobewertung'
    ]
  },
  {
    icon: PresentationChartLineIcon,
    title: 'Nutzungsalternativen',
    description: 'Optimierung nicht optimal nutzbarer Immobilien durch Umbau, Vergrößerung oder Verkleinerung mit Kostenaufstellungen.',
    features: [
      'Nutzungsanalyse',
      'Optimierungsvorschläge',
      'Machbarkeitsstudien',
      'Wirtschaftlichkeitsrechnung'
    ]
  }
]
</script>

<template>
  <section id="services" class="py-12 bg-white">
    <div class="mx-auto max-w-6xl px-4">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Unsere Dienstleistungen
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Umfassende Betreuung rund um Ihre Immobilie - von der ersten Beratung bis zum erfolgreichen Abschluss
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="service in services" 
          :key="service.title"
          class="card p-6 group"
        >
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
              <component :is="service.icon" class="w-5 h-5 text-primary-600" />
            </div>
            <h3 class="ml-3 text-lg font-semibold text-gray-900">{{ service.title }}</h3>
          </div>
          
          <p class="text-gray-600 mb-4 leading-relaxed text-sm">{{ service.description }}</p>
          
          <ul class="space-y-2">
            <li 
              v-for="feature in service.features" 
              :key="feature"
              class="flex items-center text-xs text-gray-500"
            >
              <div class="w-1 h-1 bg-primary-500 rounded-full mr-2"></div>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>