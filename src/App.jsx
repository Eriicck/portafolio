import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import {
  ChevronDown, ArrowRight, ArrowUpRight, X, Layers,
  Layout, ShoppingCart, LayoutDashboard, Bot,
  ExternalLink, CheckCircle2, Sun, Moon,
  Briefcase, User, SlidersHorizontal
} from 'lucide-react'

const EJS_SERVICE  = import.meta.env.VITE_EJS_SERVICE
const EJS_TEMPLATE = import.meta.env.VITE_EJS_TEMPLATE
const EJS_KEY      = import.meta.env.VITE_EJS_KEY

const FOTO = 'https://firebasestorage.googleapis.com/v0/b/misuperappmayorista.firebasestorage.app/o/Foto%20perfil%20Febrero%202026%20IA%20copia%20sin%20marca%20de%20agua.png?alt=media&token=531dac6f-fd71-49de-bdd2-434e57e600dd'

const TECH = [
  { name:'React',         logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name:'JavaScript',   logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name:'TypeScript',   logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name:'Tailwind CSS', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name:'CSS3',         logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name:'Vite',         logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
  { name:'Firebase',     logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name:'n8n',          logo:'https://upload.wikimedia.org/wikipedia/commons/5/53/N8n-logo-new.svg' },
  { name:'OpenAI',       logo:'https://cdn.worldvectorlogo.com/logos/openai-2.svg', inv:true },
  { name:'Gemini',       logo:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
  { name:'Git',          logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name:'MercadoLibre', logo:'https://res.cloudinary.com/dls6empbg/image/upload/q_auto/f_auto/v1775830580/mercado-libre-logo-png_seeklogo-653365_qy3nf8.png' },
]

const T = u => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(u)}?w=800&h=500`

const PROJECTS = [
  { id:1,  title:'GLAM Cosmetic',              cat:'ecommerce', status:'E-commerce', url:'https://glamcosmetic.netlify.app',              img:T('https://glamcosmetic.netlify.app'),              desc:'Tienda online de maquillaje y skincare premium.',         details:'E-commerce completo con catálogo de productos, carrito que envía pedidos detallados a WhatsApp, panel admin con carga masiva por Excel, control de stock y precios en tiempo real.',   stack:'React + Tailwind + Firebase. Dashboard /admin con control total de productos, ofertas y stock.',  tags:['E-commerce','WhatsApp','Admin','Excel'] },
  { id:2,  title:'Mayorista Online',            cat:'ecommerce', status:'E-commerce', url:'https://mayoristaweb.netlify.app',              img:T('https://mayoristaweb.netlify.app'),              desc:'Plataforma mayorista con catálogo y gestión de stock.',   details:'Sistema de ventas mayoristas con catálogo completo, carrito con envío a WhatsApp, panel de administración con carga masiva por Excel.',                                              stack:'React + Firebase. Admin dashboard con Excel bulk import y control multiusuario.',                 tags:['Mayorista','WhatsApp','Dashboard','Excel'] },
  { id:3,  title:'Street Cult',                 cat:'ecommerce', status:'E-commerce', url:'https://ropaaweb.netlify.app',                  img:T('https://ropaaweb.netlify.app'),                  desc:'Tienda de indumentaria urbana con carrito a WhatsApp.',   details:'Tienda online de ropa con catálogo visual por categorías (Hombres, Mujer, Niños, Accesorios), carrito inteligente que envía el pedido completo por WhatsApp.',                     stack:'React + Tailwind + Firebase. Integración directa a WhatsApp Business.',                           tags:['Indumentaria','WhatsApp','Carrito','Admin'] },
  { id:4,  title:'ContreBurger',                cat:'web',       status:'Landing',    url:'https://contreburger.com',                     img:T('https://contreburger.com'),                     desc:'Identidad digital para hamburguesería local.',            details:'Sitio web completo: menú digital interactivo, ticker de novedades animado, integración WhatsApp para pedidos y delivery. Dominio .com propio.',                                   stack:'React + Tailwind. Dominio .com propio. Optimizado para móvil y SEO local.',                       tags:['Gastronomía','Landing','WhatsApp','SEO'] },
  { id:5,  title:'Rotisería Al Paso',           cat:'web',       status:'Landing',    url:'https://rotiseriaweb.netlify.app',              img:T('https://rotiseriaweb.netlify.app'),              desc:'Menú digital y presencia online para rotisería.',         details:'Web completa con menú digital del día, ticker animado de novedades, sistema de pedidos por WhatsApp y diseño responsive mobile-first.',                                            stack:'React + Tailwind. Mobile-first design. Actualización de menú desde panel admin.',                 tags:['Gastronomía','Menú Digital','Mobile'] },
  { id:6,  title:'TuHandyman Miami',            cat:'web',       status:'Landing',    url:'https://tuhandymanmiami.netlify.app',           img:T('https://tuhandymanmiami.netlify.app'),           desc:'Servicios de handyman para el mercado USA.',              details:'Landing page de alto impacto para servicios de mantenimiento en Miami. Portafolio de proyectos con filtros por categoría, galería visual y formulario de cotización.',            stack:'React + Tailwind. Mercado USA — contacto integrado por email y WhatsApp.',                        tags:['USA','Landing','Servicios'] },
  { id:7,  title:"L'Esthétique",                cat:'web',       status:'Landing',    url:'https://cejasweb.netlify.app',                 img:T('https://cejasweb.netlify.app'),                 desc:'Web premium para salón de belleza y estética.',           details:'Sitio elegante para salón de uñas, pedicuría y diseño de miradas. Blog & tips, agenda de turnos integrada y diseño premium.',                                                    stack:'React + Tailwind. Ticker de tips animado, blog integrado y botón de reserva directo.',            tags:['Belleza','Landing','Turnos','Blog'] },
  { id:8,  title:'COT — Turnos Médicos',        cat:'systems',   status:'SaaS',       url:'https://consultorios-c770d.web.app',           img:'/proyectos/cot.jpg',                              desc:'Turnos online + panel interno para consultorio médico.',  details:'Web de turnos en 3 pasos (profesional y cobertura, día y horario, datos) con link para cancelar o cambiar el turno. Panel interno tipo CRM: agenda del día, calendario semana/mes, recordatorios por WhatsApp, ficha del paciente con historia clínica y descargas a Excel/PDF. App instalable (PWA) y modo oscuro.', stack:'Astro + React + TypeScript + Firebase. Reglas de seguridad por rol con pruebas automáticas y publicación continua con GitHub Actions.', tags:['Salud','Turnos','CRM','PWA'] },
  { id:9,  title:'Óptica — Gestión & Catálogo', cat:'systems',   status:'Demo',       url:'https://opticademo.netlify.app',               img:T('https://opticademo.netlify.app'),               desc:'Sistema completo para ópticas con panel admin.',          details:'Gestión para ópticas: catálogo de lentes por categoría (Sol, Receta, Moda, Deporte), filtros, stock y panel administrador.',                                                      stack:'React + Tailwind + Firebase. Dashboard de administración incluido.',                               tags:['Óptica','Gestión','Admin','Stock'] },
  { id:10, title:'Automatización con n8n',      cat:'automation',status:'Eficiencia', url:'',                                             img:'https://substackcdn.com/image/fetch/$s_!GuPI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd02ec635-f963-4cb9-89b6-4bc080bd9ab1_3698x2778.webp', desc:'Flujos que conectan tu negocio y eliminan tareas manuales.', details:'Diseño e implementación de flujos automatizados: Lead → CRM → WhatsApp → Email → seguimiento automático.',                                                                         stack:'n8n + Webhooks. Reducción de tareas manuales operativas en +70%.',                                tags:['n8n','Webhooks','CRM','WhatsApp'] },
  { id:11, title:'Agentes IA Autónomos',        cat:'automation',status:'Innovación', url:'',                                             img:'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/wf_itops_can_9321eac0eb.svg', desc:'Asistente inteligente de ventas y soporte 24/7.',        details:'Agentes IA entrenados con datos del negocio para atención al cliente, soporte técnico y ventas automáticas sin intervención humana.',                                            stack:'GPT-4o + n8n + RAG. Entrenado con datos propios del cliente.',                                    tags:['LLM','RAG','GPT-4o','n8n'] },
  { id:12, title:'GLAM Admin Panel',            cat:'systems',   status:'Admin',      url:'https://glamcosmetic.netlify.app/admin/login', img:T('https://glamcosmetic.netlify.app/admin/login'), desc:'Panel de administración para tienda de cosméticos.',      details:'Sistema de login con panel admin completo para gestión de productos, stock, pedidos y ofertas. Acceso seguro con Firebase Auth.',                                                  stack:'React + Firebase Auth + Firestore. Carga masiva por Excel, control total de inventario.',         tags:['Admin','Firebase','Auth','E-commerce'] },
  { id:13, title:'Comercial David — CRM',       cat:'systems',   status:'SaaS',       url:'https://comercialdavid.netlify.app/login',     img:T('https://comercialdavid.netlify.app/login'),     desc:'Sistema de gestión comercial con autenticación.',         details:'Plataforma CRM con login seguro, gestión de clientes, pedidos y reportes. Diseñada para equipos comerciales.',                                                                   stack:'React + Firebase Auth. Panel multiusuario con roles y permisos.',                                 tags:['CRM','Auth','SaaS','Gestión'] },
]

const CATS = [
  { id:'all',        label:'Todos',              icon:<SlidersHorizontal size={12}/> },
  { id:'web',        label:'Web & Landing',       icon:null },
  { id:'ecommerce',  label:'E-commerce',          icon:null },
  { id:'systems',    label:'Sistemas & SaaS',     icon:null },
  { id:'automation', label:'IA & Automatización', icon:null },
]

const AREAS = [
  { id:'web',        name:'Web & Landing',       desc:'Presencia digital de alto impacto.',     icon:<Layout size={24} strokeWidth={1.5}/>,         route:'/services/web' },
  { id:'ecommerce',  name:'E-commerce',           desc:'Tiendas con carrito a WhatsApp.',        icon:<ShoppingCart size={24} strokeWidth={1.5}/>,   route:'/services/ecommerce' },
  { id:'systems',    name:'Sistemas & SaaS',      desc:'CRM, turnos y dashboards admin.',        icon:<LayoutDashboard size={24} strokeWidth={1.5}/>, route:'/services/systems' },
  { id:'automation', name:'IA & Automatización',  desc:'Agentes autónomos con n8n 24/7.',        icon:<Bot size={24} strokeWidth={1.5}/>,            route:'/services/automation' },
]

const SERVICES_LIST = [
  { label:'Web & Landing',       sub:'Presencia digital de alto impacto', to:'/services/web',        dot:'#22c55e' },
  { label:'E-commerce',          sub:'Tiendas y MercadoLibre',            to:'/services/ecommerce',  dot:'#f59e0b' },
  { label:'Sistemas & SaaS',     sub:'CRM, turnos y dashboards',          to:'/services/systems',    dot:'#8b5cf6' },
  { label:'IA & Automatización', sub:'Agentes y flujos con n8n',          to:'/services/automation', dot:'#ec4899' },
]

const PER_PAGE = 6

// ─── SILK CANVAS ──────────────────────────────────────────────────────────────
function SilkCanvas() {
  const ref = useRef(null)
  const anim = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let time = 0, img = null, last = -Infinity, visible = true
    const speed = 0.02, scale = 2, noiseI = 0.8, FRAME_MS = 33
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight
      // createImageData lanza error con tamaño 0 (pestaña oculta, previews, bots)
      img = canvas.width > 0 && canvas.height > 0 ? ctx.createImageData(canvas.width, canvas.height) : null
    }
    resize(); window.addEventListener('resize', resize)
    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !reduceMotion) { cancelAnimationFrame(anim.current); anim.current = requestAnimationFrame(draw) }
    })
    obs.observe(canvas)
    const noise = (x,y) => { const G=2.71828; return (G*Math.sin(G*x)*G*Math.sin(G*y)*(1+x))%1 }
    const draw = (now = 0) => {
      if (!visible || document.hidden) return
      if (!reduceMotion) anim.current = requestAnimationFrame(draw)
      if (now - last < FRAME_MS) return
      last = now
      if (!img) return
      const {width:w,height:h} = canvas
      const d = img.data
      for (let x=0;x<w;x+=2) for (let y=0;y<h;y+=2) {
        const u=(x/w)*scale, v=(y/h)*scale, tO=speed*time
        const tx=u, ty=v+0.03*Math.sin(8*tx-tO)
        const pat=0.6+0.4*Math.sin(5*(tx+ty+Math.cos(3*tx+5*ty)+0.02*tO)+Math.sin(20*(tx+ty-0.1*tO)))
        const intensity=Math.max(0,pat-noise(x,y)/15*noiseI)
        const i=(y*w+x)*4
        if(i<d.length){d[i]=Math.floor(123*intensity);d[i+1]=Math.floor(116*intensity);d[i+2]=Math.floor(129*intensity);d[i+3]=255}
      }
      ctx.putImageData(img,0,0)
      const ov=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)/2)
      ov.addColorStop(0,'rgba(0,0,0,0.1)'); ov.addColorStop(1,'rgba(0,0,0,0.4)')
      ctx.fillStyle=ov; ctx.fillRect(0,0,w,h)
      time++
    }
    const onVis = () => { if (!document.hidden && visible && !reduceMotion) { cancelAnimationFrame(anim.current); anim.current = requestAnimationFrame(draw) } }
    document.addEventListener('visibilitychange', onVis)
    draw()
    return () => {
      window.removeEventListener('resize',resize); document.removeEventListener('visibilitychange', onVis)
      obs.disconnect(); cancelAnimationFrame(anim.current)
    }
  },[])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full"/>
}

// ─── VECTOR BG ────────────────────────────────────────────────────────────────
function VectorBg({ isDark, accent='#22c55e', uid='a' }) {
  const dot  = isDark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.10)'
  const ring = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id={`p-${uid}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1.5" fill={dot}/></pattern></defs>
        <rect width="100%" height="100%" fill={`url(#p-${uid})`}/>
        <circle cx="92%" cy="8%"  r="220" fill="none" stroke={accent} strokeOpacity=".18" strokeWidth="2"/>
        <circle cx="92%" cy="8%"  r="380" fill="none" stroke={accent} strokeOpacity=".09" strokeWidth="1.5"/>
        <circle cx="92%" cy="8%"  r="520" fill="none" stroke={accent} strokeOpacity=".05" strokeWidth="1"/>
        <circle cx="7%"  cy="92%" r="180" fill="none" stroke={ring}   strokeWidth="1.5"/>
        <circle cx="7%"  cy="92%" r="300" fill="none" stroke={ring}   strokeWidth="1" strokeOpacity=".5"/>
        <line x1="0%" y1="110%" x2="35%" y2="-10%" stroke={accent} strokeOpacity=".12" strokeWidth="1.5"/>
        <circle cx="8%"  cy="10%" r="60" fill={accent} fillOpacity=".07"/>
        <circle cx="18%" cy="22%" r="5"  fill={accent} fillOpacity=".35"/>
        <circle cx="82%" cy="68%" r="3.5" fill={accent} fillOpacity=".25"/>
        <circle cx="72%" cy="15%" r="2.5" fill={accent} fillOpacity=".30"/>
        <line x1="0%" y1="60%" x2="15%" y2="60%" stroke={accent} strokeOpacity=".15" strokeWidth="1.5"/>
      </svg>
    </div>
  )
}

