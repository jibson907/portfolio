import { useOutletContext } from 'react-router'
import { getProjects } from '../services/projectService'
import { useSanityData } from '../lib/useSanityData'
import ProjectCard from '../components/ProjectCard'
import StatusMessage from '../components/StatusMessage'

// /projects: fetches every published project and shows them as a grid of cards.
function ProjectsPage() {
  const { settings } = useOutletContext()
  const { data: projects, status } = useSanityData(getProjects)

  const pageTitle = settings?.siteTitle ? `Projects | ${settings.siteTitle}` : 'Projects'

  if (status === 'loading') {
    return <StatusMessage title="Loading…" />
  }

  if (status === 'error') {
    return (
      <StatusMessage title="Projects couldn't load">
        The content service didn't respond. Check your connection and refresh the page.
      </StatusMessage>
    )
  }

  return (
    <section className="projects-page">
      <title>{pageTitle}</title>
      <h1 className="page-title">Projects</h1>

      {projects.length === 0 ? (
        <p className="projects-page__empty">
          No projects published yet. Add one in Sanity Studio under Projects and click Publish.
        </p>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectsPage
