'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { type Language } from '@/lib/translations'

const langFlags: Record<Language, string> = {
  es: '🇪🇸', en: '🇺🇸', it: '🇮🇹', fr: '🇫🇷', de: '🇩🇪',
}
const langLabels: Record<Language, string> = {
  es: 'ES', en: 'EN', it: 'IT', fr: 'FR', de: 'DE',
}

const privacy: Record<Language, {
  backLabel: string
  title: string
  subtitle: string
  updated: string
  sections: { heading: string; body: string }[]
}> = {
  es: {
    backLabel: 'Volver al inicio',
    title: 'Política de Privacidad',
    subtitle: 'Tu privacidad es nuestra prioridad. Aquí encontrarás toda la información sobre cómo recopilamos, usamos y protegemos tus datos personales.',
    updated: 'Última actualización: enero 2025',
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        body: 'ATREVIA Consultores, agencia italo-peruana con sede en Lima, Perú, es responsable del tratamiento de los datos personales recabados a través de este sitio web (atreviaconsultores.com). Para cualquier consulta relativa a la privacidad puedes contactarnos en info@atreviaconsultores.com.',
      },
      {
        heading: '2. Datos que recopilamos',
        body: 'Recopilamos los datos que nos proporcionas voluntariamente a través del formulario de contacto: nombre completo, dirección de correo electrónico, número de teléfono (opcional), servicio de interés y el contenido del mensaje. También podemos recopilar datos de navegación de forma anónima y agregada a través de cookies analíticas.',
      },
      {
        heading: '3. Finalidad del tratamiento',
        body: 'Los datos recabados se utilizan exclusivamente para: (a) responder a tus consultas y solicitudes de información, (b) enviarte información sobre nuestros servicios si has dado tu consentimiento, (c) mejorar la experiencia de uso de nuestro sitio web mediante análisis estadísticos anónimos.',
      },
      {
        heading: '4. Base legal',
        body: 'El tratamiento de tus datos se basa en tu consentimiento expreso al enviar el formulario de contacto (Art. 6.1.a del RGPD) y en el interés legítimo de gestionar las relaciones comerciales precontractuales (Art. 6.1.b del RGPD). En ningún caso cedemos tus datos a terceros sin tu consentimiento previo.',
      },
      {
        heading: '5. Conservación de los datos',
        body: 'Conservamos tus datos personales durante el tiempo necesario para cumplir con la finalidad para la que fueron recabados y, en todo caso, durante los plazos legalmente establecidos. Una vez finalizada la relación comercial o transcurrido el período legal, los datos serán eliminados de forma segura.',
      },
      {
        heading: '6. Transferencias internacionales',
        body: 'ATREVIA Consultores opera en mercados internacionales (Perú, Italia, España, EE.UU., Francia y Alemania). Los datos pueden ser accedidos por nuestro equipo en estas ubicaciones bajo las mismas garantías de protección y confidencialidad. Aplicamos las salvaguardas adecuadas conforme al RGPD y la legislación peruana vigente.',
      },
      {
        heading: '7. Tus derechos',
        body: 'Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento y oponerte al uso de tus datos personales. También puedes ejercer el derecho a la portabilidad. Para ejercer cualquiera de estos derechos, envíanos un correo a info@atreviaconsultores.com indicando tu solicitud. Responderemos en un plazo máximo de 30 días.',
      },
      {
        heading: '8. Seguridad',
        body: 'Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos frente a accesos no autorizados, pérdida, alteración o divulgación. Nuestro sitio web utiliza cifrado SSL/TLS en todas las comunicaciones.',
      },
      {
        heading: '9. Cookies',
        body: 'Este sitio web puede utilizar cookies técnicas estrictamente necesarias para su funcionamiento y cookies analíticas anónimas para mejorar la experiencia del usuario. Puedes configurar tu navegador para rechazar todas las cookies; no obstante, algunas funcionalidades podrían verse afectadas.',
      },
      {
        heading: '10. Cambios en esta política',
        body: 'Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. La versión vigente siempre estará disponible en esta página con la fecha de la última actualización. Te recomendamos revisarla periódicamente.',
      },
    ],
  },

  en: {
    backLabel: 'Back to home',
    title: 'Privacy Policy',
    subtitle: 'Your privacy is our priority. Here you will find all the information about how we collect, use and protect your personal data.',
    updated: 'Last updated: January 2025',
    sections: [
      {
        heading: '1. Data Controller',
        body: 'ATREVIA Consultores, an Italian-Peruvian agency based in Lima, Peru, is responsible for processing the personal data collected through this website (atreviaconsultores.com). For any privacy-related inquiries, please contact us at info@atreviaconsultores.com.',
      },
      {
        heading: '2. Data We Collect',
        body: 'We collect the data you voluntarily provide through the contact form: full name, email address, phone number (optional), service of interest, and message content. We may also collect anonymous and aggregated browsing data through analytical cookies.',
      },
      {
        heading: '3. Purpose of Processing',
        body: 'The collected data is used exclusively to: (a) respond to your inquiries and information requests, (b) send you information about our services if you have given your consent, (c) improve the website user experience through anonymous statistical analysis.',
      },
      {
        heading: '4. Legal Basis',
        body: 'The processing of your data is based on your express consent when submitting the contact form (Art. 6.1.a GDPR) and our legitimate interest in managing pre-contractual commercial relationships (Art. 6.1.b GDPR). We never share your data with third parties without your prior consent.',
      },
      {
        heading: '5. Data Retention',
        body: 'We retain your personal data for as long as necessary to fulfil the purpose for which it was collected and, in any case, for the legally established periods. Once the commercial relationship has ended or the legal period has elapsed, the data will be securely deleted.',
      },
      {
        heading: '6. International Transfers',
        body: 'ATREVIA Consultores operates in international markets (Peru, Italy, Spain, USA, France and Germany). Data may be accessed by our team in these locations under the same protection and confidentiality guarantees. We apply appropriate safeguards in accordance with the GDPR and applicable Peruvian legislation.',
      },
      {
        heading: '7. Your Rights',
        body: 'You have the right to access, rectify, erase, restrict processing of, and object to the use of your personal data. You may also exercise the right to data portability. To exercise any of these rights, send us an email at info@atreviaconsultores.com stating your request. We will respond within a maximum of 30 days.',
      },
      {
        heading: '8. Security',
        body: 'We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, alteration or disclosure. Our website uses SSL/TLS encryption on all communications.',
      },
      {
        heading: '9. Cookies',
        body: 'This website may use strictly necessary technical cookies for its operation and anonymous analytical cookies to improve user experience. You can configure your browser to reject all cookies; however, some functionality may be affected.',
      },
      {
        heading: '10. Changes to This Policy',
        body: 'We reserve the right to update this Privacy Policy at any time. The current version will always be available on this page with the date of the last update. We recommend reviewing it periodically.',
      },
    ],
  },

  it: {
    backLabel: 'Torna alla home',
    title: 'Informativa sulla Privacy',
    subtitle: 'La tua privacy è la nostra priorità. Qui troverai tutte le informazioni su come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.',
    updated: 'Ultimo aggiornamento: gennaio 2025',
    sections: [
      {
        heading: '1. Titolare del trattamento',
        body: 'ATREVIA Consultores, agenzia italo-peruviana con sede a Lima, Perù, è responsabile del trattamento dei dati personali raccolti tramite questo sito web (atreviaconsultores.com). Per qualsiasi domanda relativa alla privacy puoi contattarci all\'indirizzo info@atreviaconsultores.com.',
      },
      {
        heading: '2. Dati che raccogliamo',
        body: 'Raccogliamo i dati che fornisci volontariamente tramite il modulo di contatto: nome completo, indirizzo e-mail, numero di telefono (opzionale), servizio di interesse e contenuto del messaggio. Possiamo inoltre raccogliere dati di navigazione in forma anonima e aggregata tramite cookie analitici.',
      },
      {
        heading: '3. Finalità del trattamento',
        body: 'I dati raccolti sono utilizzati esclusivamente per: (a) rispondere alle tue richieste di informazioni, (b) inviarti informazioni sui nostri servizi se hai prestato il consenso, (c) migliorare l\'esperienza d\'uso del sito web tramite analisi statistiche anonime.',
      },
      {
        heading: '4. Base giuridica',
        body: 'Il trattamento dei tuoi dati si basa sul tuo consenso espresso all\'invio del modulo di contatto (Art. 6.1.a GDPR) e sull\'interesse legittimo alla gestione delle relazioni commerciali precontrattuali (Art. 6.1.b GDPR). Non cediamo mai i tuoi dati a terzi senza il tuo previo consenso.',
      },
      {
        heading: '5. Conservazione dei dati',
        body: 'Conserviamo i tuoi dati personali per il tempo necessario al raggiungimento della finalità per cui sono stati raccolti e, in ogni caso, per i periodi stabiliti dalla legge. Al termine del rapporto commerciale o alla scadenza del periodo legale, i dati saranno eliminati in modo sicuro.',
      },
      {
        heading: '6. Trasferimenti internazionali',
        body: 'ATREVIA Consultores opera in mercati internazionali (Perù, Italia, Spagna, USA, Francia e Germania). I dati potrebbero essere accessibili dal nostro team in queste sedi, con le stesse garanzie di protezione e riservatezza. Applichiamo le misure di salvaguardia appropriate ai sensi del GDPR e della legislazione peruviana vigente.',
      },
      {
        heading: '7. I tuoi diritti',
        body: 'Hai diritto di accedere, rettificare, cancellare, limitare il trattamento e opporti all\'utilizzo dei tuoi dati personali. Puoi esercitare anche il diritto alla portabilità dei dati. Per esercitare uno qualsiasi di questi diritti, invia una e-mail a info@atreviaconsultores.com indicando la tua richiesta. Risponderemo entro un massimo di 30 giorni.',
      },
      {
        heading: '8. Sicurezza',
        body: 'Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati da accessi non autorizzati, perdita, alterazione o divulgazione. Il nostro sito web utilizza la crittografia SSL/TLS in tutte le comunicazioni.',
      },
      {
        heading: '9. Cookie',
        body: 'Questo sito web può utilizzare cookie tecnici strettamente necessari al suo funzionamento e cookie analitici anonimi per migliorare l\'esperienza utente. Puoi configurare il tuo browser per rifiutare tutti i cookie; tuttavia, alcune funzionalità potrebbero risultare compromesse.',
      },
      {
        heading: '10. Modifiche alla presente informativa',
        body: 'Ci riserviamo il diritto di aggiornare la presente Informativa sulla Privacy in qualsiasi momento. La versione vigente sarà sempre disponibile su questa pagina con la data dell\'ultimo aggiornamento. Ti consigliamo di consultarla periodicamente.',
      },
    ],
  },

  fr: {
    backLabel: 'Retour à l\'accueil',
    title: 'Politique de Confidentialité',
    subtitle: 'Votre vie privée est notre priorité. Vous trouverez ici toutes les informations sur la façon dont nous collectons, utilisons et protégeons vos données personnelles.',
    updated: 'Dernière mise à jour : janvier 2025',
    sections: [
      {
        heading: '1. Responsable du traitement',
        body: 'ATREVIA Consultores, agence italo-péruvienne basée à Lima, Pérou, est responsable du traitement des données personnelles collectées via ce site web (atreviaconsultores.com). Pour toute question relative à la confidentialité, contactez-nous à info@atreviaconsultores.com.',
      },
      {
        heading: '2. Données que nous collectons',
        body: 'Nous collectons les données que vous fournissez volontairement via le formulaire de contact : nom complet, adresse e-mail, numéro de téléphone (facultatif), service d\'intérêt et contenu du message. Nous pouvons également collecter des données de navigation de manière anonyme et agrégée via des cookies analytiques.',
      },
      {
        heading: '3. Finalité du traitement',
        body: 'Les données collectées sont utilisées exclusivement pour : (a) répondre à vos demandes d\'informations, (b) vous envoyer des informations sur nos services si vous avez donné votre consentement, (c) améliorer l\'expérience utilisateur du site web grâce à des analyses statistiques anonymes.',
      },
      {
        heading: '4. Base légale',
        body: 'Le traitement de vos données est fondé sur votre consentement exprès lors de l\'envoi du formulaire de contact (Art. 6.1.a RGPD) et sur notre intérêt légitime à gérer les relations commerciales précontractuelles (Art. 6.1.b RGPD). Nous ne partageons jamais vos données avec des tiers sans votre consentement préalable.',
      },
      {
        heading: '5. Conservation des données',
        body: 'Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre la finalité pour laquelle elles ont été collectées et, en tout état de cause, pendant les délais légalement établis. À la fin de la relation commerciale ou à l\'expiration du délai légal, les données seront supprimées de manière sécurisée.',
      },
      {
        heading: '6. Transferts internationaux',
        body: 'ATREVIA Consultores opère sur des marchés internationaux (Pérou, Italie, Espagne, États-Unis, France et Allemagne). Les données peuvent être accessibles par notre équipe dans ces pays, avec les mêmes garanties de protection et de confidentialité. Nous appliquons les garanties appropriées conformément au RGPD et à la législation péruvienne applicable.',
      },
      {
        heading: '7. Vos droits',
        body: 'Vous avez le droit d\'accéder, de rectifier, d\'effacer, de limiter le traitement et de vous opposer à l\'utilisation de vos données personnelles. Vous pouvez également exercer le droit à la portabilité des données. Pour exercer l\'un de ces droits, envoyez-nous un e-mail à info@atreviaconsultores.com en indiquant votre demande. Nous répondrons dans un délai maximum de 30 jours.',
      },
      {
        heading: '8. Sécurité',
        body: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation. Notre site web utilise le chiffrement SSL/TLS sur toutes les communications.',
      },
      {
        heading: '9. Cookies',
        body: 'Ce site web peut utiliser des cookies techniques strictement nécessaires à son fonctionnement et des cookies analytiques anonymes pour améliorer l\'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser tous les cookies ; cependant, certaines fonctionnalités pourraient être affectées.',
      },
      {
        heading: '10. Modifications de cette politique',
        body: 'Nous nous réservons le droit de mettre à jour cette Politique de Confidentialité à tout moment. La version en vigueur sera toujours disponible sur cette page avec la date de la dernière mise à jour. Nous vous recommandons de la consulter régulièrement.',
      },
    ],
  },

  de: {
    backLabel: 'Zurück zur Startseite',
    title: 'Datenschutzerklärung',
    subtitle: 'Ihr Datenschutz hat für uns oberste Priorität. Hier finden Sie alle Informationen darüber, wie wir Ihre personenbezogenen Daten erheben, verwenden und schützen.',
    updated: 'Zuletzt aktualisiert: Januar 2025',
    sections: [
      {
        heading: '1. Verantwortlicher',
        body: 'ATREVIA Consultores, eine italienisch-peruanische Agentur mit Sitz in Lima, Peru, ist verantwortlich für die Verarbeitung der über diese Website (atreviaconsultores.com) erhobenen personenbezogenen Daten. Für datenschutzbezogene Anfragen kontaktieren Sie uns bitte unter info@atreviaconsultores.com.',
      },
      {
        heading: '2. Erhobene Daten',
        body: 'Wir erheben die Daten, die Sie freiwillig über das Kontaktformular bereitstellen: vollständiger Name, E-Mail-Adresse, Telefonnummer (optional), Interesse an bestimmten Dienstleistungen und Nachrichteninhalt. Wir können auch anonyme und aggregierte Browsing-Daten über Analyse-Cookies erheben.',
      },
      {
        heading: '3. Zweck der Verarbeitung',
        body: 'Die erhobenen Daten werden ausschließlich verwendet, um: (a) Ihre Anfragen und Informationswünsche zu beantworten, (b) Ihnen Informationen über unsere Dienstleistungen zu senden, sofern Sie Ihre Einwilligung erteilt haben, (c) das Nutzererlebnis der Website durch anonyme statistische Analysen zu verbessern.',
      },
      {
        heading: '4. Rechtsgrundlage',
        body: 'Die Verarbeitung Ihrer Daten basiert auf Ihrer ausdrücklichen Einwilligung beim Absenden des Kontaktformulars (Art. 6 Abs. 1 lit. a DSGVO) und auf unserem berechtigten Interesse an der Verwaltung vorvertraglicher Geschäftsbeziehungen (Art. 6 Abs. 1 lit. b DSGVO). Wir geben Ihre Daten niemals ohne Ihre vorherige Einwilligung an Dritte weiter.',
      },
      {
        heading: '5. Datenspeicherung',
        body: 'Wir speichern Ihre personenbezogenen Daten so lange, wie es für den Zweck, für den sie erhoben wurden, erforderlich ist, und in jedem Fall für die gesetzlich vorgeschriebenen Zeiträume. Nach Beendigung der Geschäftsbeziehung oder Ablauf der gesetzlichen Frist werden die Daten sicher gelöscht.',
      },
      {
        heading: '6. Internationale Übermittlungen',
        body: 'ATREVIA Consultores ist auf internationalen Märkten tätig (Peru, Italien, Spanien, USA, Frankreich und Deutschland). Auf Daten kann von unserem Team an diesen Standorten zugegriffen werden, mit denselben Schutz- und Vertraulichkeitsgarantien. Wir wenden geeignete Schutzmaßnahmen gemäß der DSGVO und dem geltenden peruanischen Recht an.',
      },
      {
        heading: '7. Ihre Rechte',
        body: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch gegen die Nutzung Ihrer personenbezogenen Daten. Sie können auch das Recht auf Datenübertragbarkeit ausüben. Um eines dieser Rechte auszuüben, senden Sie uns eine E-Mail an info@atreviaconsultores.com mit Ihrer Anfrage. Wir werden innerhalb von maximal 30 Tagen antworten.',
      },
      {
        heading: '8. Sicherheit',
        body: 'Wir implementieren geeignete technische und organisatorische Maßnahmen, um Ihre Daten vor unbefugtem Zugriff, Verlust, Änderung oder Offenlegung zu schützen. Unsere Website verwendet SSL/TLS-Verschlüsselung für alle Kommunikationen.',
      },
      {
        heading: '9. Cookies',
        body: 'Diese Website kann technisch notwendige Cookies für ihren Betrieb und anonyme Analyse-Cookies zur Verbesserung der Benutzererfahrung verwenden. Sie können Ihren Browser so konfigurieren, dass alle Cookies abgelehnt werden; einige Funktionen könnten jedoch beeinträchtigt sein.',
      },
      {
        heading: '10. Änderungen dieser Richtlinie',
        body: 'Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu aktualisieren. Die aktuelle Version ist stets auf dieser Seite mit dem Datum der letzten Aktualisierung verfügbar. Wir empfehlen, sie regelmäßig zu überprüfen.',
      },
    ],
  },
}

