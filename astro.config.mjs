import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

// Sitio estático: `npm run build` genera la carpeta dist/ lista para Netlify.
export default defineConfig({
  site: 'https://erickcontreras.netlify.app',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
})
