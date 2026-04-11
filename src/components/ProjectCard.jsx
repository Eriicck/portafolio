import { ArrowUpRight, ExternalLink, Bot } from 'lucide-react'

export default function ProjectCard({ project, isDark, onDetails }) {
  const bg     = isDark ? '#18181b' : '#ffffff'
  const border = isDark ? '#27272a' : '#e4e4e7'
  const muted  = isDark ? '#52525b' : '#a1a1aa'
  const text   = isDark ? '#ffffff' : '#09090b'
  const sub    = isDark ? '#a1a1aa' : '#52525b'
  const backBg = isDark ? '#0f172a' : '#f8fafc'

  return (
    <div
      className="flip-card h-[420px] cursor-pointer"
      onClick={() => onDetails(project)}
    >
      <div className="flip-inner">

        {/* ── FRONT ── */}
        <div
          className="flip-front flex flex-col"
          style={{ background: bg, border: `1px solid ${border}` }}
        >
          {/* Screenshot */}
          {project.imageUrl ? (
            <div className="relative h-[55%] overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-3/4"
                style={{
                  background: `linear-gradient(to top, ${bg} 0%, ${bg}99 40%, transparent 100%)`,
                }}
              />
              <span
                className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded border backdrop-blur-sm"
                style={{ background: `${bg}bb`, border: `1px solid ${border}`, color: sub }}
              >
                {project.status}
              </span>
            </div>
          ) : (
            <div
              className="h-[55%] flex items-center justify-center"
              style={{ background: isDark ? '#27272a' : '#f4f4f5' }}
            >
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                <Bot size={40} strokeWidth={1.2} />
              </div>
            </div>
          )}

          {/* Info */}
          <div className="h-[45%] flex flex-col justify-between px-5 py-4">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-semibold leading-tight" style={{ color: text, fontFamily: 'Syne, sans-serif' }}>
                  {project.title}
                </h3>
                <ArrowUpRight size={15} style={{ color: muted, flexShrink: 0, marginTop: 2 }} />
              </div>
              <p className="text-xs leading-relaxed mt-1" style={{ color: sub }}>
                {project.desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[9px] font-medium uppercase tracking-wider"
                  style={{ color: muted }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-back flex flex-col justify-between p-6"
          style={{ background: backBg, border: `1px solid ${border}` }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold" style={{ color: text, fontFamily: 'Syne, sans-serif' }}>
                {project.title}
              </h3>
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', borderColor: 'rgba(34,197,94,0.25)' }}
              >
                {project.status}
              </span>
            </div>

            <p className="text-xs leading-relaxed mb-5" style={{ color: sub }}>
              {project.details}
            </p>

            <div className="mb-4">
              <p
                className="text-[9px] font-bold uppercase tracking-widest mb-2"
                style={{ color: muted }}
              >
                Stack
              </p>
              <p className="text-xs leading-relaxed" style={{ color: sub }}>
                {project.stack}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] font-medium border"
                  style={{ background: isDark ? '#27272a' : '#f4f4f5', borderColor: border, color: sub }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{
                  background: isDark ? '#ffffff' : '#09090b',
                  color:      isDark ? '#09090b' : '#ffffff',
                }}
              >
                View project <ExternalLink size={13} />
              </button>
            </a>
          ) : (
            <button
              className="w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase cursor-not-allowed"
              style={{ background: isDark ? '#27272a' : '#e4e4e7', color: muted }}
              disabled
            >
              No live demo
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
