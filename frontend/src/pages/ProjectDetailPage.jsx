import { useCallback } from 'react'
import { Link, useOutletContext, useParams } from 'react-router'
import { getProjectBySlug } from '../services/projectService'
import { useSanityData } from '../lib/useSanityData'
import { toParagraphs } from '../lib/toParagraphs'
import SanityImage from '../components/SanityImage'
import StatusMessage from '../components/StatusMessage'

// /projects/:slug: one project, chosen by the slug in the URL.
function ProjectDetailPage() {
  // For /projects/retail-sales-dashboard, useParams() returns { slug: 'retail-sales-dashboard' }
  const { slug } = useParams()
  const { settings } = useOutletContext()

  // useCallback keeps the same function until the slug changes,
  // so the data is fetched once per project instead of on every render.
  const fetchProject = useCallback(() => getProjectBySlug(slug), [slug])
  const { data: project, status } = useSanityData(fetchProject)

  if (status === 'loading') {
    return <StatusMessage title="Loading…" />
  }

  if (status === 'error') {
    return (
      <StatusMessage title="This project couldn't load">
        The content service didn't respond. Check your connection and refresh the page.
      </StatusMessage>
    )
  }

  // The request worked, but no project has this slug (typo, renamed, or unpublished).
  if (!project) {
    return (
      <div className="status">
        <title>Project not found</title>
        <h1 className="status__title">Project not found</h1>
        <p>
          There's no project at this address. It may have been renamed or removed.{' '}
          <Link to="/projects">See all projects</Link>.
        </p>
      </div>
    )
  }

  const pageTitle = settings?.siteTitle ? `${project.title} | ${settings.siteTitle}` : project.title

  return (
    <article className="project-detail">
      <title>{pageTitle}</title>

      <Link className="project-detail__back" to="/projects">
        All projects
      </Link>

      <h1 className="page-title">{project.title}</h1>
      <p className="project-detail__summary">{project.shortDescription}</p>

      {project.technologies?.length > 0 && (
        <ul className="tech-list" aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      )}

      <SanityImage
        className="project-detail__image"
        image={project.image}
        aspectRatio={16 / 9}
        sizes="(min-width: 72rem) 72rem, 100vw"
      />

      <div className="project-detail__body">
        {toParagraphs(project.fullDescription).map((paragraph, index) => (
          // The text never reorders, so its position is a safe, always-unique key
          <p key={index}>{paragraph}</p>
        ))}

        {project.projectUrl && (
          <a className="button" href={project.projectUrl} target="_blank" rel="noreferrer">
            Visit project
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectDetailPage
