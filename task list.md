# Task List — Mini Personal Website CMS

Tick a box only after the work has been implemented, tested, and verified.

- [x] Task 1: Project Setup
  - [x] Create main project folder and documentation files
  - [x] Create `frontend` (React + Vite, JavaScript)
  - [x] Create `studio` (Sanity Studio)
  - [x] Install only currently required dependencies
  - [x] Configure basic Sanity project (project ID `79rzokps`, dataset `production`)
  - [x] Configure environment variables (`frontend/.env`, `studio/.env`)
  - [x] Configure Sanity client (`frontend/src/lib/sanityClient.js`)
  - [x] Organize frontend folders (`components`, `pages`, `services`, `lib`, `assets`)
  - [x] Verify React frontend runs
  - [x] Verify Sanity Studio runs

- [x] Task 2: First Sanity Schema (Homepage)
  - [x] Create `homepage` schema (hero title, hero description, hero image, hero button text, hero button URL, about heading, about description)
  - [x] Register schema in `schemaTypes/index.js`
  - [x] Make Homepage a singleton (fixed ID `homepage`, custom Studio menu)
  - [x] Create realistic sample Homepage document (seed script)
  - [x] Verify the document is visible and editable in Sanity Studio

- [x] Task 3: Connect React to Sanity
  - [x] Add `http://localhost:5173` as a CORS origin in Sanity
  - [x] Write the Homepage GROQ query in `services/`
  - [x] Fetch Homepage content with the Sanity client
  - [x] Prove React receives the data (simple output, no full page yet)

- [x] Task 4: Build the Homepage
  - [x] Create reusable Hero component
  - [x] Create reusable About section component
  - [x] Render Sanity images with an image URL helper
  - [x] Add loading, error, and empty states (shared `StatusMessage`)
  - [x] Edit content in Studio and verify the frontend updates

- [x] Task 5: Site Settings
  - [x] Create `siteSettings` schema (site title, description, contact email, logo, social links)
  - [x] Seed realistic sample Site Settings
  - [x] Query Site Settings from React
  - [x] Use Site Settings in layout (header/footer, document title, meta description)
  - [x] Extract shared `useSanityData` hook for loading/error state

- [x] Task 6: Navigation from Sanity
  - [x] Create `navigationItem` schema (label, URL, order, active status)
  - [x] Seed realistic navigation items
  - [x] Query active items ordered by `order`
  - [x] Build Navigation component from CMS data (no hard-coded menu)
  - [x] Change a label in Studio and verify the frontend updates

- [x] Task 7: Projects
  - [x] Create `project` schema (title, slug, short description, full description, image, URL, technology, featured)
  - [x] Seed several realistic sample projects
  - [x] Add routing and the `/projects` page
  - [x] Display projects as reusable cards
  - [x] Shared Layout route, internal links without page reloads, 404 page

- [x] Task 8: Project Details
  - [x] Create `/projects/:slug` dynamic route
  - [x] Query a single project by slug with GROQ filtering
  - [x] Handle "project not found"
  - [x] Link project cards to their detail pages

- [x] Task 9: Contact Page
  - [x] Create `/contact` page
  - [x] Show contact email from Site Settings
  - [x] Reuse global CMS content across pages

- [x] Change request: separate About page (requested after Task 9)
  - [x] Create `aboutPage` singleton schema (heading, description)
  - [x] Move existing About text out of the Homepage document into the About Page
  - [x] Remove About fields from the Homepage schema and query
  - [x] Add `/about` route and page; remove About section from the homepage
  - [x] Change the About menu link from `/#about` to `/about`

- [x] Task 10: Final Cleanup
  - [x] Review folder and component organization
  - [x] Review schemas and GROQ queries (link validation, unique technologies)
  - [x] Review environment variables
  - [x] Check responsive design
  - [x] Check error, loading, and empty states (all 7 routes, 0 console errors)
  - [x] Remove unnecessary code and dependencies (unused export, TypeScript type packages, Vite favicon)
  - [x] Confirm no hard-coded CMS content remains (only interface labels are fixed text)
  - [x] Logo: crop tool in Studio, 44px header logo, logo used as browser tab icon
  - [x] Document the final architecture

- [ ] Deployment (next)
  - [x] Put the project on GitHub (github.com/jibson907/portfolio)
  - [ ] Publish the website with GitHub Pages (workflow fixed and tested locally; blocked: GitHub does not start the job)
  - [ ] Deploy Sanity Studio online
  - [x] Allow the live website address in Sanity CORS (https://jibson907.github.io)
