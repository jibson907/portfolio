import { defineCliConfig } from 'sanity/cli'

// Used by `sanity` terminal commands (dev, build, deploy, dataset, cors…).
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
})
