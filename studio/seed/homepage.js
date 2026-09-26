// Seeds the initial Homepage document so there is realistic content to work with.
// This is a one-off development helper, not part of the Studio or the website.
//
// Run from the studio folder (requires `npx sanity login` first):
//   npm run seed:homepage
//
// Safe to run again: it only creates the document if it does not exist yet,
// so it will never overwrite edits you made in the Studio.

import { createReadStream } from 'node:fs'
import { getCliClient } from 'sanity/cli'

// A client authenticated as the logged-in CLI user, pointed at the project and
// dataset from sanity.cli.js. It can write, so it must never be used in the frontend.
const client = getCliClient({ apiVersion: '2026-09-25' })

const HOMEPAGE_ID = 'homepage' // Must match the fixed ID in structure.js

async function seedHomepage() {
  const existing = await client.getDocument(HOMEPAGE_ID)
  if (existing) {
    console.log('Homepage already exists. Nothing to do. Edit it in Sanity Studio instead.')
    return
  }

  // Images are stored separately as "assets". We upload the file first,
  // then the homepage document stores a reference to the asset's ID.
  console.log('Uploading hero image…')
  const imageAsset = await client.assets.upload(
    'image',
    createReadStream(new URL('./images/hero-placeholder.jpg', import.meta.url)),
    { filename: 'hero-placeholder.jpg' },
  )

  const homepage = {
    _id: HOMEPAGE_ID,
    _type: 'homepage',
    heroTitle: 'I build fast, content-driven websites for growing businesses',
    heroDescription:
      "I'm Jibrin, a web developer at Techsfire Concept. I turn ideas into clean, responsive websites that are easy for your team to update.",
    heroImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAsset._id },
      alt: 'A laptop, phone, notebook, and cup of coffee on a wooden desk',
    },
    heroButtonText: 'View my projects',
    heroButtonUrl: '/projects',
  }

  await client.create(homepage)
  console.log('Homepage created. Open Sanity Studio → Homepage to see and edit it.')
}

seedHomepage().catch((error) => {
  console.error('Seeding failed:', error.message)
  process.exit(1)
})
