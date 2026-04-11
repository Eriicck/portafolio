import { personal } from '../data/index.js'

export default function Footer({ isDark }) {
  const border = isDark ? '#18181b' : '#e4e4e7'
  const bg     = isDark ? '#09090b' : '#ffffff'
  const text   = isDark ? '#52525b' : '#a1a1aa'

  return (
    <footer className="border-t py-12 hidden md:block" style={{ background:bg, borderColor:border }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tight text-base" style={{ fontFamily:'Syne,sans-serif', color:text }}>{personal.shortName}</span>
          <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color:text }}>&mdash; 2026</span>
        </div>
        <div className="flex flex-wrap justify-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href={`mailto:${personal.email}`} className="transition-colors hover:text-green-500" style={{ color:text }}>Email directo</a>
          <a href={personal.whatsapp} target="_blank" rel="noreferrer" className="transition-colors hover:text-green-500" style={{ color:text }}>WhatsApp</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-green-500" style={{ color:text }}>LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