const privacyLabel: Record<Language, string> = {
  es: 'Política de Privacidad',
  en: 'Privacy Policy',
  it: 'Privacy Policy',
  fr: 'Politique de Confidentialité',
  de: 'Datenschutzerklärung',
}

export default function PrivacyPage() {
  const [lang, setLang] = useState<Language>('es')
  const t = privacy[lang]

  return (
    <div
      className="min-h-screen"
      style={{ background: 'oklch(0.12 0.025 255)' }}
    >
      {/* Header bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'oklch(0.10 0.022 255 / 0.96)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid oklch(0.20 0.025 255)',
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[oklch(0.65_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors duration-200"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backLabel}
        </Link>

        {/* Logo */}
        <span
          className="text-base font-bold tracking-[0.2em] text-[oklch(0.95_0.01_80)]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          ATREVIA <span style={{ color: 'oklch(0.78 0.12 75)' }}>Consultores</span>
        </span>

        {/* Language switcher */}
        <div className="flex items-center gap-1">
          {(Object.keys(langFlags) as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all duration-200 ${
                lang === l
                  ? 'text-[oklch(0.78_0.12_75)] bg-[oklch(0.20_0.03_255)]'
                  : 'text-[oklch(0.55_0.015_255)] hover:text-[oklch(0.78_0.12_75)]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-sm">{langFlags[l]}</span>
              <span className="hidden sm:inline font-semibold tracking-widest uppercase">{langLabels[l]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-20">
        {/* Title block */}
        <div className="mb-14">
          <div
            className="inline-block text-xs tracking-[0.3em] uppercase mb-6 px-3 py-1.5 rounded"
            style={{
              color: 'oklch(0.78 0.12 75)',
              border: '1px solid oklch(0.78 0.12 75 / 0.3)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {privacyLabel[lang]}
          </div>
          <h1
            className="text-4xl sm:text-5xl font-light text-[oklch(0.95_0.01_80)] mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {t.title}
          </h1>
          <p
            className="text-base text-[oklch(0.60_0.015_255)] leading-relaxed mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.subtitle}
          </p>
          <p
            className="text-xs text-[oklch(0.45_0.015_255)] tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.updated}
          </p>
          <div
            className="mt-8 h-px w-full"
            style={{ background: 'linear-gradient(to right, oklch(0.78 0.12 75 / 0.5), transparent)' }}
          />
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {t.sections.map((section, i) => (
            <div
              key={i}
              className="group p-8 rounded transition-all duration-300"
              style={{
                background: 'oklch(0.15 0.025 255)',
                border: '1px solid oklch(0.20 0.025 255)',
              }}
            >
              <h2
                className="text-lg font-semibold text-[oklch(0.90_0.01_80)] mb-4 flex items-start gap-3"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                <span
                  className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                  style={{ background: 'oklch(0.78 0.12 75)', minWidth: '6px', minHeight: '6px', display: 'inline-block' }}
                />
                {section.heading}
              </h2>
              <p
                className="text-sm text-[oklch(0.60_0.015_255)] leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 p-8 rounded text-center"
          style={{
            background: 'oklch(0.10 0.022 255)',
            border: '1px solid oklch(0.78 0.12 75 / 0.2)',
          }}
        >
          <p
            className="text-sm text-[oklch(0.60_0.015_255)] mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {lang === 'es' && '¿Tienes preguntas sobre tu privacidad?'}
            {lang === 'en' && 'Do you have questions about your privacy?'}
            {lang === 'it' && 'Hai domande sulla tua privacy?'}
            {lang === 'fr' && 'Avez-vous des questions sur votre confidentialité ?'}
            {lang === 'de' && 'Haben Sie Fragen zu Ihrem Datenschutz?'}
          </p>
          <a
            href="mailto:info@atreviaconsultores.com"
            className="inline-flex items-center gap-2 text-sm font-medium text-[oklch(0.78_0.12_75)] hover:text-[oklch(0.90_0.10_80)] transition-colors duration-200"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            info@atreviaconsultores.com
          </a>
        </div>

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[oklch(0.50_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors duration-200"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backLabel}
          </Link>
        </div>
      </main>

      {/* Footer bar */}
      <div
        className="py-6 text-center"
        style={{ borderTop: '1px solid oklch(0.18 0.025 255)' }}
      >
        <p
          className="text-xs text-[oklch(0.35_0.015_255)]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          © {new Date().getFullYear()} ATREVIA Consultores. {lang === 'es' && 'Todos los derechos reservados.'}{lang === 'en' && 'All rights reserved.'}{lang === 'it' && 'Tutti i diritti riservati.'}{lang === 'fr' && 'Tous droits réservés.'}{lang === 'de' && 'Alle Rechte vorbehalten.'}
        </p>
      </div>
    </div>
  )
}
