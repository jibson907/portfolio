import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves the site from https://jibson907.github.io/portfolio/,
  // so production files must live under /portfolio/. Locally (npm run dev) keep "/".
  base: command === 'build' ? '/portfolio/' : '/',
  server: {
    // Sanity only accepts browser requests from origins in its CORS list, which
    // includes http://localhost:5173. If this port is busy, stop with an error
    // instead of silently switching to 5174 (where every Sanity request would fail).
    port: 5173,
    strictPort: true,
  },
}))
