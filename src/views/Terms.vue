<script setup lang="ts">
const sections = [
  {
    title: '1. Geltungsbereich',
    content: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Geschäftsbeziehungen zwischen ImmobilienMakler (nachfolgend "Makler") und seinen Auftraggebern (nachfolgend "Auftraggeber"). Abweichende Bedingungen des Auftraggebers werden nur wirksam, wenn sie vom Makler ausdrücklich schriftlich anerkannt werden.`
  },
  {
    title: '2. Vertragsschluss',
    content: `Der Maklervertrag kommt durch die Unterzeichnung des Maklerauftrags oder durch die Bestätigung des Auftrags per E-Mail zustande. Mündliche Nebenabreden bedürfen der schriftlichen Bestätigung.`
  },
  {
    title: '3. Leistungen des Maklers',
    content: `Der Makler verpflichtet sich zur ordnungsgemäßen Durchführung der vereinbarten Maklerleistungen. Dazu gehören insbesondere:
    
    • Marktanalyse und Objektbewertung
    • Erstellung von Verkaufsunterlagen
    • Vermarktung der Immobilie
    • Vorqualifikation von Interessenten
    • Begleitung von Besichtigungen
    • Unterstützung bei Vertragsverhandlungen`
  },
  {
    title: '4. Pflichten des Auftraggebers',
    content: `Der Auftraggeber verpflichtet sich:
    
    • Alle für die Vermarktung notwendigen Unterlagen vollständig und wahrheitsgemäß zur Verfügung zu stellen
    • Den Makler über alle wesentlichen Änderungen zu informieren
    • Besichtigungstermine zu ermöglichen
    • Bei Vertragsabschluss die vereinbarte Provision zu zahlen`
  },
  {
    title: '5. Provision',
    content: `Die Maklerprovision wird bei erfolgreichem Abschluss eines Kauf-, Miet- oder Pachtvertrags fällig. Die Höhe der Provision richtet sich nach der getroffenen Vereinbarung und ist in der Regel wie folgt gestaffelt:
    
    • Verkauf von Immobilien: 3,57% (inkl. MwSt.) vom Kaufpreis
    • Vermietung: 2,38 Monatskaltmieten (inkl. MwSt.)
    • Firmenvermittlung: Nach individueller Vereinbarung`
  },
  {
    title: '6. Zahlungsbedingungen',
    content: `Die Provision ist innerhalb von 14 Tagen nach Rechnungsstellung zur Zahlung fällig. Bei Zahlungsverzug werden Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz berechnet.`
  },
  {
    title: '7. Haftung',
    content: `Der Makler haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit nicht Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit betroffen sind.`
  },
  {
    title: '8. Datenschutz',
    content: `Der Makler verpflichtet sich, alle erhaltenen Daten vertraulich zu behandeln und nur für die Zwecke der Vertragserfüllung zu verwenden. Die Datenschutzerklärung ist Bestandteil dieser AGB.`
  },
  {
    title: '9. Kündigung',
    content: `Der Maklervertrag kann von beiden Seiten mit einer Frist von 4 Wochen zum Monatsende gekündigt werden. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.`
  },
  {
    title: '10. Schlussbestimmungen',
    content: `Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Es gilt deutsches Recht. Gerichtsstand ist München.`
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
      <div class="mx-auto max-w-4xl px-4">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p class="text-lg text-gray-600">
            Rechtliche Grundlagen für unsere Zusammenarbeit
          </p>
        </div>
      </div>
    </section>
    
    <!-- AGB Content -->
    <section class="py-12 bg-white">
      <div class="mx-auto max-w-4xl px-4">
        <div class="card p-8">
          <div class="mb-8">
            <p class="text-gray-600 leading-relaxed">
              Stand: Januar 2025<br>
              ImmobilienMakler<br>
              Musterstraße 123, 80331 München
            </p>
          </div>
          
          <div class="space-y-8">
            <div 
              v-for="section in sections" 
              :key="section.title"
              class="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ section.title }}</h2>
              <div class="text-gray-700 leading-relaxed whitespace-pre-line">{{ section.content }}</div>
            </div>
          </div>
          
          <div class="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-3">Fragen zu den AGB?</h3>
            <p class="text-gray-600 mb-4">
              Bei Fragen zu unseren Geschäftsbedingungen stehen wir Ihnen gerne zur Verfügung.
            </p>
            <router-link to="/kontakt" class="btn-primary">
              Kontakt aufnehmen
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>