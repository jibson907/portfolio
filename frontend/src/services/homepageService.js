import { sanityClient } from '../lib/sanityClient'

// GROQ query, read left to right:
//   *                    → every document in the dataset
//   [ ... ]              → filter: keep only the homepage document
//   [0]                  → take the first match as an object (not an array)
//   { ... }              → projection: return only the fields we ask for
const HOMEPAGE_QUERY = `*[_type == "homepage" && _id == "homepage"][0]{
  heroTitle,
  heroDescription,
  heroImage,
  heroButtonText,
  heroButtonUrl
}`

// Returns the homepage object, or null if it has not been published yet.
export function getHomepage() {
  return sanityClient.fetch(HOMEPAGE_QUERY)
}
