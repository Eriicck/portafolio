// Servicios: alimentan el menú, las tarjetas de "Áreas de trabajo" y las páginas /services/<slug>.
// `icon` es el nombre de un ícono de Lucide (ver src/components/ServiceIcon.astro).

export const SERVICES = [
  {
    slug: 'web', icon: 'web', accent: '#22c55e',
    name: 'Web & Landing', menuSub: 'Presencia digital de alto impacto', areaDesc: 'Presencia digital de alto impacto.',
    title: 'Web &', accentTitle: 'Landing Pages',
    subtitle: 'Presencia digital de alto impacto. Cada proyecto construido pensando en rendimiento, SEO y mobile-first.',
    features: [
      { title: 'Diseño Responsive',    desc: 'Optimizado para cada dispositivo — móvil, tablet y escritorio.' },
      { title: 'SEO Optimizado',       desc: 'Estructurado para motores de búsqueda desde el primer día.' },
      { title: 'Integración WhatsApp', desc: 'Conexión directa a tu WhatsApp Business.' },
      { title: 'Alta Performance',     desc: 'Carga rápida con Vite y herramientas modernas.' },
      { title: 'Diseño Personalizado', desc: 'Identidad visual única adaptada a tu marca.' },
      { title: 'Panel Admin',          desc: 'Editá tu contenido sin tocar una línea de código.' },
    ],
    ctaTitle: '¿Listo para construir tu presencia web?',
    ctaDesc: 'Cuéntame tu proyecto y te respondo en menos de 24 horas.',
  },
  {
    slug: 'ecommerce', icon: 'ecommerce', accent: '#f59e0b',
    name: 'E-commerce', menuSub: 'Tiendas y MercadoLibre', areaDesc: 'Tiendas con carrito a WhatsApp.',
    title: 'E-commerce &', accentTitle: 'MercadoLibre',
    subtitle: 'Desde tiendas con checkout por WhatsApp hasta gestión completa de catálogo en MercadoLibre.',
    features: [
      { title: 'Carrito a WhatsApp',       desc: 'Los pedidos llegan directo a tu WhatsApp Business.' },
      { title: 'Carga Masiva por Excel',   desc: 'Importá cientos de productos en un solo archivo.' },
      { title: 'Control de Stock',         desc: 'Inventario y precios actualizados en tiempo real.' },
      { title: 'Integración MercadoLibre', desc: 'Publicaciones, catálogo y gestión de pedidos.' },
      { title: 'Panel Administrador',      desc: 'Control total sobre productos, ofertas y stock.' },
      { title: 'Catálogo Multicategoría',  desc: 'Navegación organizada por categoría, filtro y búsqueda.' },
    ],
    ctaTitle: '¿Listo para lanzar tu tienda?',
    ctaDesc: 'Cuéntame sobre tus productos y mercado objetivo.',
  },
  {
    slug: 'systems', icon: 'systems', accent: '#8b5cf6',
    name: 'Sistemas & SaaS', menuSub: 'CRM, turnos y dashboards', areaDesc: 'CRM, turnos y dashboards admin.',
    title: 'Sistemas &', accentTitle: 'SaaS',
    subtitle: 'Desde plataformas de turnos médicos hasta dashboards de inventario multiusuario.',
    features: [
      { title: 'CRM Personalizado',   desc: 'Gestiona clientes, leads y seguimientos en un solo lugar.' },
      { title: 'Sistema de Turnos',   desc: 'Reservas online con gestión de agenda.' },
      { title: 'Dashboard Admin',     desc: 'Panel completo con analytics y reportes.' },
      { title: 'Acceso Multiusuario', desc: 'Permisos por rol para tu equipo.' },
      { title: 'Backend Firebase',    desc: 'Base de datos en tiempo real con autenticación.' },
      { title: 'Integración Excel',   desc: 'Importa y exporta datos desde tus planillas.' },
    ],
    ctaTitle: '¿Necesitas un sistema a medida?',
    ctaDesc: 'Cuéntame tu flujo de trabajo y diseño la solución correcta.',
  },
  {
    slug: 'automation', icon: 'automation', accent: '#ec4899',
    name: 'IA & Automatización', menuSub: 'Agentes y flujos con n8n', areaDesc: 'Agentes autónomos con n8n 24/7.',
    title: 'IA &', accentTitle: 'Automatización',
    subtitle: 'Elimina tareas manuales con flujos de automatización inteligentes que trabajan 24/7.',
    features: [
      { title: 'Flujos con n8n',          desc: 'Automatización visual que conecta todas tus herramientas.' },
      { title: 'Agentes IA',              desc: 'GPT-4o entrenado con datos de tu negocio.' },
      { title: 'Automatización WhatsApp', desc: 'Respuestas y notificaciones automáticas.' },
      { title: 'Integración CRM',         desc: 'Leads capturados y registrados automáticamente.' },
      { title: 'Secuencias de Email',     desc: 'Seguimientos enviados sin intervención.' },
      { title: 'Operación 24/7',          desc: 'Sistemas que trabajan mientras descansas.' },
    ],
    ctaTitle: '¿Listo para automatizar tu negocio?',
    ctaDesc: 'Cuéntame qué tareas quieres eliminar y construyo el flujo.',
  },
]
