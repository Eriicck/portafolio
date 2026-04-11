import Reveal from '../components/Reveal.jsx'
import TechMarquee from '../components/TechMarquee.jsx'
import { personal } from '../data/index.js'

export default function Profile({ isDark }) {
  const bg     = isDark ? '#0a0a0a' : '#f8f8f8'
  const card   = isDark ? '#18181b' : '#ffffff'
  const border = isDark ? '#27272a' : '#e4e4e7'
  const text   = isDark ? '#ffffff' : '#09090b'
  const sub    = isDark ? '#a1a1aa' : '#52525b'
  const muted  = isDark ? '#52525b' : '#a1a1aa'
  const pill   = isDark ? '#27272a' : '#f4f4f5'

  return (
    <div className="min-h-screen pt-20 pb-28 md:pb-10" style={{ background:bg }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden mb-8" style={{ background:card, border:`1px solid ${border}` }}>
            <div className="flex flex-col md:flex-row">

              {/* Foto */}
              <div className="relative md:w-2/5 overflow-hidden" style={{ minHeight:'360px' }}>
                <img src={personal.photoUrl} alt={personal.name} className="w-full h-full object-cover object-top" style={{ minHeight:'360px' }} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 md:hidden" style={{ background:`linear-gradient(to top, ${card}, transparent)` }} />

                {/* Badge stack */}
                <div className="absolute bottom-4 left-4 px-4 py-3 rounded-xl border backdrop-blur-sm" style={{ background:`${bg}cc`, border:`1px solid ${border}` }}>
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color:muted }}>Stack principal</p>
                  <p className="text-sm font-bold" style={{ color:text, fontFamily:'Syne,sans-serif' }}>{personal.mainStack}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px]" style={{ color:muted }}>Disponible para proyectos</span>
                  </div>
                </div>

                {/* Badge proyectos */}
                <div className="absolute top-4 right-4 px-3 py-2 rounded-xl border text-center" style={{ background:`${bg}cc`, border:`1px solid ${border}` }}>
                  <p className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color:muted }}>Proyectos</p>
                  <p className="text-lg font-extrabold" style={{ color:text, fontFamily:'Syne,sans-serif' }}>{personal.projectCount}</p>
                </div>
              </div>

              {/* Contenido */}
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-6">
                  {personal.roles.map((role) => (
                    <span key={role} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border" style={{ background:pill, border:`1px solid ${border}`, color:muted }}>
                      {role}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-6" style={{ fontFamily:'Syne,sans-serif', color:text }}>
                  {personal.name}
                </h1>
                <div className="space-y-4">
                  {personal.bio.map((para, i) => (
                    <p key={i} className="text-sm md:text-base leading-relaxed" style={{ color:sub }} dangerouslySetInnerHTML={{ __html: para }} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  <a href={`mailto:${personal.email}`} className="px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:opacity-90" style={{ background: isDark ? '#ffffff' : '#09090b', color: isDark ? '#09090b' : '#ffffff' }}>
                    Email directo
                  </a>
                  <a href={personal.whatsapp} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase border transition-all hover:border-green-500 hover:text-green-500" style={{ border:`1px solid ${border}`, color:sub }}>
                    WhatsApp
                  </a>
                  <a href={personal.linkedin} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase border transition-all hover:border-green-500 hover:text-green-500" style={{ border:`1px solid ${border}`, color:sub }}>
                    LinkedIn
                  </a>
                </div>
              </div>

            </div>
          </div>
        </Reveal>

        {/* Tech Marquee */}
        <Reveal delay={100}>
          <div className="rounded-3xl overflow-hidden py-4" style={{ background:card, border:`1px solid ${border}` }}>
            <TechMarquee isDark={isDark} />
          </div>
        </Reveal>
      </div>
    </div>
  )
}
