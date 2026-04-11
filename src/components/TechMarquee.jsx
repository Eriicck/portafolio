import { techStack } from '../data/index.js'

export default function TechMarquee({ isDark }) {
  const doubled = [...techStack, ...techStack]

  return (
    <div className="w-full overflow-hidden py-8">
      <p
        className="text-center text-[10px] font-bold uppercase tracking-[0.25em] mb-6"
        style={{ color: isDark ? '#52525b' : '#a1a1aa' }}
      >
        Tech Stack
      </p>
      <div className="relative overflow-hidden">
        <div className="flex marquee-track gap-10 w-max">
          {doubled.map((tech, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 flex-shrink-0 group cursor-default"
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110"
                style={{ filter: isDark ? 'brightness(0.7) grayscale(0.3)' : 'brightness(0.85)' }}
                loading="lazy"
              />
              <span
                className="text-[9px] font-medium uppercase tracking-wider whitespace-nowrap transition-colors group-hover:text-green-500"
                style={{ color: isDark ? '#52525b' : '#9ca3af' }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
