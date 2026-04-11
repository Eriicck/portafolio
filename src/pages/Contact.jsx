import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { personal } from '../data/index.js'

export default function Contact({ isDark }) {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState('idle')

  const bg     = isDark ? '#0a0a0a' : '#f8f8f8'
  const card   = isDark ? 'rgba(24,24,27,0.6)' : 'rgba(255,255,255,0.6)'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const text   = isDark ? '#ffffff' : '#09090b'
  const sub    = isDark ? '#a1a1aa' : '#52525b'
  const muted  = isDark ? '#52525b' : '#a1a1aa'
  const inputB = isDark ? '#3f3f46' : '#d4d4d8'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(personal.emailjs.serviceId, personal.emailjs.templateId, { from_name:name, from_email:email, message }, personal.emailjs.publicKey)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-28 md:pb-10" style={{ background:bg }}>
      {/* Fondo con foto */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage:'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=60)', backgroundSize:'cover', backgroundPosition:'center', filter:'grayscale(60%)' }} />
      <div className="absolute inset-0" style={{ background: isDark ? 'rgba(10,10,10,0.82)' : 'rgba(248,248,248,0.88)' }} />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 leading-tight" style={{ fontFamily:'Syne,sans-serif', color:text }}>
            ¿Tenés algo<br /><span style={{ color:'#22c55e' }}>en mente?</span>
          </h2>
          <p className="text-base font-light" style={{ color:sub }}>
            Contame tu idea — te respondo en menos de 24 horas.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="p-8 md:p-16 rounded-3xl backdrop-blur-2xl border shadow-2xl" style={{ background:card, borderColor:border }}>
            {status === 'done' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background:'rgba(34,197,94,0.15)', color:'#22c55e', boxShadow:'0 0 40px rgba(34,197,94,0.3)' }}>
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily:'Syne,sans-serif', color:text }}>¡Mensaje recibido!</h3>
                <p style={{ color:sub }}>Te respondo en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  {[
                    { label:'Tu nombre', value:name,  set:setName,  type:'text',  ph:'Juan Pérez' },
                    { label:'Tu email',  value:email, set:setEmail, type:'email', ph:'juan@ejemplo.com' },
                  ].map((f) => (
                    <div key={f.label} className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color:muted }}>{f.label}</label>
                      <input required type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                        className="w-full px-0 py-2 bg-transparent border-b-2 outline-none transition-all duration-300 placeholder:opacity-30"
                        style={{ borderColor:inputB, color:text }}
                        onFocus={e => (e.target.style.borderColor = '#22c55e')}
                        onBlur={e  => (e.target.style.borderColor = inputB)}
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color:muted }}>¿En qué puedo ayudarte?</label>
                  <textarea required rows={3} value={message} onChange={e => setMessage(e.target.value)} placeholder="Contame tu proyecto, idea o lo que necesitás..."
                    className="w-full px-0 py-2 bg-transparent border-b-2 outline-none transition-all duration-300 resize-none placeholder:opacity-30"
                    style={{ borderColor:inputB, color:text }}
                    onFocus={e => (e.target.style.borderColor = '#22c55e')}
                    onBlur={e  => (e.target.style.borderColor = inputB)}
                  />
                </div>
                {status === 'error' && <p className="text-xs text-red-400">Algo salió mal. Intentá por email directo.</p>}
                <button type="submit" disabled={status === 'sending'} className="px-10 py-4 rounded-xl font-bold text-[10px] tracking-[0.3em] uppercase transition-all flex items-center gap-4 hover:opacity-90 disabled:opacity-50" style={{ background: isDark ? '#ffffff' : '#09090b', color: isDark ? '#09090b' : '#ffffff' }}>
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'} <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
