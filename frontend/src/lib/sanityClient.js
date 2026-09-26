import { createClient } from '@sanity/client'

// Vite exposes only variables prefixed with VITE_ to browser code.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION

if (!projectId || !dataset || !apiVersion) {
  throw new Error(
    'Missing Sanity config. Copy frontend/.env.example to frontend/.env and fill in the values, then restart the dev server.',
  )
}

// One shared client for the whole app. Services in src/services/ import this
// to run GROQ queries; components never talk to Sanity directly.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // The CDN serves cached, published content — fast and fine for a public website.
  useCdn: true,
})
