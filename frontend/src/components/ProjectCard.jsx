import { Link } from 'react-router'
import SanityImage from './SanityImage'

// One project in the projects grid. Receives a single project object as props.
function ProjectCard({ title, slug, shortDescription, image, technologies = [], featured }) {
  const detailUrl = `/projects/${slug}`

  return (
    <article className="project-card">
      <SanityImage
        className="project-card__image"
        image={image}
        aspectRatio={3 / 2}
        sizes="(min-width: 56rem) 33vw, (min-width: 36rem) 50vw, 100vw"
        loading="lazy"
      />

      <div className="project-card__body">
        {featured && <p className="project-card__featured">Featured project</p>}
        <h2 className="project-card__title">
          <Link to={detailUrl}>{title}</Link>
        </h2>
        <p className="project-card__description">{shortDescription}</p>

        {technologies.length > 0 && (
          <ul className="tech-list" aria-label="Technologies used">
            {technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}

        {/* aria-label gives each link a unique name for screen-reader users */}
        <Link className="project-card__link" to={detailUrl} aria-label={`Read more about ${title}`}>
          Read more
        </Link>
      </div>
    </article>
  )
}

export default ProjectCard
