// Seeds the initial navigation menu items.
// Run from the studio folder (requires `npx sanity login` first):
//   npm run seed:navigation
//
// Safe to run again: each item is only created if it does not exist yet.

import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-25' })

// Fixed IDs make the script repeatable: running it twice won't create duplicates.
const navigationItems = [
  { _id: 'navigation-home', label: 'Home', url: '/', order: 10 },
  { _id: 'navigation-about', label: 'About', url: '/about', order: 20 },
  { _id: 'navigation-projects', label: 'Projects', url: '/projects', order: 30 },
  { _id: 'navigation-contact', label: 'Contact', url: '/contact', order: 40 },
]

async function seedNavigation() {
  // A transaction sends all changes in one request: either all succeed or none do.
  const transaction = client.transaction()
  for (const item of navigationItems) {
    transaction.createIfNotExists({ _type: 'navigationItem', isActive: true, ...item })
  }
  await transaction.commit()
  console.log(`Navigation ready (${navigationItems.length} items). Open Sanity Studio → Navigation to edit them.`)
}

seedNavigation().catch((error) => {
  console.error('Seeding failed:', error.message)
  process.exit(1)
})
