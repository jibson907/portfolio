import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/portfolio/',
  server: {
    // Sanity only accepts browser requests from origins in its CORS list, which
    // includes http://localhost:5173. If this port is busy, stop with an error
    // instead of silently switching to 5174 (where every Sanity request would fail).
    port: 5173,
    strictPort: true,
  },
})
