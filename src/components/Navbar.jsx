import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Sun, Moon, User, Briefcase, BookOpen } from 'lucide-react'
import { personal } from '../data/index.js'

const services = [
  { label:'Web & Sistemas',    sub:'Landing pages, SaaS, gestión',  to:'/services/web',        dot:'#22c55e' },
  { label:'MercadoLibre',      sub:'E-commerce y marketplace',       to:'/services/ecommerce',  dot:'#f59e0b' },
  { label:'Redes & Marketing', sub:'Instagram, Ads y contenido',     to:'/services/marketing',  dot:'#ec4899' },
]

export default function Navbar({ isDark, onToggleTheme }) {
  const [dropOpen, setDropOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropRef  = useRef(null)
  const location = useLocation()

  const bg     = isDark ? '#0a0a0a' : '#ffffff'
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'
  const text   = isDark ? '#ffffff' : '#09090b'
  const muted  = isDark ? '#71717a' : '#a1a1aa'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { setDropOpen(false) }, [location])

  return (
    <>
      {/* DESKTOP */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8 h-16 transition-all duration-300"
        style={{ background: scrolled ? `${bg}ee` : 'transparent', borderBottom: scrolled ? `1px solid ${border}` : '1px solid transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none' }}>
        <NavLink to="/" className="font-bold text-lg tracking-tight" style={{ fontFamily:'Syne,sans-serif', color:text }}>
          {personal.shortName}
        </NavLink>
        <nav className="flex items-center gap-8">
          {/* Dropdown Servicios */}
          <div className="relative" ref={dropRef}>
            <button onClick={() => setDropOpen(o => !o)} className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-green-500" style={{ color: dropOpen ? '#22c55e' : text }}>
              Servicios
              <ChevronDown size={14} className="transition-transform duration-200" style={{ transform: dropOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            {dropOpen && (
              <div className="absolute top-full right-0 mt-3 w-64 rounded-2xl border shadow-2xl overflow-hidden" style={{ background: isDark ? '#18181b' : '#ffffff', borderColor:border }}>
                {services.map((s) => (
                  <NavLink key={s.to} to={s.to} className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-white/5">
                    <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background:s.dot }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color:text }}>{s.label}</p>
                      <p className="text-xs mt-0.5" style={{ color:muted }}>{s.sub}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/profile"  style={({ isActive }) => ({ color: isActive ? '#22c55e' : text })} className="text-sm font-medium transition-colors">Perfil</NavLink>
          <NavLink to="/projects" style={({ isActive }) => ({ color: isActive ? '#22c55e' : text })} className="text-sm font-medium transition-colors">Proyectos</NavLink>
          <button onClick={onToggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: isDark ? '#27272a' : '#f4f4f5', color: isDark ? '#facc15' : '#71717a' }}>
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </nav>
      </header>

      {/* MOBILE TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-5 h-14"
        style={{ background:`${bg}ee`, borderBottom:`1px solid ${border}`, backdropFilter:'blur(16px)' }}>
        <NavLink to="/" className="font-bold text-base tracking-tight" style={{ fontFamily:'Syne,sans-serif', color:text }}>
          {personal.shortName}
        </NavLink>
      </header>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around h-16 border-t"
        style={{ background:`${bg}f5`, borderColor:border, backdropFilter:'blur(16px)' }}>
        {[
          { to:'/',         label:'Servicios', Icon:Briefcase },
          { to:'/profile',  label:'Perfil',    Icon:User },
          { to:'/projects', label:'Catálogo',  Icon:BookOpen },
        ].map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} style={{ color: isActive ? '#22c55e' : muted }} />
                <span className="text-[10px] font-medium" style={{ color: isActive ? '#22c55e' : muted }}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
        <button onClick={onToggleTheme} className="flex flex-col items-center gap-1">
          {isDark ? <Sun size={20} style={{ color:'#facc15' }} /> : <Moon size={20} style={{ color:muted }} />}
          <span className="text-[10px] font-medium" style={{ color:muted }}>{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </nav>
    </>
  )
}
