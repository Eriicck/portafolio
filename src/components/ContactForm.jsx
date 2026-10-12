import { useState } from 'react'
import { ArrowRight, CircleCheck } from 'lucide-react'

// Claves de EmailJS en .env (PUBLIC_ para que lleguen al navegador; son públicas por diseño)
const EJS_SERVICE  = import.meta.env.PUBLIC_EJS_SERVICE
const EJS_TEMPLATE = import.meta.env.PUBLIC_EJS_TEMPLATE
const EJS_KEY      = import.meta.env.PUBLIC_EJS_KEY

const FIELDS = [
  { name: 'from_name',  label: 'Tu nombre', type: 'text',  placeholder: 'Juan Pérez',       autoComplete: 'name' },
  { name: 'from_email', label: 'Tu email',  type: 'email', placeholder: 'juan@ejemplo.com', autoComplete: 'email' },
]
const label = 'block text-[11px] font-bold uppercase tracking-[0.2em] mb-3 text-zinc-500 dark:text-zinc-400'
const input = 'w-full px-0 py-2 bg-transparent border-b-2 outline-none transition-colors duration-300 text-base border-zinc-300 focus:border-black text-black placeholder:text-zinc-400 dark:border-zinc-800 dark:focus:border-green-500 dark:text-white dark:placeholder:text-zinc-500'

export default function ContactForm({ email }) {
  // idle | sending | sent | error
  const [status, setStatus] = useState('idle')

  const send = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setStatus('sending')
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, data, EJS_KEY)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20" role="status">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          <CircleCheck size={40} />
        </div>
        <h3 className="font-display text-2xl font-bold mb-3 text-black dark:text-white">¡Mensaje enviado!</h3>
        <p className="font-light text-zinc-500 dark:text-zinc-400">Te respondo en menos de 24 horas.</p>
      </div>
    )
  }

  return (
    <form onSubmit={send} className="space-y-8">
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className={label}>{f.label}</label>
          <input id={f.name} name={f.name} type={f.type} placeholder={f.placeholder} autoComplete={f.autoComplete} required className={input} />
        </div>
      ))}
      <div>
        <label htmlFor="message" className={label}>¿En qué puedo ayudarte?</label>
        <textarea id="message" name="message" rows={4} required placeholder="Cuéntame tu proyecto, idea o lo que necesitas..." className={`${input} resize-none`} />
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-400" role="alert">Algo salió mal. Escríbeme a <a className="underline" href={`mailto:${email}`}>{email}</a></p>
      )}
      <button type="submit" disabled={status === 'sending'}
        className="w-full py-5 rounded-2xl font-bold text-[11px] tracking-[0.3em] uppercase transition-colors group flex items-center justify-center gap-3 disabled:opacity-50 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100">
        {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
      <p className="text-center text-[11px] text-zinc-500">Respuesta garantizada en menos de 24 horas.</p>
    </form>
  )
}
