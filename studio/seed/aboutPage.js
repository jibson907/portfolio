// Creates the About Page document.
// Run from the studio folder (requires `npx sanity login` first):
//   npm run seed:aboutPage
//
// The About text used to live on the Homepage (aboutHeading / aboutDescription).
// If those old fields still exist, this script MOVES that text into the new
// About Page document and removes it from the Homepage, so nothing is lost.
// Otherwise it creates sample content. Safe to run again: it does nothing if the
// About Page already exists.

import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-25' })

const ABOUT_PAGE_ID = 'aboutPage' // Must match the fixed ID in structure.js

const sampleContent = {
  heading: 'About me',
  description:
    'I have spent the last few years building websites and data tools for small businesses, schools, and startups. I work mainly with React on the frontend, Python for data work, and headless CMS platforms like Sanity so clients can manage their own content.\n\nI care about fast load times, accessible design, and clear analysis that people can act on.',
}

async function seedAboutPage() {
  if (await client.getDocument(ABOUT_PAGE_ID)) {
    console.log('About Page already exists. Nothing to do. Edit it in Sanity Studio instead.')
    return
  }

  const homepage = await client.getDocument('homepage')
  const hasOldFields = Boolean(homepage?.aboutHeading || homepage?.aboutDescription)

  const content = hasOldFields
    ? { heading: homepage.aboutHeading, description: homepage.aboutDescription }
    : sampleContent

  // A transaction applies every change together: either all succeed or none do.
  const transaction = client.transaction().create({ _id: ABOUT_PAGE_ID, _type: 'aboutPage', ...content })

  if (hasOldFields) {
    transaction.patch('homepage', (patch) => patch.unset(['aboutHeading', 'aboutDescription']))

    // An unpublished Homepage draft would still hold the old fields, so clean it too.
    if (await client.getDocument('drafts.homepage')) {
      transaction.patch('drafts.homepage', (patch) => patch.unset(['aboutHeading', 'aboutDescription']))
    }
  }

  await transaction.commit()
  console.log(
    hasOldFields
      ? 'Moved the About text from the Homepage into the new About Page.'
      : 'Created the About Page with sample content.',
  )
}

seedAboutPage().catch((error) => {
  console.error('Seeding failed:', error.message)
  process.exit(1)
})
