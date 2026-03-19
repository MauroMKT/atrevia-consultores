import type { BlogPost } from '@/lib/blog-types'

export const posts: BlogPost[] = [
  {
    slug: 'evaluation-immobiliere-guide',
    service: 'consultoria-inmobiliaria',
    title: 'Évaluation Immobilière : Comment Estimer Votre Bien au Juste Prix',
    excerpt: 'Apprenez les techniques d\'évaluation professionnelles pour prix votre propriété de manière compétitive.',
    date: '2025-01-13',
    readingTime: 7,
    sections: [
      { heading: "Analyse Comparative de Marché", body: "Étudiez les ventes récentes de propriétés similaires dans votre quartier. Considérez la superficie, l'état, l'âge et les caractéristiques pour estimer la valeur marchande équitable de votre bien basée sur le comportement réel des acheteurs." },
      { heading: "Principaux Facteurs de Valeur", body: "L'emplacement, l'état et les rénovations récentes impactent significativement la valeur. Les cuisines et salles de bains modernisées commandent des prix premium. L'attrait extérieur, l'efficacité énergétique et les équipements domotiques influencent aussi la volonté des acheteurs." },
      { heading: "Timing de Marché", body: "Les marchés immobiliers fluctuent saisonnièrement et cycliquement. Le printemps et le début de l'été voient généralement une demande maximale. Comprendre les conditions actuelles — marché acheteur ou vendeur — aide à définir des attentes réalistes." }
    ]
  },
  {
    slug: 'analyse-biens-investissement',
    service: 'consultoria-inmobiliaria',
    title: 'Analyse de Biens d\'Investissement : Calculez le Vrai ROI',
    excerpt: 'Maîtrisez les techniques d\'analyse financière qui séparent les investissements rentables des pièges.',
    date: '2025-01-11',
    readingTime: 9,
    sections: [
      { heading: "Calcul des Flux de Trésorerie", body: "Calculez les revenus mensuels moins toutes les dépenses : prêt, taxes, assurance, entretien, vacances locatives et gestion. Un flux de trésorerie positif signifie que le bien se finance lui-même." },
      { heading: "Taux de Capitalisation et ROI", body: "Le taux de capitalisation divise le revenu net d'exploitation par le prix d'achat pour comparer objectivement les biens. Le rendement cash-on-cash mesure les retours sur le capital réellement investi." },
      { heading: "Analyse de Localisation", body: "Recherchez les tendances du quartier, la croissance de l'emploi, le développement d'infrastructures et la qualité des écoles. Les biens dans des zones aux fondamentaux solides s'apprécient généralement plus vite." }
    ]
  },
  {
    slug: 'erreurs-premiers-acheteurs',
    service: 'consultoria-inmobiliaria',
    title: 'Erreurs à Éviter pour les Premiers Acheteurs',
    excerpt: 'Apprenez des erreurs coûteuses des autres et prenez de bonnes décisions pour votre premier achat immobilier.',
    date: '2025-01-09',
    readingTime: 6,
    sections: [
      { heading: "Surextension Financière", body: "Beaucoup de premiers acheteurs s'étendent au maximum du montant pré-approuvé. Cela ne laisse aucune marge pour les réparations imprévues, les taxes foncières ou les changements de vie. Visez à dépenser moins que votre maximum approuvé." },
      { heading: "Sauter les Inspections", body: "Les inspections professionnelles révèlent des problèmes cachés qui coûtent des milliers en réparations. Ne renoncez jamais aux inspections pour rendre votre offre plus compétitive. Utilisez les résultats pour négocier des réparations ou des réductions de prix." },
      { heading: "Ignorer les Coûts Totaux de Propriété", body: "Les mensualités du prêt ne sont qu'une composante. Considérez les taxes foncières, l'assurance, les charges de copropriété et l'entretien pour déterminer l'accessibilité réelle du bien." }
    ]
  },
  {
    slug: 'negociation-immobiliere-tactiques',
    service: 'consultoria-inmobiliaria',
    title: 'Négociation Immobilière : Obtenez la Meilleure Affaire',
    excerpt: 'Stratégies de négociation professionnelles qui font économiser des milliers sur votre prochaine transaction.',
    date: '2025-01-06',
    readingTime: 8,
    sections: [
      { heading: "Levier de Marché", body: "Comprenez si c'est un marché acheteur ou vendeur. Dans les marchés acheteurs, négociez agressivement sur le prix et les conditions. Dans les marchés vendeurs, concentrez-vous sur les termes non-prix comme les dates de clôture flexibles." },
      { heading: "Asymétrie d'Information", body: "Recherchez la motivation et le calendrier du vendeur. Les biens longtemps sur le marché ou les propriétaires sous pression temporelle offrent de meilleures opportunités de négociation. Ne révélez jamais votre budget maximum." },
      { heading: "Concessions Stratégiques", body: "Sachez quelles conditions vous importent le plus et où vous pouvez faire des compromis. Échangez des concessions stratégiquement en donnant sur des points qui vous coûtent peu mais comptent pour l'autre partie." }
    ]
  },
  {
    slug: 'immobilier-commercial-guide-investisseurs',
    service: 'consultoria-inmobiliaria',
    title: 'Immobilier Commercial : Guide d\'Entrée pour Investisseurs',
    excerpt: 'Découvrez les opportunités dans l\'investissement immobilier commercial et comment évaluer les transactions.',
    date: '2025-01-03',
    readingTime: 10,
    sections: [
      { heading: "Vue d'Ensemble des Types de Biens", body: "L'immobilier commercial comprend bureaux, espaces commerciaux, entrepôts industriels et immeubles résidentiels de grande taille. Chaque type a des profils de risque, des exigences de gestion et des potentiels de rendement différents." },
      { heading: "Analyse de la Structure des Baux", body: "Les baux commerciaux diffèrent radicalement des baux résidentiels. Les baux triple net transfèrent les charges aux locataires. Comprenez les termes du bail, la qualité de crédit des locataires et les clauses d'indexation des loyers." },
      { heading: "Stratégies de Financement", body: "Le financement immobilier commercial exige des apports plus importants (20-35%) et des durées plus courtes. Établissez des relations avec des prêteurs commerciaux qui connaissent votre marché et votre type de bien." }
    ]
  }
]
