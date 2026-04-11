import { useState, useEffect } from 'react'
import { X, ExternalLink, SlidersHorizontal, Bot } from 'lucide-react'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { projects, serviceCategories } from '../data/index.js'

const PER_PAGE = 6

function ProjectModal({ project, isDark, onClose }) {
  const bg     = isDark ? '#18181b' : '#ffffff'
  const border = isDark ? '#27272a' : '#e4e4e7'
  const text   = isDark ? '#ffffff' : '#09090b'
  const sub    = isDark ? '#a1a1aa' : '#52525b'
  const muted  = isDark ? '#52525b' : '#a1a1aa'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background:'rgba(0,0,0,0.75)' }} onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl" style={{ background:bg, border:`1px solid ${border}`, maxHeight:'90vh', overflowY:'auto' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor:border }}>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold" style={{ fontFamily:'Syne,sans-serif', color:text }}>{project.title}</h3>
            <span className="px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-widest border" style={{ background:'rgba(34,197,94,0.1)', color:'#22c55e', borderColor:'rgba(34,197,94,0.25)' }}>{project.status}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-colors" style={{ color:muted }}><X size={18} strokeWidth={1.5} /></button>
        </div>

        {/* Imagen */}
        {project.imageUrl && (
          <div className="w-full overflow-hidden" style={{ height:200 }}>
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover object-top" />
          </div>
        )}

        {/* Cuerpo */}
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm leading-relaxed mb-4" style={{ color:sub }}>{project.details}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 border rounded text-[10px] font-medium" style={{ background: isDark ? '#27272a' : '#f4f4f5', borderColor:border, color:sub }}>{tag}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color:muted }}>Stack</p>
            <p className="text-xs leading-relaxed mb-5" style={{ color:sub }}>{project.stack}</p>
            {project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <button className="w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90" style={{ background: isDark ? '#ffffff' : '#09090b', color: isDark ? '#09090b' : '#ffffff' }}>
                  Ver en vivo <ExternalLink size={13} />
                </button>
              </a>
            ) : (
              <button className="w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase cursor-not-allowed" style={{ background: isDark ? '#27272a' : '#e4e4e7', color:muted }} disabled>Sin demo</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects({ isDark }) {
  const [filter,   setFilter]   = useState('all')
  const [page,     setPage]     = useState(1)
  const [selected, setSelected] = useState(null)

  const bg     = isDark ? '#0a0a0a' : '#f8f8f8'
  const text   = isDark ? '#ffffff' : '#09090b'
  const sub    = isDark ? '#a1a1aa' : '#52525b'
  const border = isDark ? '#27272a' : '#e4e4e7'
  const pillBg = isDark ? '#27272a' : '#ffffff'

  const filtered   = filter === 'all' ? projects : projects.filter(p => p.category === filter)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  useEffect(() => { setPage(1) }, [filter])

  return (
    <div className="min-h-screen pt-20 pb-28 md:pb-16" style={{ background:bg }}>
      <div className="max-w-6xl mx-auto px-6">

        <Reveal>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-8" style={{ fontFamily:'Syne,sans-serif', color:text }}>
            Mis Proyectos
          </h1>
        </Reveal>

        {/* Filtros */}
        <Reveal delay={80}>
          <div className="flex flex-wrap gap-2 mb-12">
            {serviceCategories.map((cat) => {
              const active = filter === cat.id
              return (
                <button key={cat.id} onClick={() => setFilter(cat.id)} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all" style={{ background: active ? (isDark ? '#ffffff' : '#09090b') : pillBg, color: active ? (isDark ? '#09090b' : '#ffffff') : sub, borderColor: active ? 'transparent' : border }}>
                  {cat.id === 'all' && <SlidersHorizontal size={11} />}
                  {cat.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Grilla */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paged.map((proj, idx) => (
            <Reveal key={proj.id} delay={idx * 60}>
              <ProjectCard project={proj} isDark={isDark} onDetails={setSelected} />
            </Reveal>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-full text-xs font-bold border transition-all disabled:opacity-30" style={{ borderColor:border, color:sub }}>←</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} className="w-9 h-9 rounded-full text-xs font-bold border transition-all" style={{ background: n === page ? (isDark ? '#ffffff' : '#09090b') : 'transparent', color: n === page ? (isDark ? '#09090b' : '#ffffff') : sub, borderColor: n === page ? 'transparent' : border }}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-full text-xs font-bold border transition-all disabled:opacity-30" style={{ borderColor:border, color:sub }}>→</button>
          </div>
        )}
      </div>

      {selected && <ProjectModal project={selected} isDark={isDark} onClose={() => setSelected(null)} />}
    </div>
  )
}
