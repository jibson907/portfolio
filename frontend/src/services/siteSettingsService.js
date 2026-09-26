import { sanityClient } from '../lib/sanityClient'

// Fetch the one Site Settings document by its fixed ID.
const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  contactEmail,
  logo,
  socialLinks[]{ _key, platform, url }
}`

// Returns the site settings object, or null if not published yet.
export function getSiteSettings() {
  return sanityClient.fetch(SITE_SETTINGS_QUERY)
}
