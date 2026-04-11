import { useNavigate } from 'react-router-dom'
import { ChevronDown, ArrowRight, Layout, ShoppingCart, LayoutDashboard, Bot } from 'lucide-react'
import SilkCanvas from '../components/SilkCanvas.jsx'
import Reveal from '../components/Reveal.jsx'
import { areasOfWork } from '../data/index.js'

const iconMap = { layout: Layout, cart: ShoppingCart, dashboard: LayoutDashboard, bot: Bot }

export default function Home({ isDark }) {
  const navigate = useNavigate()
  const bg     = isDark ? '#0a0a0a' : '#f8f8f8'
  const card   = isDark ? '#18181b' : '#ffffff'
  const border = isDark ? '#27272a' : '#e4e4e7'
  const text   = isDark ? '#ffffff' : '#09090b'
  const sub    = isDark ? '#a1a1aa' : '#52525b'
  const iconBg = isDark ? '#27272a' : '#f4f4f5'

  return (
    <div style={{ background: bg }}>
      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <SilkCanvas />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <Reveal>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold leading-none tracking-tight text-white mb-6" style={{ fontFamily:'Syne,sans-serif' }}>
              Systems that<br /><span style={{ color:'#22c55e' }}>work 24/7.</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-base sm:text-lg md:text-xl font-light text-white/70 max-w-2xl mx-auto mb-10">
              Desarrollo a medida para negocios que quieren crecer — e-commerce, sistemas de gestión, automatización IA y presencia digital.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/projects')} className="px-8 py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all hover:opacity-90 flex items-center gap-3" style={{ background:'#ffffff', color:'#09090b' }}>
                Ver proyectos <ArrowRight size={15} />
              </button>
              <button onClick={() => document.getElementById('areas')?.scrollIntoView({ behavior:'smooth' })} className="px-8 py-4 rounded-xl font-bold text-xs tracking-widest uppercase border transition-all hover:border-green-500 hover:text-green-500" style={{ border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.8)' }}>
                Servicios
              </button>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown size={24} style={{ color:'rgba(255,255,255,0.4)' }} />
        </div>
      </section>

      {/* ── ÁREAS DE TRABAJO ── */}
      <section id="areas" className="py-24 md:py-32 px-6" style={{ background: isDark ? '#09090b' : '#f4f4f5' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3" style={{ fontFamily:'Syne,sans-serif', color:text }}>
              Areas of work
            </h2>
            <p className="text-base font-light mb-16" style={{ color:sub }}>
              End-to-end digital solutions — from visual design to full business automation.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {areasOfWork.map((area, idx) => {
              const Icon = iconMap[area.icon] ?? Layout
              return (
                <Reveal key={area.id} delay={idx * 80}>
                  <button onClick={() => navigate(area.route)} className="w-full text-left p-6 rounded-2xl border transition-all duration-300 hover:border-green-500/40 hover:scale-[1.02] group" style={{ background:card, border:`1px solid ${border}` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background:iconBg }}>
                      <Icon size={20} strokeWidth={1.5} style={{ color:sub }} />
                    </div>
                    <h3 className="font-bold text-base mb-1.5" style={{ color:text, fontFamily:'Syne,sans-serif' }}>{area.name}</h3>
                    <p className="text-xs leading-relaxed" style={{ color:sub }}>{area.description}</p>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
