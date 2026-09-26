import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

// Document types that must exist only once (singletons).
const singletonTypes = new Set(['homepage', 'aboutPage', 'siteSettings'])

// The Studio exposes only variables prefixed with SANITY_STUDIO_.
export default defineConfig({
  name: 'default',
  title: 'Jibrin Personal Portfolio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,

  plugins: [
    structureTool({ structure }), // The content editing panes (document lists + forms)
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Hide singletons from the global "Create new document" menu.
    newDocumentOptions: (prev) =>
      prev.filter((item) => !singletonTypes.has(item.templateId)),
  },
})
