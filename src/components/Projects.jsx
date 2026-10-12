import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Bot, ExternalLink, Layers, SlidersHorizontal, X } from 'lucide-react'
import { CATEGORIES, PROJECTS } from '../data/projects.js'

const PER_PAGE = 6

// Igual que [data-reveal] del resto del sitio, pero para elementos que React crea al filtrar
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.08, rootMargin: '0px 0px 10% 0px' })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} data-reveal className={`${visible ? 'is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>
      {children}
    </div>
  )
}

function FlipCard({ p, onOpen }) {
  const open = () => onOpen(p)
  return (
    <div
      role="button" tabIndex={0} aria-label={`Ver detalles de ${p.title}`}
      onClick={open} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() } }}
      className="flip-card block h-[420px] cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flip-inner">
        <div className="flip-front flex flex-col border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
          {p.img ? (
            <div className="relative h-[55%] overflow-hidden">
              <img src={p.img} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60" />
              <span className="absolute top-3 left-3 text-[11px] font-mono uppercase tracking-widest px-2 py-1 rounded border backdrop-blur-sm bg-white/70 border-zinc-200 text-zinc-600 dark:bg-zinc-950/70 dark:border-zinc-700 dark:text-zinc-300">{p.status}</span>
            </div>
          ) : (
            <div className="h-[55%] flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
              <div className="p-5 rounded-2xl bg-green-500/10 text-green-500"><Bot size={40} strokeWidth={1.2} /></div>
            </div>
          )}
          <div className="h-[45%] flex flex-col justify-between px-6 py-4">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-display text-lg font-semibold leading-tight text-black dark:text-white">{p.title}</h3>
                <ArrowUpRight size={16} className="shrink-0 mt-0.5 text-zinc-300 dark:text-zinc-600" />
              </div>
              <p className="text-xs leading-relaxed line-clamp-2 text-zinc-500 dark:text-zinc-400">{p.desc}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold uppercase tracking-tighter text-zinc-500 dark:text-zinc-400">
              {p.tags.slice(0, 3).map((t) => <span key={t}>#{t}</span>)}
            </div>
          </div>
        </div>

        <div className="flip-back flex flex-col justify-center items-center text-center p-8 border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700" aria-hidden="true">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border border-green-500/15 dark:border-green-500/10" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-green-500/20 dark:border-green-500/15" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-zinc-200 dark:border-zinc-700/40" />
            <div className="absolute bottom-8 left-6 w-2 h-2 rounded-full bg-green-500/40 dark:bg-green-500/30" />
            <div className="absolute top-1/2 right-6 w-12 h-px bg-green-500/25 dark:bg-green-500/20" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-4 p-3 rounded-xl border bg-zinc-50 border-zinc-200 text-green-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-green-400">
              <Layers size={22} />
            </div>
            <h4 className="font-display text-base font-bold mb-3 text-black dark:text-white">Stack técnico</h4>
            <p className="text-xs leading-relaxed mb-5 max-w-[200px] text-zinc-500 dark:text-zinc-400">{p.stack}</p>
            <div className="text-[11px] font-bold uppercase tracking-widest py-2 px-5 rounded-full border border-green-600/40 text-green-700 dark:border-green-500/40 dark:text-green-400">
              Ver detalles
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Modal({ p, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <h3 id="modal-title" className="font-display text-lg font-bold text-black dark:text-white">{p.title}</h3>
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-full uppercase tracking-widest bg-green-500/10 text-green-500 border border-green-500/20">{p.status}</span>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Cerrar"
            className="p-1.5 rounded-lg transition-colors text-zinc-400 hover:text-black hover:bg-zinc-100 dark:hover:text-white dark:hover:bg-zinc-800">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        {p.img && (
          <div className="w-full h-[220px] overflow-hidden">
            <img src={p.img} alt={`Captura de ${p.title}`} className="w-full h-full object-cover object-top" />
          </div>
        )}
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm leading-relaxed mb-4 text-zinc-700 dark:text-zinc-300">{p.details}</p>
            <ul className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="px-2 py-0.5 border rounded text-[11px] font-medium bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400">{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2 text-zinc-500 dark:text-zinc-400">Stack</p>
            <p className="text-xs leading-relaxed mb-5 text-zinc-600 dark:text-zinc-400">{p.stack}</p>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100">
                Ver en vivo <ExternalLink size={13} />
              </a>
            ) : (
              <p className="w-full py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                Sin demo
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const pill = (active) => active
  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
  : 'border-zinc-300 text-zinc-500 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500'

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null)
  const closeModal = useCallback(() => setModal(null), [])

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.cat === filter)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const choose = (id) => { setFilter(id); setPage(1) }
  const goToPage = (n) => {
    setPage(n)
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Reveal className="mb-16 flex flex-col gap-8">
        <h2 className="font-display text-4xl md:text-7xl font-bold text-black dark:text-white">Mis Proyectos</h2>
        <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrar por categoría">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => choose(c.id)} aria-pressed={filter === c.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${pill(filter === c.id)}`}>
              {c.id === 'all' && <SlidersHorizontal size={12} />}{c.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {paged.map((p, i) => (
          <Reveal key={`${filter}-${p.id}`} delay={i * 80}>
            <FlipCard p={p} onOpen={setModal} />
          </Reveal>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Páginas">
          <button onClick={() => goToPage(Math.max(1, page - 1))} disabled={page === 1} aria-label="Página anterior"
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all disabled:opacity-30 ${pill(false)}`}>←</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => goToPage(n)} aria-current={n === page ? 'page' : undefined}
              className={`w-9 h-9 rounded-full text-xs font-bold border transition-all ${pill(n === page)}`}>
              {n}
            </button>
          ))}
          <button onClick={() => goToPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} aria-label="Página siguiente"
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all disabled:opacity-30 ${pill(false)}`}>→</button>
        </nav>
      )}

      {modal && <Modal p={modal} onClose={closeModal} />}
    </>
  )
}
