import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  from = 'up',
  id,
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const hidden = {
    up:    'opacity-0 translate-y-10',
    down:  'opacity-0 -translate-y-8',
    left:  'opacity-0 -translate-x-10',
    right: 'opacity-0 translate-x-10',
    scale: 'opacity-0 scale-95',
    fade:  'opacity-0',
  }[from] ?? 'opacity-0 translate-y-10'

  return (
    <div
      id={id}
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
