// ─── TECH STACK ──────────────────────────────────────────────────────────────
export const techStack = [
  { name: 'React',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'CSS3',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Vite',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
  { name: 'Firebase',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'n8n',           logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/N8n-logo-new.svg' },
  { name: 'OpenAI',        logo: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg' },
  { name: 'Google Gemini', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
  { name: 'Git',           logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'MercadoLibre',  logo: 'https://logodownload.org/wp-content/uploads/2018/10/mercado-libre-logo.png' },
]

const shot = (url) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=500`

export const projects = [
  { id:1, title:'GLAM Cosmetic', category:'ecommerce', status:'E-commerce', demoUrl:'https://glamcosmetic.netlify.app', imageUrl:shot('https://glamcosmetic.netlify.app'), desc:'Tienda online de maquillaje y skincare premium.', details:'E-commerce completo con catálogo de productos, carrito que envía pedidos detallados a WhatsApp, panel admin con carga masiva por Excel, control de stock y precios en tiempo real.', stack:'Stack: React + Tailwind + Firebase. Dashboard /admin con control total de productos, ofertas y stock.', tags:['E-commerce','WhatsApp','Admin Panel','Excel'] },
  { id:2, title:'Mayorista Online', category:'ecommerce', status:'E-commerce', demoUrl:'https://mayoristaweb.netlify.app', imageUrl:shot('https://mayoristaweb.netlify.app'), desc:'Plataforma mayorista con catálogo y gestión de stock.', details:'Sistema de ventas mayoristas con catálogo completo, carrito con envío a WhatsApp, panel de administración con carga masiva por Excel para gestión de stock, precios y ofertas.', stack:'Stack: React + Firebase. Admin dashboard con Excel bulk import y control multiusuario.', tags:['Mayorista','WhatsApp','Dashboard','Excel'] },
  { id:3, title:'Street Cult', category:'ecommerce', status:'E-commerce', demoUrl:'https://ropaaweb.netlify.app', imageUrl:shot('https://ropaaweb.netlify.app'), desc:'Tienda de indumentaria urbana con carrito a WhatsApp.', details:'Tienda online de ropa con catálogo visual por categorías (Hombres, Mujer, Niños, Accesorios), carrito inteligente que envía el pedido completo por WhatsApp. Panel admin incluido.', stack:'Stack: React + Tailwind + Firebase. Integración directa a WhatsApp Business.', tags:['Indumentaria','WhatsApp','Carrito','Admin'] },
  { id:4, title:'ContreBurger', category:'web', status:'Landing', demoUrl:'https://contreburger.com', imageUrl:shot('https://contreburger.com'), desc:'Identidad digital para hamburguesería local.', details:'Sitio web completo para restaurante: menú digital interactivo, ticker de novedades animado, integración con WhatsApp para pedidos y delivery. Dominio .com propio.', stack:'Stack: React + Tailwind. Dominio .com propio. Optimizado para móvil y SEO local.', tags:['Gastronomía','Landing','WhatsApp','SEO'] },
  { id:5, title:'Rotisería Al Paso', category:'web', status:'Landing', demoUrl:'https://rotiseriaweb.netlify.app', imageUrl:shot('https://rotiseriaweb.netlify.app'), desc:'Menú digital y presencia online para rotisería.', details:'Web completa para rotisería con menú digital del día, ticker animado de novedades, sistema de pedidos por WhatsApp y diseño responsive mobile-first.', stack:'Stack: React + Tailwind. Mobile-first design. Actualización de menú desde panel admin.', tags:['Gastronomía','Menú Digital','Mobile'] },
  { id:6, title:'TuHandyman Miami', category:'web', status:'Landing', demoUrl:'https://tuhandymanmiami.netlify.app', imageUrl:shot('https://tuhandymanmiami.netlify.app'), desc:'Servicios de handyman para el mercado USA.', details:'Landing page de alto impacto para servicios de mantenimiento en Miami. Portafolio de proyectos realizados con filtros por categoría, galería visual y formulario de cotización.', stack:'Stack: React + Tailwind. Mercado USA — contacto integrado por email y WhatsApp.', tags:['USA','Landing','Servicios','Inglés'] },
  { id:7, title:"L'Esthétique", category:'web', status:'Landing', demoUrl:'https://cejasweb.netlify.app', imageUrl:shot('https://cejasweb.netlify.app'), desc:'Web premium para salón de belleza y estética.', details:'Sitio web elegante para salón especializado en uñas, pedicuría y diseño de miradas. Sección de blog & tips, agenda de turnos integrada y diseño premium.', stack:'Stack: React + Tailwind. Ticker de tips animado, blog integrado y botón de reserva directo.', tags:['Belleza','Landing','Turnos','Blog'] },
  { id:8, title:'COT — Turnos Médicos', category:'systems', status:'SaaS', demoUrl:'https://appcot.netlify.app', imageUrl:shot('https://appcot.netlify.app'), desc:'Sistema de turnos para consultorio de ortopedia.', details:'Plataforma de gestión de turnos para consultorio de Ortopedia & Traumatología. Agenda online, obras sociales integradas (IOMA, SANCOR, GALENO, MEDIFE), especialidades y FAQ.', stack:'Stack: React + Firebase. Dr. Raul Patetta, Moreno BA. Obras sociales integradas.', tags:['Salud','Turnos','Firebase','SaaS'] },
  { id:9, title:'Óptica — Gestión & Catálogo', category:'systems', status:'Demo', demoUrl:'https://opticademo.netlify.app', imageUrl:shot('https://opticademo.netlify.app'), desc:'Sistema completo para ópticas con panel admin.', details:'Sistema de gestión para ópticas: catálogo de lentes por categoría (Sol, Receta, Moda, Deporte), filtros, gestión de stock y panel administrador con carga de productos.', stack:'Stack: React + Tailwind + Firebase. Dashboard de administración incluido.', tags:['Óptica','Gestión','Admin','Stock'] },
  { id:10, title:'Automatización con n8n', category:'automation', status:'Eficiencia', demoUrl:'', imageUrl:'https://substackcdn.com/image/fetch/$s_!GuPI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd02ec635-f963-4cb9-89b6-4bc080bd9ab1_3698x2778.webp', desc:'Flujos que conectan tu negocio y eliminan tareas manuales.', details:'Diseño e implementación de flujos automatizados: Lead → CRM → WhatsApp → Email → seguimiento automático. Integración con cualquier API o herramienta del stack.', stack:'Engine: n8n + Webhooks. Reducción de tareas manuales operativas en +70%.', tags:['n8n','Webhooks','CRM','WhatsApp'] },
  { id:11, title:'Agentes IA Autónomos', category:'automation', status:'Innovación', demoUrl:'', imageUrl:'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/wf_itops_can_9321eac0eb.svg', desc:'Asistente inteligente de ventas y soporte 24/7.', details:'Desarrollo de agentes IA entrenados con datos específicos del negocio para atención al cliente, soporte técnico y ventas automáticas sin intervención humana.', stack:'Engine: GPT-4o + n8n + RAG. Entrenado con datos propios del cliente.', tags:['LLM','RAG','GPT-4o','n8n'] },
]

export const serviceCategories = [
  { id:'all',        label:'Todos' },
  { id:'web',        label:'Web & Landing' },
  { id:'ecommerce',  label:'E-commerce' },
  { id:'systems',    label:'Sistemas & SaaS' },
  { id:'automation', label:'IA & Automatización' },
]

export const areasOfWork = [
  { id:'web',        name:'Web & Landing',      description:'Presencia digital de alto impacto.',    icon:'layout',    route:'/services/web' },
  { id:'ecommerce',  name:'E-commerce',          description:'Tiendas con carrito a WhatsApp.',       icon:'cart',      route:'/services/ecommerce' },
  { id:'systems',    name:'Sistemas & SaaS',     description:'CRM, turnos y dashboards admin.',       icon:'dashboard', route:'/services/systems' },
  { id:'automation', name:'IA & Automatización', description:'Agentes autónomos con n8n 24/7.',       icon:'bot',       route:'/services/automation' },
]

export const personal = {
  name: 'Erick Contreras',
  shortName: 'Erick C.',
  photoUrl: 'https://firebasestorage.googleapis.com/v0/b/misuperappmayorista.firebasestorage.app/o/Foto%20perfil%20Febrero%202026%20IA%20copia%20sin%20marca%20de%20agua.png?alt=media&token=531dac6f-fd71-49de-bdd2-434e57e600dd',
  roles: ['Fullstack Developer', 'Analista de Sistemas', 'E-commerce', 'Marketing Digital'],
  mainStack: 'React · Firebase · n8n',
  available: true,
  projectCount: '11+',
  bio: [
    'Desarrollador fullstack con base en <strong>Buenos Aires</strong> y perfil de analista de sistemas. 4 años construyendo soluciones reales en React, Firebase y n8n.',
    'Me especializo en <strong style="color:#4ade80">e-commerce, MercadoLibre y sistemas de gestión</strong>: desde tiendas con carrito a WhatsApp hasta automatizaciones que corren 24/7 sin intervención humana.',
    'También trabajo estrategia de <strong>redes sociales y marketing digital</strong>: contenido, Meta Ads y presencia de marca. Un perfil técnico con visión de negocio.',
  ],
  email: 'contrerasc479@gmail.com',
  whatsapp: 'https://wa.me/541136013353',
  linkedin: 'https://www.linkedin.com/in/erick-contreras-8b920a199',
  emailjs: {
    serviceId:  'TU_SERVICE_ID',
    templateId: 'TU_TEMPLATE_ID',
    publicKey:  'TU_PUBLIC_KEY',
  },
}
