import { useNavigate } from 'react-router-dom'
import { ArrowRight, Layout, ShoppingCart, LayoutDashboard, Bot, CheckCircle2 } from 'lucide-react'
import Reveal from '../../components/Reveal.jsx'

function ServicePage({ isDark, icon: Icon, color, title, subtitle, description, features, cta }) {
  const navigate = useNavigate()
  const bg     = isDark ? '#0a0a0a' : '#f8f8f8'
  const card   = isDark ? '#18181b' : '#ffffff'
  const border = isDark ? '#27272a' : '#e4e4e7'
  const text   = isDark ? '#ffffff' : '#09090b'
  const sub    = isDark ? '#a1a1aa' : '#52525b'

  return (
    <div className="min-h-screen pt-24 pb-28 md:pb-16 px-6" style={{ background:bg }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background:`${color}18`, color }}>
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color }}>Servicio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight" style={{ fontFamily:'Syne,sans-serif', color:text }}>{title}</h1>
          <p className="text-lg font-light mb-3" style={{ color:sub }}>{subtitle}</p>
          <p className="text-base leading-relaxed mb-16" style={{ color:sub }}>{description}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {features.map((feat, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="flex items-start gap-4 p-5 rounded-2xl border" style={{ background:card, borderColor:border }}>
                <CheckCircle2 size={18} style={{ color, flexShrink:0, marginTop:2 }} />
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color:text }}>{feat.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color:sub }}>{feat.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="p-8 rounded-3xl border text-center" style={{ background:card, borderColor:border }}>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily:'Syne,sans-serif', color:text }}>{cta.title}</h3>
            <p className="text-sm mb-6" style={{ color:sub }}>{cta.desc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => navigate('/contact')} className="px-8 py-3 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center gap-2 transition-all hover:opacity-90" style={{ background: isDark ? '#ffffff' : '#09090b', color: isDark ? '#09090b' : '#ffffff' }}>
                Contactame <ArrowRight size={14} />
              </button>
              <button onClick={() => navigate('/projects')} className="px-8 py-3 rounded-xl font-bold text-xs tracking-widest uppercase border transition-all hover:border-green-500 hover:text-green-500" style={{ borderColor:border, color:sub }}>
                Ver proyectos
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export function ServiceWeb({ isDark }) {
  return (
    <ServicePage isDark={isDark} icon={Layout} color="#22c55e"
      title="Web & Landing Pages" subtitle="Presencia digital de alto impacto."
      description="Desde una landing profesional hasta un sitio corporativo completo. Cada proyecto se construye pensando en rendimiento, SEO y diseño mobile-first."
      features={[
        { title:'Diseño Responsive',      desc:'Optimizado para cada dispositivo — móvil, tablet y escritorio.' },
        { title:'SEO Optimizado',         desc:'Estructurado para motores de búsqueda desde el primer día.' },
        { title:'Integración WhatsApp',   desc:'Conexión directa a tu WhatsApp Business.' },
        { title:'Alta Performance',       desc:'Carga rápida con Vite y herramientas modernas de build.' },
        { title:'Diseño Personalizado',   desc:'Identidad visual única adaptada a tu marca.' },
        { title:'Panel Admin',            desc:'Editá tu contenido sin tocar una línea de código.' },
      ]}
      cta={{ title:'¿Listo para construir tu presencia web?', desc:'Contame tu proyecto y te respondo en menos de 24 horas.' }}
    />
  )
}

export function ServiceEcommerce({ isDark }) {
  return (
    <ServicePage isDark={isDark} icon={ShoppingCart} color="#f59e0b"
      title="E-commerce & MercadoLibre" subtitle="Tiendas con carrito a WhatsApp y gestión de marketplace."
      description="Soluciones e-commerce completas — desde tiendas personalizadas con checkout por WhatsApp hasta gestión completa de catálogo y publicaciones en MercadoLibre."
      features={[
        { title:'Carrito a WhatsApp',       desc:'Los pedidos llegan directo a tu WhatsApp Business.' },
        { title:'Carga Masiva por Excel',   desc:'Importá cientos de productos en un solo archivo.' },
        { title:'Control de Stock',         desc:'Inventario y precios actualizados en tiempo real.' },
        { title:'Integración MercadoLibre', desc:'Publicaciones, catálogo y gestión de pedidos.' },
        { title:'Panel Administrador',      desc:'Control total sobre productos, ofertas y stock.' },
        { title:'Catálogo Multicategoría',  desc:'Navegación organizada por categoría, filtro y búsqueda.' },
      ]}
      cta={{ title:'¿Listo para lanzar tu tienda?', desc:'Contame sobre tus productos y mercado objetivo.' }}
    />
  )
}

export function ServiceSystems({ isDark }) {
  return (
    <ServicePage isDark={isDark} icon={LayoutDashboard} color="#8b5cf6"
      title="Sistemas & SaaS" subtitle="CRM, gestión de turnos y dashboards admin."
      description="Sistemas de gestión personalizados para tu flujo de trabajo específico — desde plataformas de turnos médicos hasta dashboards de inventario multiusuario."
      features={[
        { title:'CRM Personalizado',    desc:'Gestioná clientes, leads y seguimientos en un solo lugar.' },
        { title:'Sistema de Turnos',    desc:'Reservas online con gestión de agenda.' },
        { title:'Dashboard Admin',      desc:'Panel completo con analytics y reportes.' },
        { title:'Acceso Multiusuario',  desc:'Permisos por rol para tu equipo.' },
        { title:'Backend Firebase',     desc:'Base de datos en tiempo real con autenticación.' },
        { title:'Integración Excel',    desc:'Importá y exportá datos desde tus planillas.' },
      ]}
      cta={{ title:'¿Necesitás un sistema a medida?', desc:'Contame tu flujo de trabajo y diseño la solución correcta.' }}
    />
  )
}

export function ServiceAutomation({ isDark }) {
  return (
    <ServicePage isDark={isDark} icon={Bot} color="#ec4899"
      title="IA & Automatización" subtitle="Agentes autónomos con n8n corriendo 24/7."
      description="Eliminá tareas manuales con flujos de automatización inteligentes. Desde captura de leads hasta actualizaciones de CRM, notificaciones por WhatsApp y soporte con IA."
      features={[
        { title:'Flujos con n8n',          desc:'Automatización visual que conecta todas tus herramientas.' },
        { title:'Agentes IA',              desc:'GPT-4o entrenado con datos de tu negocio.' },
        { title:'Automatización WhatsApp', desc:'Respuestas y notificaciones automáticas.' },
        { title:'Integración CRM',         desc:'Leads capturados y registrados automáticamente.' },
        { title:'Secuencias de Email',     desc:'Seguimientos enviados sin mover un dedo.' },
        { title:'Operación 24/7',          desc:'Sistemas que trabajan mientras dormís.' },
      ]}
      cta={{ title:'¿Listo para automatizar tu negocio?', desc:'Contame qué tareas querés eliminar y construyo el flujo.' }}
    />
  )
}