// ─── REVEAL ───────────────────────────────────────────────────────────────────
function Reveal({ children, className='', delay=0, id }) {
  const [vis, setVis] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(e.target) } },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div id={id} ref={ref}
      className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay:`${delay}ms` }}>
      {children}
    </div>
  )
}

// ─── FLIP CARD ────────────────────────────────────────────────────────────────
function FlipCard({ p, isDark, onOpen }) {
  return (
    <div className="flip-card h-[420px] cursor-pointer" onClick={() => onOpen(p)}>
      <div className="flip-inner">
        <div className={`flip-front flex flex-col ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>
          {p.img ? (
            <div className="relative h-[55%] overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover object-top transition-transform duration-700" loading="lazy"/>
              <div className={`absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t ${isDark ? 'from-zinc-900 via-zinc-900/60 to-transparent' : 'from-white via-white/60 to-transparent'}`}/>
              <span className={`absolute top-3 left-3 text-[11px] font-mono uppercase tracking-widest px-2 py-1 rounded border backdrop-blur-sm ${isDark ? 'bg-zinc-950/70 border-zinc-700 text-zinc-300' : 'bg-white/70 border-zinc-200 text-zinc-600'}`}>{p.status}</span>
            </div>
          ) : (
            <div className={`h-[55%] flex items-center justify-center ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
              <div className="p-5 rounded-2xl bg-green-500/10 text-green-500"><Bot size={40} strokeWidth={1.2}/></div>
            </div>
          )}
          <div className="h-[45%] flex flex-col justify-between px-6 py-4">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 style={{fontFamily:'Syne,sans-serif'}} className={`text-lg font-semibold leading-tight ${isDark ? 'text-white' : 'text-black'}`}>{p.title}</h3>
                <ArrowUpRight size={16} className={isDark ? 'text-zinc-600' : 'text-zinc-300'} style={{flexShrink:0,marginTop:2}}/>
              </div>
              <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{p.desc}</p>
            </div>
            <div className={`flex flex-wrap gap-1.5 text-[11px] font-bold uppercase tracking-tighter ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {p.tags.slice(0,3).map(t => <span key={t}>#{t}</span>)}
            </div>
          </div>
        </div>
        <div className={`flip-back flex flex-col justify-center items-center text-center p-8 ${isDark ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-zinc-200'}`}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute -top-16 -right-16 w-56 h-56 rounded-full border ${isDark ? 'border-green-500/10' : 'border-green-500/15'}`}/>
            <div className={`absolute -top-8  -right-8  w-32 h-32 rounded-full border ${isDark ? 'border-green-500/15' : 'border-green-500/20'}`}/>
            <div className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full border ${isDark ? 'border-zinc-700/40' : 'border-zinc-200'}`}/>
            <div className={`absolute bottom-8 left-6 w-2 h-2 rounded-full ${isDark ? 'bg-green-500/30' : 'bg-green-500/40'}`}/>
            <div className={`absolute top-1/2 right-6 w-12 h-px ${isDark ? 'bg-green-500/20' : 'bg-green-500/25'}`}/>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className={`mb-4 p-3 rounded-xl border ${isDark ? 'bg-zinc-800 border-zinc-700 text-green-400' : 'bg-zinc-50 border-zinc-200 text-green-600'}`}>
              <Layers size={22}/>
            </div>
            <h4 style={{fontFamily:'Syne,sans-serif'}} className={`text-base font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>Stack técnico</h4>
            <p className={`text-xs leading-relaxed mb-5 max-w-[200px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{p.stack}</p>
            <div className={`text-[11px] font-bold uppercase tracking-widest py-2 px-5 rounded-full border ${isDark ? 'border-green-500/40 text-green-400' : 'border-green-600/40 text-green-700'}`}>
              Ver detalles
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ p, isDark, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose}/>
      <div className={`relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-200'}`} style={{maxHeight:'90vh',overflowY:'auto'}}>
        <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
          <div className="flex items-center gap-3">
            <h3 style={{fontFamily:'Syne,sans-serif'}} className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>{p.title}</h3>
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-full uppercase tracking-widest bg-green-500/10 text-green-500 border border-green-500/20">{p.status}</span>
          </div>
          <button onClick={onClose} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-black hover:bg-zinc-100'}`}>
            <X size={20} strokeWidth={1.5}/>
          </button>
        </div>
        {p.img && (
          <div className="w-full overflow-hidden" style={{height:220}}>
            <img src={p.img} alt={p.title} className="w-full h-full object-cover object-top"/>
          </div>
        )}
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>{p.details}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map(t => (
                <span key={t} className={`px-2 py-0.5 border rounded text-[11px] font-medium ${isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Stack</p>
            <p className={`text-xs leading-relaxed mb-5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{p.stack}</p>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                <button className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${isDark ? 'bg-white text-black hover:bg-zinc-100' : 'bg-black text-white hover:bg-zinc-800'}`}>
                  Ver en vivo <ExternalLink size={13}/>
                </button>
              </a>
            ) : (
              <button disabled className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase cursor-not-allowed ${isDark ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-100 text-zinc-400'}`}>
                Sin demo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ isDark, toggleTheme }) {
  const [scrolled,           setScrolled]           = useState(false)
  const [visible,            setVisible]            = useState(true)
  const [dropOpen,           setDropOpen]           = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()
  const dropRef   = useRef(null)
  const lastY     = useRef(0)

  useEffect(() => {
    const fn = () => {
      const current = window.scrollY
      setVisible(current < lastY.current || current < 80)
      lastY.current = current
      setScrolled(current > 20)
    }
    window.addEventListener('scroll', fn, {passive:true})
    return () => window.removeEventListener('scroll', fn)
  },[])

  useEffect(() => {
    const fn = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  },[])

  useEffect(() => { setDropOpen(false); setMobileServicesOpen(false) }, [location])

  const scrollTo = id => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:'smooth'}), 150)
    } else {
      document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
    }
  }

  const bg   = isDark ? '#09090b' : '#ffffff'
  const bord = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'
  const txt  = isDark ? '#ffffff' : '#09090b'
  const mut  = isDark ? '#a1a1aa' : '#71717a'

  return (
    <>
      {/* DESKTOP */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8 h-16 transition-all duration-500"
style={{
  transform: visible ? 'translateY(0)' : 'translateY(-100%)',
  background: scrolled ? `${bg}ee` : 'transparent',
  borderBottom: `1px solid ${scrolled ? bord : 'transparent'}`,
  backdropFilter: scrolled ? 'blur(16px)' : 'none'
}}>
        
        
        <button onClick={() => scrollTo('hero')} style={{fontFamily:'Syne,sans-serif',color:txt}} className="font-bold text-xl tracking-tight hover:text-green-500 transition-colors">
          Erick C.
        </button>
        <nav className="flex items-center gap-8">
          <div className="relative" ref={dropRef}>
            <button onClick={() => setDropOpen(o => !o)} className="flex items-center gap-1 text-sm font-medium hover:text-green-500 transition-colors" style={{color: dropOpen ? '#22c55e' : txt}}>
              Servicios <ChevronDown size={13} style={{transform: dropOpen ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.2s'}}/>
            </button>
            {dropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl border shadow-2xl p-2 z-50"
                style={{background: isDark ? '#18181b' : '#ffffff', borderColor:bord}}>
                {SERVICES_LIST.map(s => (
                  <button key={s.to} onClick={() => navigate(s.to)} className="w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors hover:bg-zinc-800/50">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{background:s.dot}}/>
                    <div>
                      <p style={{color:txt}} className="text-xs font-bold">{s.label}</p>
                      <p style={{color:mut}} className="text-[11px]">{s.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => scrollTo('perfil')} style={{color:txt}} className="text-sm font-medium hover:text-green-500 transition-colors">Perfil</button>
          <button onClick={() => scrollTo('proyectos')} style={{color:txt}} className="text-sm font-medium hover:text-green-500 transition-colors">Proyectos</button>
          <button onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{background: isDark ? '#27272a' : '#f4f4f5', color: isDark ? '#facc15' : '#71717a'}}>
            {isDark ? <Sun size={15}/> : <Moon size={15}/>}
          </button>
        </nav>
      </header>

      {/* MOBILE TOP */}
<header className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center px-5 h-14 transition-transform duration-500"
  style={{
    background:`${bg}ee`,
    borderBottom:`1px solid ${bord}`,
    backdropFilter:'blur(16px)',
    transform: visible ? 'translateY(0)' : 'translateY(-100%)'
  }}>
        
        
        <button onClick={() => scrollTo('hero')} style={{fontFamily:'Syne,sans-serif',color:txt}} className="font-bold text-base">Erick C.</button>
      </header>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around h-16 border-t "
        style={{
          background:`${bg}f5`,
          borderColor:bord,
          backdropFilter:'blur(16px)',
          
        }}>
        {[
          { id:'hero',      label:'Servicios', Icon:Briefcase, hasDropdown:true },
          { id:'perfil',    label:'Perfil',    Icon:User,      hasDropdown:false },
          { id:'proyectos', label:'Catálogo',  Icon:Layers,    hasDropdown:false },
        ].map(({id,label,Icon,hasDropdown}) => (
          <button key={id}
            onClick={() => { if (hasDropdown) setMobileServicesOpen(o => !o); else scrollTo(id) }}
            className="flex flex-col items-center gap-1" style={{color:mut}}>
            <Icon size={20} strokeWidth={1.5}/>
            <span className="text-[11px] font-medium">{label}</span>
          </button>
        ))}
        <button onClick={toggleTheme} className="flex flex-col items-center gap-1" style={{color: isDark ? '#facc15' : mut}}>
          {isDark ? <Sun size={20} strokeWidth={1.5}/> : <Moon size={20} strokeWidth={1.5}/>}
          <span className="text-[11px] font-medium">{isDark ? 'Claro' : 'Oscuro'}</span>
        </button>
      </nav>

      {/* MOBILE SERVICES OVERLAY */}
      {mobileServicesOpen && (
        <>
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/60 md:hidden" onClick={() => setMobileServicesOpen(false)}/>
          <div className="fixed bottom-16 left-4 right-4 z-50 md:hidden rounded-2xl border overflow-hidden shadow-2xl"
            style={{background: isDark ? '#18181b' : '#ffffff', borderColor:bord}}>
            {SERVICES_LIST.map(s => (
              <button key={s.to} onClick={() => { navigate(s.to); setMobileServicesOpen(false) }}
                className="w-full flex items-start gap-4 px-5 py-4 border-b last:border-b-0 text-left"
                style={{borderColor:bord}}>
                <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{background:s.dot}}/>
                <div>
                  <p style={{color:txt}} className="text-sm font-bold">{s.label}</p>
                  <p style={{color:mut}} className="text-xs mt-0.5">{s.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({ isDark }) {
  const navigate = useNavigate()
  const [heroActive, setHeroActive] = useState(false)
  const [scrollY,    setScrollY]    = useState(0)
  const [filter,     setFilter]     = useState('all')
  const [page,       setPage]       = useState(1)
  const [modal,      setModal]      = useState(null)
  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [message,    setMessage]    = useState('')
  const [formStep,   setFormStep]   = useState(0)

  useEffect(() => {
    setHeroActive(true)
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, {passive:true})
    return () => window.removeEventListener('scroll', fn)
  },[])

  useEffect(() => { setPage(1) }, [filter])

  const filtered   = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === filter)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged      = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)

  const goToPage = n => {
    setPage(n)
    setTimeout(() => document.getElementById('proyectos')?.scrollIntoView({behavior:'smooth', block:'start'}), 50)
  }

  const sendEmail = async e => {
    e.preventDefault(); setFormStep(1)
    try {
      const { default: ejs } = await import('@emailjs/browser')
      await ejs.send(EJS_SERVICE, EJS_TEMPLATE, {from_name:name, from_email:email, message}, EJS_KEY)
      setFormStep(2)
    } catch { setFormStep(3) }
  }

  const c = {
    bg:   isDark ? '#09090b' : '#f8f8f8',
    card: isDark ? '#18181b' : '#ffffff',
    bord: isDark ? '#27272a' : '#e4e4e7',
    txt:  isDark ? '#ffffff' : '#09090b',
    sub:  isDark ? '#a1a1aa' : '#52525b',
    mut:  isDark ? '#52525b' : '#a1a1aa',
  }

  return (
    <div style={{background:c.bg}}>

      {/* ══ HERO ══ */}
      <header id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        <SilkCanvas/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"/>
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <div className={`transition-all duration-700 delay-150 transform ${heroActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h1 style={{fontFamily:'Syne,sans-serif'}} className="text-5xl sm:text-6xl md:text-8xl font-bold leading-none mb-6 tracking-tight text-white">
              Sistemas que<br/><span className="text-green-500">funcionan 24/7.</span>
            </h1>
          </div>
          <div className={`transition-all duration-700 delay-300 transform ${heroActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
<p className="shine-text text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
  style={{fontFamily:'Lato, sans-serif', fontSize:'1.1rem', fontStyle:'italic'}}>
  Fullstack &amp; analista de sistemas — e-commerce, gestión y automatización IA para negocios que quieren crecer y mejorar sus resultados.
</p>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600">
          <ChevronDown size={32}/>
        </div>
      </header>

      {/* ══ ÁREAS DE TRABAJO ══ */}
      <Reveal id="work" className={`relative py-28 border-t overflow-hidden ${isDark ? 'border-zinc-900 bg-zinc-900/40' : 'border-zinc-100 bg-zinc-50'}`}>
        <VectorBg isDark={isDark} accent="#22c55e" uid="work"/>
        <div className="relative z-10 container mx-auto px-6">
          <div className="mb-20 max-w-2xl">
            <h2 style={{fontFamily:'Syne,sans-serif'}} className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Áreas de trabajo</h2>
            <p className={`text-xl font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Soluciones digitales de punta a punta — desde diseño visual hasta automatización total del negocio.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {AREAS.map(a => (
              <button key={a.id} onClick={() => navigate(a.route)}
                className={`p-7 border rounded-2xl text-left transition-all hover:border-green-500/30 hover:scale-[1.02] ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${isDark ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-zinc-50 text-black border-zinc-200'}`}>{a.icon}</div>
                <h3 style={{fontFamily:'Syne,sans-serif'}} className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{a.name}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{a.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ══ PERFIL ══ */}
      <section id="perfil">
        <Reveal className={`py-28 border-t ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-zinc-100'}`}>
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 md:order-1">
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Fullstack Developer','Analista de Sistemas','E-commerce','Marketing Digital','Freelancer'].map(t => (
                    <span key={t} className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${isDark ? 'border-zinc-700 text-zinc-400 bg-zinc-900' : 'border-zinc-200 text-zinc-500 bg-zinc-50'}`}>{t}</span>
                  ))}
                </div>
                <h2 style={{fontFamily:'Syne,sans-serif'}} className={`text-4xl md:text-6xl font-bold mb-8 leading-tight ${isDark ? 'text-white' : 'text-black'}`}>Erick Contreras</h2>
                <div className={`text-lg leading-relaxed space-y-5 font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <p>Desarrollador de software y automatizaciones radicado en <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Buenos Aires</span>. Ayudo a escalar negocios mediante la tecnología.</p>
                  <p>Me especializo en <span className="text-green-500 font-bold">creación de SaaS, E-commerce e integraciones con n8n</span>: construyendo ecosistemas que optimizan logística, ventas e IA.</p>
                </div>
              </div>
              <div className="order-1 md:order-2 relative flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/5] clip-cyborg group shadow-2xl">
                  <div className={`absolute inset-0 z-10 mix-blend-overlay ${isDark ? 'bg-gradient-to-tr from-green-900/40 to-blue-900/40 opacity-60 group-hover:opacity-40' : 'bg-gradient-to-tr from-green-100/30 to-blue-100/30 opacity-40'} transition-opacity duration-700`}/>
                  <img src={FOTO} alt="Erick Contreras" className="w-full h-full object-cover human-tech-filter transition-all duration-1000 group-hover:scale-105"/>
                  <div className={`absolute inset-0 border-2 opacity-30 pointer-events-none z-20 clip-cyborg ${isDark ? 'border-white shadow-[inset_0_0_80px_rgba(34,197,94,0.3)]' : 'border-black'}`}/>
                  <div className="absolute top-[28%] right-[12%] w-2 h-2 bg-red-500 rounded-full animate-ping z-30 shadow-[0_0_15px_red]"/>
                  <div className="absolute bottom-[22%] left-[10%] w-20 h-1 bg-green-500/80 blur-[2px] z-30 shadow-[0_0_20px_#4ade80]"/>
                </div>
                <div className={`absolute -z-10 top-8 -right-8 w-full h-full border-2 border-dashed rounded-[3rem] opacity-10 ${isDark ? 'border-green-500' : 'border-zinc-400'}`}/>
                <div className={`absolute -bottom-6 -left-6 z-20 px-5 py-4 rounded-2xl border shadow-2xl backdrop-blur-md ${isDark ? 'bg-zinc-900/90 border-zinc-700' : 'bg-white/90 border-zinc-200'}`}
                  style={{transform:`translateY(${scrollY * -0.06}px)`}}>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Stack principal</p>
                  <p style={{fontFamily:'Syne,sans-serif'}} className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>React · Firebase · n8n</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                    <span className={`text-[11px] font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Disponible para proyectos</span>
                  </div>
                </div>
                <div className={`absolute -top-4 -right-4 z-20 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md ${isDark ? 'bg-zinc-900/90 border-zinc-700' : 'bg-white/90 border-zinc-200'}`}
                  style={{transform:`translateY(${scrollY * 0.04}px)`}}>
                  <p className={`text-[11px] font-bold uppercase tracking-widest mb-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Proyectos</p>
                  <p style={{fontFamily:'Syne,sans-serif'}} className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>11+</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ TECH TICKER ══ */}
      <section className={`py-16 border-t overflow-hidden ${isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-100 bg-white'}`}>
        <p className={`text-center text-[11px] font-bold uppercase tracking-[0.3em] mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Stack tecnológico</p>
        <div className="relative">
          <div className={`absolute left-0 top-0 w-20 h-full z-10 pointer-events-none ${isDark ? 'bg-gradient-to-r from-zinc-950 to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`}/>
          <div className={`absolute right-0 top-0 w-20 h-full z-10 pointer-events-none ${isDark ? 'bg-gradient-to-l from-zinc-950 to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`}/>
          <div className="overflow-hidden">
            <div className="ticker-wrap flex items-center gap-12 whitespace-nowrap w-max">
              {[...TECH,...TECH].map((t,i) => (
                <div key={i} className="ticker-item flex flex-col items-center gap-2 shrink-0 cursor-default">
                  <img src={t.logo} alt={t.name} className="h-9 w-auto object-contain" style={{filter: t.inv ? (isDark ? 'invert(1)' : 'none') : 'none'}}/>
                  <span className={`text-[11px] font-mono tracking-widest ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROYECTOS ══ */}
      <section id="proyectos" className={`py-32 border-t ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-zinc-50 border-zinc-100'}`}>
        <div className="container mx-auto px-6">
          <Reveal className="mb-16 flex flex-col gap-8">
            <h2 style={{fontFamily:'Syne,sans-serif'}} className={`text-4xl md:text-7xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Mis Proyectos</h2>
            <div className="flex flex-wrap gap-3">
              {CATS.map(cat => (
                <button key={cat.id} onClick={() => setFilter(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300
                    ${filter === cat.id
                      ? (isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                      : (isDark ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500' : 'border-zinc-300 text-zinc-500 hover:border-zinc-400')}`}>
                  {cat.icon}{cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paged.map((p,i) => (
              <Reveal key={p.id} delay={i*80}>
                <FlipCard p={p} isDark={isDark} onOpen={setModal}/>
              </Reveal>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              <button onClick={() => goToPage(Math.max(1,page-1))} disabled={page===1}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all disabled:opacity-30 ${isDark ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500' : 'border-zinc-300 text-zinc-500'}`}>←</button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(n => (
                <button key={n} onClick={() => goToPage(n)}
                  className={`w-9 h-9 rounded-full text-xs font-bold border transition-all
                    ${n===page ? (isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black') : (isDark ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500' : 'border-zinc-300 text-zinc-500')}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => goToPage(Math.min(totalPages,page+1))} disabled={page===totalPages}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all disabled:opacity-30 ${isDark ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500' : 'border-zinc-300 text-zinc-500'}`}>→</button>
            </div>
          )}
        </div>
      </section>

{/* ══ CONTACTO ══ */}
      <section id="contacto" className="relative pb-32 md:pb-0 overflow-hidden">
        <div className={`absolute inset-0 parallax-contact ${isDark ? 'opacity-20' : 'opacity-10'}`}/>
        <div className={`absolute inset-0 ${isDark ? 'bg-zinc-950/90' : 'bg-white/92'}`}/>

        <div className="relative z-10 flex flex-col">

          {/* CONTACTO — grande centrado */}
          <Reveal className="pt-24 pb-10 text-center px-6">
            <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-4xl md:text-6xl font-bold text-green-500">
              CONTACTO
            </h2>
          </Reveal>

          {/* LÍNEA SEPARADORA */}
          <div className={`w-full h-px ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}/>

          {/* SPLIT */}
          <div className="flex-1 grid md:grid-cols-2 relative">

            {/* IZQUIERDA — pregunta + párrafo */}
            <div className="flex flex-col justify-center px-10 md:px-16 py-10 md:py-0"
              style={{background: isDark ? '#09090b' : '#f8f8f8'}}>
              <Reveal>
                <h3 style={{fontFamily:'Syne,sans-serif'}} className={`text-4xl md:text-5xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                  ¿Tienes algo<br/><span className="text-green-500">en mente?</span>
                </h3>
                <p className={`text-lg font-light leading-relaxed max-w-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Cuéntame tu idea — te respondo en menos de 24 horas.
                </p>
              </Reveal>
            </div>

            {/* SEPARADOR VERTICAL */}
            <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-px ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}/>

            {/* DERECHA — formulario */}
            <div className="flex flex-col justify-center px-10 md:px-16 py-16 md:py-0">
              <Reveal delay={150}>
                {formStep === 2 ? (
                  <div className="flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                      <CheckCircle2 size={40}/>
                    </div>
                    <h3 style={{fontFamily:'Syne,sans-serif'}} className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>¡Mensaje enviado!</h3>
                    <p className={`font-light ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Te respondo en menos de 24 horas.</p>
                  </div>
                ) : (
                  <form onSubmit={sendEmail} className="space-y-8">
                    <div className="space-y-8">
                      {[
                        {label:'Tu nombre', val:name,  set:setName,  type:'text',  ph:'Juan Pérez'},
                        {label:'Tu email',  val:email, set:setEmail, type:'email', ph:'juan@ejemplo.com'},
                      ].map(f => (
                        <div key={f.label}>
                          <label className={`block text-[11px] font-bold uppercase tracking-[0.2em] mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{f.label}</label>
                          <input required type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                            className={`w-full px-0 py-2 bg-transparent border-b-2 outline-none transition-all duration-300 text-base
                              ${isDark ? 'border-zinc-800 focus:border-green-500 text-white placeholder:text-zinc-500' : 'border-zinc-300 focus:border-black text-black placeholder:text-zinc-300'}`}/>
                        </div>
                      ))}
                      <div>
                        <label className={`block text-[11px] font-bold uppercase tracking-[0.2em] mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>¿En qué puedo ayudarte?</label>
                        <textarea required rows={4} value={message} onChange={e=>setMessage(e.target.value)}
                          placeholder="Cuéntame tu proyecto, idea o lo que necesitas..."
                          className={`w-full px-0 py-2 bg-transparent border-b-2 outline-none transition-all duration-300 resize-none text-base
                            ${isDark ? 'border-zinc-800 focus:border-green-500 text-white placeholder:text-zinc-500' : 'border-zinc-300 focus:border-black text-black placeholder:text-zinc-300'}`}/>
                      </div>
                    </div>
                    {formStep === 3 && <p className="text-xs text-red-400">Algo salió mal. Escríbeme a contrerasc479@gmail.com</p>}
                    <button type="submit" disabled={formStep===1}
                      className={`w-full py-5 rounded-2xl font-bold text-[11px] tracking-[0.3em] uppercase transition-all group flex items-center justify-center gap-3 disabled:opacity-50
                        ${isDark ? 'bg-white text-black hover:bg-zinc-100' : 'bg-black text-white hover:bg-zinc-800'}`}>
                      {formStep===1 ? 'Enviando...' : 'Enviar mensaje'}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                    <p className="text-center text-[11px] text-zinc-500">
                      Respuesta garantizada en menos de 24 horas.
                    </p>
                  </form>
                )}
              </Reveal>
            </div>

          </div>{/* cierra grid */}
        </div>{/* cierra flex col */}
      </section>

      {/* ══ FOOTER ══ */}
      <footer className={`border-t py-6 mb-16 md:mb-0 ${isDark ? 'border-zinc-900 bg-zinc-950 text-zinc-400' : 'border-zinc-200 bg-white text-zinc-400'}`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span style={{fontFamily:'Syne,sans-serif'}} className="font-bold tracking-tighter text-lg">Erick C.</span>
            <span className="text-xs uppercase tracking-[0.3em] font-medium">&mdash; 2026</span>
          </div>
          
        </div>
      </footer>

      {modal && <Modal p={modal} isDark={isDark} onClose={() => setModal(null)}/>}
    </div>
  )
}

// ─── PÁGINAS DE SERVICIOS ─────────────────────────────────────────────────────
function ServicePage({ isDark, accent, Icon, title, accentTitle, subtitle, features, ctaTitle, ctaDesc }) {
  const navigate = useNavigate()
  const c = {
    bg:   isDark ? '#09090b' : '#f8f8f8',
    card: isDark ? '#18181b' : '#ffffff',
    bord: isDark ? '#27272a' : '#e4e4e7',
    txt:  isDark ? '#ffffff' : '#09090b',
    sub:  isDark ? '#a1a1aa' : '#52525b',
  }
  const goContact = () => { navigate('/'); setTimeout(()=>document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'}),150) }
  const goProjects = () => { navigate('/'); setTimeout(()=>document.getElementById('proyectos')?.scrollIntoView({behavior:'smooth'}),150) }

  return (
    <div className="min-h-screen pt-24 pb-28 md:pb-16 px-6" style={{background:c.bg}}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{background:`${accent}18`,color:accent}}>
              <Icon size={26} strokeWidth={1.5}/>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{color:accent}}>Servicio</span>
          </div>
          <h1 style={{fontFamily:'Syne,sans-serif',color:c.txt}} className="text-4xl sm:text-6xl font-bold mb-4 leading-tight">
            {title}<br/><span style={{color:accent}}>{accentTitle}</span>
          </h1>
          <p className="text-lg font-light mb-16" style={{color:c.sub}}>{subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {features.map((f,i) => (
            <Reveal key={i} delay={i*60}>
              <div className="flex items-start gap-4 p-5 rounded-2xl border" style={{background:c.card,borderColor:c.bord}}>
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{background:accent}}/>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{color:c.txt}}>{f.title}</p>
                  <p className="text-xs leading-relaxed" style={{color:c.sub}}>{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="p-8 rounded-3xl border text-center" style={{background:c.card,borderColor:c.bord}}>
            <h3 style={{fontFamily:'Syne,sans-serif',color:c.txt}} className="text-2xl font-bold mb-3">{ctaTitle}</h3>
            <p className="text-sm mb-6" style={{color:c.sub}}>{ctaDesc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={goContact} className="px-8 py-3 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center gap-2 transition-all hover:opacity-90"
                style={{background: isDark ? '#ffffff' : '#09090b', color: isDark ? '#09090b' : '#ffffff'}}>
                Contactame <ArrowRight size={14}/>
              </button>
              <button onClick={goProjects} className="px-8 py-3 rounded-xl font-bold text-xs tracking-widest uppercase border transition-all hover:border-green-500 hover:text-green-500"
                style={{borderColor:c.bord,color:c.sub}}>
                Ver proyectos
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

function ServiceWeb({ isDark }) {
  return <ServicePage isDark={isDark} accent="#22c55e" Icon={Layout} title="Web &" accentTitle="Landing Pages"
    subtitle="Presencia digital de alto impacto. Cada proyecto construido pensando en rendimiento, SEO y mobile-first."
    features={[
      {title:'Diseño Responsive',    desc:'Optimizado para cada dispositivo — móvil, tablet y escritorio.'},
      {title:'SEO Optimizado',       desc:'Estructurado para motores de búsqueda desde el primer día.'},
      {title:'Integración WhatsApp', desc:'Conexión directa a tu WhatsApp Business.'},
      {title:'Alta Performance',     desc:'Carga rápida con Vite y herramientas modernas.'},
      {title:'Diseño Personalizado', desc:'Identidad visual única adaptada a tu marca.'},
      {title:'Panel Admin',          desc:'Editá tu contenido sin tocar una línea de código.'},
    ]}
    ctaTitle="¿Listo para construir tu presencia web?"
    ctaDesc="Cuéntame tu proyecto y te respondo en menos de 24 horas."/>
}

function ServiceEcommerce({ isDark }) {
  return <ServicePage isDark={isDark} accent="#f59e0b" Icon={ShoppingCart} title="E-commerce &" accentTitle="MercadoLibre"
    subtitle="Desde tiendas con checkout por WhatsApp hasta gestión completa de catálogo en MercadoLibre."
    features={[
      {title:'Carrito a WhatsApp',       desc:'Los pedidos llegan directo a tu WhatsApp Business.'},
      {title:'Carga Masiva por Excel',   desc:'Importá cientos de productos en un solo archivo.'},
      {title:'Control de Stock',         desc:'Inventario y precios actualizados en tiempo real.'},
      {title:'Integración MercadoLibre', desc:'Publicaciones, catálogo y gestión de pedidos.'},
      {title:'Panel Administrador',      desc:'Control total sobre productos, ofertas y stock.'},
      {title:'Catálogo Multicategoría',  desc:'Navegación organizada por categoría, filtro y búsqueda.'},
    ]}
    ctaTitle="¿Listo para lanzar tu tienda?"
    ctaDesc="Cuéntame sobre tus productos y mercado objetivo."/>
}

function ServiceSystems({ isDark }) {
  return <ServicePage isDark={isDark} accent="#8b5cf6" Icon={LayoutDashboard} title="Sistemas &" accentTitle="SaaS"
    subtitle="Desde plataformas de turnos médicos hasta dashboards de inventario multiusuario."
    features={[
      {title:'CRM Personalizado',   desc:'Gestiona clientes, leads y seguimientos en un solo lugar.'},
      {title:'Sistema de Turnos',   desc:'Reservas online con gestión de agenda.'},
      {title:'Dashboard Admin',     desc:'Panel completo con analytics y reportes.'},
      {title:'Acceso Multiusuario', desc:'Permisos por rol para tu equipo.'},
      {title:'Backend Firebase',    desc:'Base de datos en tiempo real con autenticación.'},
      {title:'Integración Excel',   desc:'Importa y exporta datos desde tus planillas.'},
    ]}
    ctaTitle="¿Necesitas un sistema a medida?"
    ctaDesc="Cuéntame tu flujo de trabajo y diseño la solución correcta."/>
}

function ServiceAutomation({ isDark }) {
  return <ServicePage isDark={isDark} accent="#ec4899" Icon={Bot} title="IA &" accentTitle="Automatización"
    subtitle="Elimina tareas manuales con flujos de automatización inteligentes que trabajan 24/7."
    features={[
      {title:'Flujos con n8n',          desc:'Automatización visual que conecta todas tus herramientas.'},
      {title:'Agentes IA',              desc:'GPT-4o entrenado con datos de tu negocio.'},
      {title:'Automatización WhatsApp', desc:'Respuestas y notificaciones automáticas.'},
      {title:'Integración CRM',         desc:'Leads capturados y registrados automáticamente.'},
      {title:'Secuencias de Email',     desc:'Seguimientos enviados sin intervención.'},
      {title:'Operación 24/7',          desc:'Sistemas que trabajan mientras descansas.'},
    ]}
    ctaTitle="¿Listo para automatizar tu negocio?"
    ctaDesc="Cuéntame qué tareas quieres eliminar y construyo el flujo."/>
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const s = localStorage.getItem('theme')
    return s ? s === 'dark' : true
  })
  const toggle = () => setIsDark(d => {
    localStorage.setItem('theme', !d ? 'dark' : 'light')
    return !d
  })

  return (
    <div style={{minHeight:'100vh', background: isDark ? '#09090b' : '#f8f8f8'}}>
      <Navbar isDark={isDark} toggleTheme={toggle}/>
      <Routes>
        <Route path="/"                   element={<Home             isDark={isDark}/>}/>
        <Route path="/services/web"       element={<ServiceWeb       isDark={isDark}/>}/>
        <Route path="/services/ecommerce" element={<ServiceEcommerce isDark={isDark}/>}/>
        <Route path="/services/systems"   element={<ServiceSystems   isDark={isDark}/>}/>
        <Route path="/services/automation" element={<ServiceAutomation isDark={isDark}/>}/>
        <Route path="/services/marketing" element={<Navigate to="/services/automation" replace/>}/>
        <Route path="*"                   element={<Home             isDark={isDark}/>}/>
      </Routes>
    </div>
  )
}