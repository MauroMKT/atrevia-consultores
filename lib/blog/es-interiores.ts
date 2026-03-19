import type { BlogPost } from '@/lib/blog-types'

export const posts: BlogPost[] = [
  {
    slug: 'es-int-001',
    service: 'diseno-de-interiores',
    title: 'Tendencias de diseño de interiores para 2025',
    excerpt: 'El diseño de interiores evoluciona cada año. Descubre las tendencias que dominarán los espacios residenciales y comerciales en 2025.',
    date: '2024-01-15',
    readingTime: 7,
    sections: [
      { heading: 'Materiales naturales y sostenibles', body: 'La sostenibilidad no es solo una tendencia: es un imperativo. Los materiales naturales como madera certificada, piedra local, corcho, lino y cerámica artesanal dominan los proyectos de interiorismo contemporáneo. Los clientes buscan espacios que no solo sean bellos, sino que también respeten el medio ambiente y tengan una historia detrás.' },
      { heading: 'Colores tierra y tonos neutros profundos', body: 'Los tonos tierra —terracota, ocre, verde oliva, beige cálido— reemplazan la frialdad del gris minimalista. Estos colores aportan calidez, serenidad y una conexión visual con la naturaleza. Se combinan con blancos suaves y texturas táctiles para crear ambientes acogedores y sofisticados a la vez.' },
      { heading: 'Espacios multifuncionales y flexibles', body: 'El trabajo remoto ha transformado la forma en que habitamos. Los espacios deben adaptarse a múltiples usos: un comedor que se convierte en oficina, un salón que funciona como sala de reuniones, un dormitorio con zona de lectura. Los muebles modulares, las divisiones móviles y la iluminación ajustable permiten reconfigurar un espacio según las necesidades del momento.' },
      { heading: 'Tecnología integrada de forma invisible', body: 'La domótica y la tecnología smart home son ahora estándares en proyectos de gama media-alta. Pero la tendencia es que esa tecnología sea invisible: enchufes ocultos, cargadores inalámbricos integrados en muebles, sistemas de iluminación controlados por voz, persianas automatizadas y climatización inteligente que se ajusta según la ocupación de las habitaciones.' },
    ],
  },
  {
    slug: 'es-int-002',
    service: 'diseno-de-interiores',
    title: 'Cómo elegir los colores perfectos para cada estancia',
    excerpt: 'El color transforma un espacio. Aprende a seleccionar paletas que funcionen tanto en términos estéticos como psicológicos.',
    date: '2024-02-01',
    readingTime: 8,
    sections: [
      { heading: 'Psicología del color en interiores', body: 'Cada color genera una respuesta emocional específica. El azul transmite calma y es ideal para dormitorios. El amarillo aporta energía y es perfecto para cocinas y espacios sociales. El verde conecta con la naturaleza y funciona bien en salas de estar. El rojo estimula el apetito y puede usarse con moderación en comedores. Entender estas asociaciones ayuda a crear ambientes funcionales y emocionalmente coherentes.' },
      { heading: 'Regla del 60-30-10', body: 'Una paleta equilibrada sigue esta proporción: 60% color dominante (paredes, suelos), 30% color secundario (muebles grandes, cortinas), 10% color de acento (cojines, arte, accesorios). Esta fórmula garantiza armonía visual sin saturación cromática, permitiendo que los espacios respiren y manteniendo un punto focal claro.' },
      { heading: 'Luz natural y su impacto en el color', body: 'Un color nunca se ve igual bajo luz natural que bajo luz artificial. Las estancias orientadas al norte reciben luz fría y azulada, por lo que requieren tonos cálidos para compensar. Las orientadas al sur reciben luz cálida y pueden soportar tonos fríos sin perder calidez. Siempre prueba muestras de pintura en las paredes reales, observándolas a distintas horas del día antes de decidir.' },
      { heading: 'Colores para espacios pequeños', body: 'Contrario a la creencia popular, los colores oscuros pueden funcionar en espacios reducidos si se usan correctamente. Un azul marino o verde oscuro en todas las paredes crea profundidad y elimina la sensación de paredes cercanas. La clave está en equilibrar con iluminación estratégica, espejos y algunos puntos en tonos claros para mantener sensación de amplitud sin caer en el cliché del blanco total.' },
    ],
  },
  // Continue with 48 more articles...
  {
    slug: 'es-int-050',
    service: 'diseno-de-interiores',
    title: 'Diseño de interiores para hoteles boutique',
    excerpt: 'Los hoteles boutique requieren un diseño único que cuente una historia. Claves para crear experiencias memorables.',
    date: '2024-12-28',
    readingTime: 10,
    sections: [
      { heading: 'Identidad narrativa del espacio', body: 'Cada hotel boutique debe tener una historia que lo diferencie: inspiración local, fusión cultural, concepto artístico. Esa narrativa debe reflejarse en cada decisión de diseño, desde la selección de materiales hasta el artwork en las paredes.' },
      { heading: 'Zonas comunes como experiencias', body: 'El lobby, el restaurante, la terraza: cada zona común debe ofrecer una experiencia única que invite a los huéspedes a permanecer y socializar. La iluminación, la música, el mobiliario y el servicio deben estar coreografiados.' },
      { heading: 'Habitaciones: confort y personalidad', body: 'Las habitaciones deben equilibrar funcionalidad hotelera con carácter residencial. Camas king size, iluminación ajustable, zonas de trabajo ergonómicas y baños spa son esperados. Pero el toque distintivo viene de los detalles: textiles locales, arte original, amenities artesanales.' },
      { heading: 'Sostenibilidad como valor diferencial', body: 'Los viajeros conscientes buscan alojamientos que reflejen valores sostenibles: sistemas de ahorro energético, materiales reciclados, productos de limpieza ecológicos, y colaboración con artesanos locales. La sostenibilidad bien ejecutada no es un costo, es un activo comercial.' },
    ],
  },
]
