import { sanityClient } from '../lib/sanityClient'

// All projects for the listing page: featured first, then newest first.
//   "slug": slug.current  → rename a nested value into a simple top-level field
const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)] | order(featured desc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  image,
  technologies,
  featured
}`

// One project, found by its slug.
//   $slug is a query parameter: the value is sent separately from the query text,
//   so whatever is in the URL can never change the query itself.
const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  fullDescription,
  image,
  projectUrl,
  technologies,
  featured
}`

// Returns an array of projects (empty if none are published).
export function getProjects() {
  return sanityClient.fetch(PROJECTS_QUERY)
}

// Returns the matching project, or null if no project has that slug.
export function getProjectBySlug(slug) {
  return sanityClient.fetch(PROJECT_BY_SLUG_QUERY, { slug })
}
