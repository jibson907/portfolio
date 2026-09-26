import { defineCliConfig } from 'sanity/cli'

// Used by `sanity` terminal commands (dev, build, deploy, dataset, cors…).
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  // `npx sanity deploy` publishes the Studio to https://jibson907-portfolio.sanity.studio
  studioHost: 'jibson907-portfolio',
  deployment: {
    appId: 'u6c46m75rtmesnu3hrknn2ux', // Identifies this deployed Studio; avoids a prompt on redeploy
  },
})
