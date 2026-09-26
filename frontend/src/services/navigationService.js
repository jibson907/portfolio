import { sanityClient } from '../lib/sanityClient'

// Only items switched on in the Studio, sorted by their Order field.
//   | order(order asc)  → pipe the filtered results into a sort
const NAVIGATION_QUERY = `*[_type == "navigationItem" && isActive == true] | order(order asc){
  _id,
  label,
  url
}`

// Returns an array of menu items (empty if none are active).
export function getNavigation() {
  return sanityClient.fetch(NAVIGATION_QUERY)
}
