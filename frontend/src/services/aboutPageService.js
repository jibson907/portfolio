import { sanityClient } from '../lib/sanityClient'

// Fetch the one About Page document by its fixed ID.
const ABOUT_PAGE_QUERY = `*[_type == "aboutPage" && _id == "aboutPage"][0]{
  heading,
  description
}`

// Returns the About Page content, or null if it has not been published yet.
export function getAboutPage() {
  return sanityClient.fetch(ABOUT_PAGE_QUERY)
}
