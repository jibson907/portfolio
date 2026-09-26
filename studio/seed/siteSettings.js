// Seeds the initial Site Settings document.
// Run from the studio folder (requires `npx sanity login` first):
//   npm run seed:siteSettings
//
// Safe to run again: it only creates the document if it does not exist yet.

import { createReadStream } from 'node:fs'
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-25' })

const SITE_SETTINGS_ID = 'siteSettings' // Must match the fixed ID in structure.js

async function seedSiteSettings() {
  const existing = await client.getDocument(SITE_SETTINGS_ID)
  if (existing) {
    console.log('Site Settings already exist. Nothing to do. Edit them in Sanity Studio instead.')
    return
  }

  console.log('Uploading logo…')
  const logoAsset = await client.assets.upload(
    'image',
    createReadStream(new URL('./images/logo-placeholder.svg', import.meta.url)),
    { filename: 'logo-placeholder.svg' },
  )

  // Placeholder contact details: replace them with your real ones in the Studio.
  const siteSettings = {
    _id: SITE_SETTINGS_ID,
    _type: 'siteSettings',
    siteTitle: 'Jibrin Muhammad Auwal',
    siteDescription:
      'Data analyst and web developer building data-driven web applications and practical digital solutions.',
    contactEmail: 'hello@example.com',
    logo: {
      _type: 'image',
      asset: { _type: 'reference', _ref: logoAsset._id },
      alt: 'Jibrin Muhammad Auwal logo',
    },
    socialLinks: [
      // _key: Sanity needs a unique key on every array item to track edits and reordering
      { _key: 'github', _type: 'socialLink', platform: 'GitHub', url: 'https://github.com/your-username' },
      { _key: 'linkedin', _type: 'socialLink', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/your-profile' },
      { _key: 'x', _type: 'socialLink', platform: 'X', url: 'https://x.com/your-handle' },
    ],
  }

  await client.create(siteSettings)
  console.log('Site Settings created. Open Sanity Studio → Site Settings to see and edit them.')
}

seedSiteSettings().catch((error) => {
  console.error('Seeding failed:', error.message)
  process.exit(1)
})
