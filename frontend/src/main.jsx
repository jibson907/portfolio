import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter keeps the URL in the address bar in sync with what React shows.
        basename = the `base` from vite.config.js ("/portfolio/" on GitHub Pages, "/" locally),
        so a Sanity link like "/projects" becomes /portfolio/projects on the live site. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
