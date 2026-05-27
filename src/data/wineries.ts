import type { Winery } from '@/types/winery'

export const wineries: Winery[] = [
  // ── PENEDÈS ──────────────────────────────────────────────────────────────
  {
    id: 'gramona',
    slug: 'gramona',
    name: 'Gramona',
    region: 'penedes',
    location: "Sant Sadurní d'Anoia",
    description: {
      es: 'Fundada en 1881, Gramona es sinónimo de cava de alta gama en el Penedès. Sus métodos tradicionales y largas crianzas producen espumosos de complejidad excepcional, reconocidos internacionalmente por su elegancia y carácter mineral.',
      en: 'Founded in 1881, Gramona is synonymous with premium cava in the Penedès. Their traditional methods and long ageing produce sparkling wines of exceptional complexity, internationally acclaimed for elegance and mineral character.',
      ca: "Fundada el 1881, Gramona és sinònim de cava d'alta gamma al Penedès. Els seus mètodes tradicionals i llargues criances produeixen escumosos de complexitat excepcional, reconeguts internacionalment per la seva elegància i caràcter mineral.",
    },
    experiences: [
      {
        id: 'gramona-1',
        title: {
          es: 'Gran Tour del Cava',
          en: 'Grand Cava Tour',
          ca: 'Gran Tour del Cava',
        },
        duration: 2,
        price: 35,
        type: 'tour',
      },
      {
        id: 'gramona-2',
        title: {
          es: 'Cata de Gran Reserva',
          en: 'Grand Reserve Masterclass',
          ca: 'Tast de Gran Reserva',
        },
        duration: 3,
        price: 75,
        type: 'tasting',
      },
    ],
    rating: 4.8,
    image: 'https://picsum.photos/seed/gramona-main/800/600',
    gallery: [
      'https://picsum.photos/seed/gramona-g1/1200/800',
      'https://picsum.photos/seed/gramona-g2/1200/800',
      'https://picsum.photos/seed/gramona-g3/1200/800',
      'https://picsum.photos/seed/gramona-g4/1200/800',
    ],
  },
  {
    id: 'sumarroca',
    slug: 'sumarroca',
    name: 'Sumarroca',
    region: 'penedes',
    location: 'Subirats',
    description: {
      es: 'Bodega familiar del corazón del Penedès, Sumarroca elabora cavas y vinos tranquilos de gran personalidad. Sus viñedos en el Alt Penedès reflejan la diversidad de suelos y microclimas únicos de la región.',
      en: 'A family winery at the heart of the Penedès, Sumarroca crafts cavas and still wines of great personality. Their vineyards in Alt Penedès reflect the diversity of soils and unique microclimates in the region.',
      ca: "Celler familiar al cor del Penedès, Sumarroca elabora caves i vins tranquils de gran personalitat. Les seves vinyes a l'Alt Penedès reflecteixen la diversitat de sòls i microclimes únics de la regió.",
    },
    experiences: [
      {
        id: 'sumarroca-1',
        title: {
          es: 'Vendimia y Pisado Tradicional',
          en: 'Traditional Harvest & Grape Stomp',
          ca: 'Verema i Trepitjada Tradicional',
        },
        duration: 4,
        price: 45,
        type: 'harvest',
      },
      {
        id: 'sumarroca-2',
        title: {
          es: 'Vino y Gastronomía entre Viñas',
          en: 'Wine & Gastronomy Among the Vines',
          ca: 'Vi i Gastronomia entre Vinyes',
        },
        duration: 2,
        price: 40,
        type: 'pairing',
      },
    ],
    rating: 4.6,
    image: 'https://picsum.photos/seed/sumarroca-main/800/600',
    gallery: [
      'https://picsum.photos/seed/sumarroca-g1/1200/800',
      'https://picsum.photos/seed/sumarroca-g2/1200/800',
      'https://picsum.photos/seed/sumarroca-g3/1200/800',
      'https://picsum.photos/seed/sumarroca-g4/1200/800',
    ],
  },
  {
    id: 'can-bonastre',
    slug: 'can-bonastre',
    name: 'Can Bonastre',
    region: 'penedes',
    location: 'Masquefa',
    description: {
      es: 'Enclavada entre bosques y viñedos en Masquefa, Can Bonastre es una finca boutique que combina turismo de lujo y viticultura artesanal. Un lugar donde la arquitectura centenaria dialoga con la modernidad enológica.',
      en: 'Nestled among forests and vineyards in Masquefa, Can Bonastre is a boutique estate combining luxury tourism with artisanal viticulture. A place where centuries-old architecture meets contemporary winemaking.',
      ca: "Enclavada entre boscos i vinyes a Masquefa, Can Bonastre és una finca boutique que combina turisme de luxe i viticultura artesanal. Un lloc on l'arquitectura centenària dialoga amb la modernitat enològica.",
    },
    experiences: [
      {
        id: 'can-bonastre-1',
        title: {
          es: 'Visita a la Finca y Cata',
          en: 'Estate Tour & Tasting',
          ca: 'Visita a la Finca i Tast',
        },
        duration: 2,
        price: 30,
        type: 'tour',
      },
      {
        id: 'can-bonastre-2',
        title: {
          es: 'Taller de Vinificación',
          en: 'Winemaking Workshop',
          ca: 'Taller de Vinificació',
        },
        duration: 3,
        price: 55,
        type: 'workshop',
      },
    ],
    rating: 4.7,
    image: 'https://picsum.photos/seed/can-bonastre-main/800/600',
    gallery: [
      'https://picsum.photos/seed/can-bonastre-g1/1200/800',
      'https://picsum.photos/seed/can-bonastre-g2/1200/800',
      'https://picsum.photos/seed/can-bonastre-g3/1200/800',
      'https://picsum.photos/seed/can-bonastre-g4/1200/800',
    ],
  },

  // ── PRIORAT ───────────────────────────────────────────────────────────────
  {
    id: 'celler-mas-doix',
    slug: 'celler-mas-doix',
    name: 'Celler Mas Doix',
    region: 'priorat',
    location: 'Poboleda',
    description: {
      es: 'Enclavado en el corazón del Priorat, Mas Doix elabora vinos de terroir sobre suelos de llicorella pizarrosa. Sus viejas cepas de garnacha y cariñena, algunas centenarias, dan tintos de una profundidad y mineralidad únicas.',
      en: 'Set in the heart of the Priorat, Mas Doix crafts terroir wines over slate llicorella soils. Their old-vine grenache and carignan, some over a century old, produce reds of unique depth and minerality.',
      ca: "Enclastrat al cor del Priorat, Mas Doix elabora vins de terroir sobre sòls de llicorella pissarrosa. Les seves velles ceps de garnatxa i carinyena, algunes centenàries, donen negres d'una profunditat i mineralitat úniques.",
    },
    experiences: [
      {
        id: 'mas-doix-1',
        title: {
          es: 'Cata Magistral en el Priorat',
          en: 'Priorat Masterclass Tasting',
          ca: 'Tast Magistral al Priorat',
        },
        duration: 3,
        price: 55,
        type: 'tasting',
      },
      {
        id: 'mas-doix-2',
        title: {
          es: 'Paseo por las Viñas Centenarias',
          en: 'Walk Through Century-Old Vines',
          ca: 'Passeig per les Vinyes Centenàries',
        },
        duration: 4,
        price: 65,
        type: 'harvest',
      },
    ],
    rating: 4.9,
    image: 'https://picsum.photos/seed/mas-doix-main/800/600',
    gallery: [
      'https://picsum.photos/seed/mas-doix-g1/1200/800',
      'https://picsum.photos/seed/mas-doix-g2/1200/800',
      'https://picsum.photos/seed/mas-doix-g3/1200/800',
      'https://picsum.photos/seed/mas-doix-g4/1200/800',
    ],
  },
  {
    id: 'celler-de-lencastell',
    slug: 'celler-de-lencastell',
    name: "Celler de l'Encastell",
    region: 'priorat',
    location: 'Porrera',
    description: {
      es: 'Pequeño productor en Porrera con una filosofía de mínima intervención. Sus vinos expresan la esencia del Priorat: concentración, frescura y ese sello inconfundible de la pizarra volcánica que solo este territorio puede ofrecer.',
      en: 'A small producer in Porrera with a minimal-intervention philosophy. Their wines express the essence of Priorat: concentration, freshness and the unmistakable stamp of volcanic slate that only this territory can offer.',
      ca: "Petit productor a Porrera amb una filosofia de mínima intervenció. Els seus vins expressen l'essència del Priorat: concentració, frescor i aquell segell inconfusible de la pissarra volcànica que només aquest territori pot oferir.",
    },
    experiences: [
      {
        id: 'encastell-1',
        title: {
          es: 'Cata Vertical de Añadas',
          en: 'Vertical Vintage Tasting',
          ca: "Tast Vertical d'Anyades",
        },
        duration: 3,
        price: 80,
        type: 'tasting',
      },
      {
        id: 'encastell-2',
        title: {
          es: 'Cata Guiada en la Bodega',
          en: 'Guided Cellar Tasting',
          ca: 'Tast Guiat al Celler',
        },
        duration: 2,
        price: 45,
        type: 'tasting',
      },
    ],
    rating: 4.7,
    image: 'https://picsum.photos/seed/encastell-main/800/600',
    gallery: [
      'https://picsum.photos/seed/encastell-g1/1200/800',
      'https://picsum.photos/seed/encastell-g2/1200/800',
      'https://picsum.photos/seed/encastell-g3/1200/800',
      'https://picsum.photos/seed/encastell-g4/1200/800',
    ],
  },
  {
    id: 'clos-figueres',
    slug: 'clos-figueres',
    name: 'Clos Figueres',
    region: 'priorat',
    location: 'Porrera',
    description: {
      es: 'Fundado por Christopher Cannan en los años 90, Clos Figueres es uno de los grandes proyectos del Priorat moderno. Sus vinos combinan potencia y elegancia en un paisaje de terrazas empinadas de impresionante belleza.',
      en: 'Founded by Christopher Cannan in the 1990s, Clos Figueres is one of the great projects of modern Priorat. Their wines combine power and elegance across a landscape of steep terraces of breathtaking beauty.',
      ca: "Fundat per Christopher Cannan als anys 90, Clos Figueres és un dels grans projectes del Priorat modern. Els seus vins combinen potència i elegància sobre un paisatge de terrasses escarpades de bellesa impressionant.",
    },
    experiences: [
      {
        id: 'clos-figueres-1',
        title: {
          es: 'Visita al Celler y Cata de Autor',
          en: 'Cellar Visit & Winemaker Tasting',
          ca: "Visita al Celler i Tast d'Autor",
        },
        duration: 2,
        price: 50,
        type: 'tour',
      },
      {
        id: 'clos-figueres-2',
        title: {
          es: 'Cena Maridaje entre Terrazas',
          en: 'Pairing Dinner Among the Terraces',
          ca: 'Sopar Maridatge entre Terrasses',
        },
        duration: 4,
        price: 95,
        type: 'pairing',
      },
    ],
    rating: 4.8,
    image: 'https://picsum.photos/seed/clos-figueres-main/800/600',
    gallery: [
      'https://picsum.photos/seed/clos-figueres-g1/1200/800',
      'https://picsum.photos/seed/clos-figueres-g2/1200/800',
      'https://picsum.photos/seed/clos-figueres-g3/1200/800',
      'https://picsum.photos/seed/clos-figueres-g4/1200/800',
    ],
  },

  // ── EMPORDÀ ───────────────────────────────────────────────────────────────
  {
    id: 'castillo-perelada',
    slug: 'castillo-perelada',
    name: 'Castillo Perelada',
    region: 'emporda',
    location: 'Perelada',
    description: {
      es: 'El gran referente del Empordà. El Castillo Perelada es una institución que combina bodega de primer nivel, museo del vino y un entorno histórico incomparable. Sus vinos reflejan la personalidad única de la Costa Brava.',
      en: "The great reference of Empordà. Castillo Perelada is an institution combining a top-tier winery, wine museum and an incomparable historic setting. Their wines reflect the unique personality of the Costa Brava.",
      ca: "El gran referent de l'Empordà. El Castell de Perelada és una institució que combina celler de primer nivell, museu del vi i un entorn històric incomparable. Els seus vins reflecteixen la personalitat única de la Costa Brava.",
    },
    experiences: [
      {
        id: 'perelada-1',
        title: {
          es: 'Tour por el Castillo y la Bodega',
          en: 'Castle & Winery Tour',
          ca: 'Tour pel Castell i el Celler',
        },
        duration: 2.5,
        price: 35,
        type: 'tour',
      },
      {
        id: 'perelada-2',
        title: {
          es: 'Cata de Reserva y Museo del Vino',
          en: 'Reserve Tasting & Wine Museum',
          ca: 'Tast de Reserva i Museu del Vi',
        },
        duration: 3,
        price: 55,
        type: 'tasting',
      },
    ],
    rating: 4.7,
    image: 'https://picsum.photos/seed/perelada-main/800/600',
    gallery: [
      'https://picsum.photos/seed/perelada-g1/1200/800',
      'https://picsum.photos/seed/perelada-g2/1200/800',
      'https://picsum.photos/seed/perelada-g3/1200/800',
      'https://picsum.photos/seed/perelada-g4/1200/800',
    ],
  },
  {
    id: 'vinyes-dels-aspres',
    slug: 'vinyes-dels-aspres',
    name: 'Vinyes dels Aspres',
    region: 'emporda',
    location: 'Cantallops',
    description: {
      es: "Bodega ecológica en el Alt Empordà, en el corazón del Parc Natural de l'Albera. Sus vinos naturales capturan el espíritu de la tramontana y la influencia del Mediterráneo en los suelos graníticos de Cantallops.",
      en: "An organic winery in the Alt Empordà, in the heart of the Parc Natural de l'Albera. Their natural wines capture the spirit of the tramontane wind and Mediterranean influence on the granitic soils of Cantallops.",
      ca: "Celler ecològic a l'Alt Empordà, al cor del Parc Natural de l'Albera. Els seus vins naturals capturen l'esperit de la tramuntana i la influència del Mediterrani sobre els sòls granítics de Cantallops.",
    },
    experiences: [
      {
        id: 'aspres-1',
        title: {
          es: 'Paseo por las Viñas Ecológicas',
          en: 'Organic Vineyard Walk',
          ca: 'Passeig per les Vinyes Ecològiques',
        },
        duration: 2,
        price: 30,
        type: 'tour',
      },
      {
        id: 'aspres-2',
        title: {
          es: 'Vendimia y Cata de Vino Natural',
          en: 'Harvest & Natural Wine Tasting',
          ca: 'Verema i Tast de Vi Natural',
        },
        duration: 4,
        price: 50,
        type: 'harvest',
      },
    ],
    rating: 4.6,
    image: 'https://picsum.photos/seed/aspres-main/800/600',
    gallery: [
      'https://picsum.photos/seed/aspres-g1/1200/800',
      'https://picsum.photos/seed/aspres-g2/1200/800',
      'https://picsum.photos/seed/aspres-g3/1200/800',
      'https://picsum.photos/seed/aspres-g4/1200/800',
    ],
  },

  // ── ALELLA ────────────────────────────────────────────────────────────────
  {
    id: 'alta-alella',
    slug: 'alta-alella',
    name: 'Alta Alella',
    region: 'alella',
    location: 'Alella',
    description: {
      es: 'Alta Alella es la bodega biodinámica más cercana a Barcelona. En plena DO Alella, elabora vinos de una pureza y elegancia excepcionales, con viñedos en el Parque Natural de la Serra de Marina.',
      en: 'Alta Alella is the biodynamic winery closest to Barcelona. In DO Alella, it crafts wines of exceptional purity and elegance, with vineyards in the Parc Natural de la Serra de Marina.',
      ca: "Alta Alella és el celler biodinàmic més proper a Barcelona. A la DO Alella, elabora vins d'una puresa i elegància excepcionals, amb vinyes al Parc Natural de la Serra de Marina.",
    },
    experiences: [
      {
        id: 'alta-alella-1',
        title: {
          es: 'Maridaje entre Viñas',
          en: 'Food & Wine Pairing Among Vines',
          ca: 'Maridatge entre Vinyes',
        },
        duration: 2,
        price: 42,
        type: 'pairing',
      },
      {
        id: 'alta-alella-2',
        title: {
          es: 'Visita Biodinámica al Celler',
          en: 'Biodynamic Winery Tour',
          ca: 'Visita Biodinàmica al Celler',
        },
        duration: 2,
        price: 35,
        type: 'tour',
      },
    ],
    rating: 4.8,
    image: 'https://picsum.photos/seed/alta-alella-main/800/600',
    gallery: [
      'https://picsum.photos/seed/alta-alella-g1/1200/800',
      'https://picsum.photos/seed/alta-alella-g2/1200/800',
      'https://picsum.photos/seed/alta-alella-g3/1200/800',
      'https://picsum.photos/seed/alta-alella-g4/1200/800',
    ],
  },
  {
    id: 'bouquet-dalella',
    slug: 'bouquet-dalella',
    name: "Bouquet d'Alella",
    region: 'alella',
    location: 'Alella',
    description: {
      es: "La cooperativa Bouquet d'Alella es la guardiana de la DO Alella, elaborando vinos del territorio desde hace décadas. Su emblemático Marfil, blanco de la variedad autóctona Pansa Blanca, es un clásico de la viticultura catalana.",
      en: "The Bouquet d'Alella cooperative is the guardian of DO Alella, crafting wines from the territory for decades. Their iconic Marfil, a white from the native Pansa Blanca variety, is a classic of Catalan viticulture.",
      ca: "La cooperativa Bouquet d'Alella és la guardiana de la DO Alella, elaborant vins del territori des de fa dècades. El seu emblemàtic Marfil, blanc de la varietat autòctona Pansa Blanca, és un clàssic de la viticultura catalana.",
    },
    experiences: [
      {
        id: 'bouquet-1',
        title: {
          es: 'Cata Guiada de Blancos de Alella',
          en: 'Guided Tasting of Alella Whites',
          ca: "Tast Guiat de Blancs d'Alella",
        },
        duration: 1.5,
        price: 25,
        type: 'tasting',
      },
      {
        id: 'bouquet-2',
        title: {
          es: 'Vino y Tapas: Taller de Maridaje',
          en: 'Wine & Tapas: Pairing Workshop',
          ca: 'Vi i Tapes: Taller de Maridatge',
        },
        duration: 2.5,
        price: 45,
        type: 'workshop',
      },
    ],
    rating: 4.4,
    image: 'https://picsum.photos/seed/bouquet-alella-main/800/600',
    gallery: [
      'https://picsum.photos/seed/bouquet-alella-g1/1200/800',
      'https://picsum.photos/seed/bouquet-alella-g2/1200/800',
      'https://picsum.photos/seed/bouquet-alella-g3/1200/800',
      'https://picsum.photos/seed/bouquet-alella-g4/1200/800',
    ],
  },

  // ── BAGES ─────────────────────────────────────────────────────────────────
  {
    id: 'abadal',
    slug: 'abadal',
    name: 'Abadal',
    region: 'bages',
    location: 'Artés',
    description: {
      es: 'Abadal es el referente del Bages, con viñedos en la finca Mas Pons a 450 metros de altitud. Sus vinos mediterráneos combinan la frescura de la altitud con la riqueza del interior catalán.',
      en: 'Abadal is the benchmark of Bages, with vineyards at the Mas Pons estate at 450 metres altitude. Their Mediterranean wines combine the freshness of altitude with the richness of inland Catalonia.',
      ca: "Abadal és el referent del Bages, amb vinyes a la finca Mas Pons a 450 metres d'altitud. Els seus vins mediterranis combinen la frescor de l'altitud amb la riquesa de l'interior català.",
    },
    experiences: [
      {
        id: 'abadal-1',
        title: {
          es: 'Visita a los Viñedos y Cata',
          en: 'Vineyard Tour & Tasting',
          ca: 'Visita a les Vinyes i Tast',
        },
        duration: 2,
        price: 28,
        type: 'tour',
      },
      {
        id: 'abadal-2',
        title: {
          es: 'Cena Privada entre Viñedos',
          en: 'Private Vineyard Dinner',
          ca: 'Sopar Privat entre Vinyes',
        },
        duration: 4,
        price: 85,
        type: 'pairing',
      },
    ],
    rating: 4.6,
    image: 'https://picsum.photos/seed/abadal-main/800/600',
    gallery: [
      'https://picsum.photos/seed/abadal-g1/1200/800',
      'https://picsum.photos/seed/abadal-g2/1200/800',
      'https://picsum.photos/seed/abadal-g3/1200/800',
      'https://picsum.photos/seed/abadal-g4/1200/800',
    ],
  },
  {
    id: 'el-cep',
    slug: 'el-cep',
    name: 'El Cep',
    region: 'bages',
    location: 'Artés',
    description: {
      es: 'Celler El Cep combina la producción de cava de calidad bajo la marca Marquès de Gelida con vinos tranquilos del Bages. Una bodega que ha sabido preservar la tradición mientras abraza técnicas modernas de vinificación.',
      en: 'Celler El Cep combines quality cava production under the Marquès de Gelida brand with still wines from Bages. A winery that has preserved tradition while embracing modern winemaking techniques.',
      ca: "El Cep combina la producció de cava de qualitat sota la marca Marquès de Gelida amb vins tranquils del Bages. Un celler que ha sabut preservar la tradició mentre abraça tècniques modernes de vinificació.",
    },
    experiences: [
      {
        id: 'el-cep-1',
        title: {
          es: 'Tour del Cava Marquès de Gelida',
          en: 'Marquès de Gelida Cava Tour',
          ca: 'Tour del Cava Marquès de Gelida',
        },
        duration: 2,
        price: 30,
        type: 'tour',
      },
      {
        id: 'el-cep-2',
        title: {
          es: 'Taller de Vendimia y Cava',
          en: 'Harvest & Cava Workshop',
          ca: 'Taller de Verema i Cava',
        },
        duration: 3,
        price: 50,
        type: 'workshop',
      },
    ],
    rating: 4.5,
    image: 'https://picsum.photos/seed/el-cep-main/800/600',
    gallery: [
      'https://picsum.photos/seed/el-cep-g1/1200/800',
      'https://picsum.photos/seed/el-cep-g2/1200/800',
      'https://picsum.photos/seed/el-cep-g3/1200/800',
      'https://picsum.photos/seed/el-cep-g4/1200/800',
    ],
  },
]

export function getWineryBySlug(slug: string): Winery | undefined {
  return wineries.find((w) => w.slug === slug)
}

export function getAllSlugs(): string[] {
  return wineries.map((w) => w.slug)
}
