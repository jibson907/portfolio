import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

// The site's route map: which page component to show for which URL.
// All routes are nested inside Layout, so every page shares the header and footer.
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        {/* ":slug" is a URL parameter: it matches any value, e.g. /projects/retail-sales-dashboard */}
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
