# Implementation Plan — Mini Personal Website CMS

## 1. Project objective

Build a small personal website (Home, About, Projects, Contact) whose content is managed in Sanity Studio and displayed by a React frontend. The real goal is to learn the headless CMS workflow:

```text
Sanity Studio → Content → Sanity API → React Frontend → Website
```

React owns presentation, layout, components, styling, and behaviour. Sanity owns content.

## 2. Technology stack

| Layer | Tool | Why |
|---|---|---|
| Frontend | React + Vite (JavaScript) | Fast dev server, minimal config, standard React setup |
| CMS | Sanity (hosted Content Lake) | Headless CMS: stores content, exposes it via API |
| CMS editor | Sanity Studio | React app where content is edited, configured with schemas |
| Data client | `@sanity/client` | Official client for querying the Sanity API with GROQ |
| Routing (Task 7+) | `react-router` (v8) | Added in Task 7. v7+ ships as one package; `react-router-dom` only re-exports it |
| Images (Task 4+) | `@sanity/image-url` | Added only when Sanity images are rendered |

No UI libraries, no extra database, no authentication.

## 3. Overall architecture

```text
┌──────────────┐   edits    ┌──────────────────────┐
│ Sanity Studio│ ─────────▶ │ Sanity Content Lake  │
│  (studio/)   │            │ (project + dataset)  │
└──────────────┘            └──────────┬───────────┘
                                       │ HTTPS API (GROQ queries)
                                       ▼
                            ┌──────────────────────┐
                            │ React frontend       │
                            │ (frontend/)          │
                            │ lib → services → UI  │
                            └──────────────────────┘
```

`frontend` and `studio` are two independent npm projects. They never import each other; they share only the Sanity project ID and dataset.

## 4. Frontend structure

```text
frontend/
├── src/
│   ├── components/   Reusable UI pieces (Hero, Navigation, ProjectCard…)
│   ├── pages/        Route-level views (Home, About, Projects, ProjectDetail, Contact)
│   ├── services/     GROQ queries + fetch functions (no JSX here)
│   ├── lib/          Low-level setup: Sanity client, image URL helper
│   ├── assets/       Static assets bundled by Vite
│   ├── App.jsx       Root component (routing added in Task 7)
│   └── main.jsx      Entry point
├── .env              Sanity config for Vite (not committed)
├── .env.example      Template showing required variables
└── package.json
```

Rule: components never call the Sanity client directly. They call a function from `services/`, which uses the client from `lib/`.

## 5. Sanity structure

```text
studio/
├── schemaTypes/
│   └── index.js      Exports the list of schema types (empty in Task 1)
├── sanity.config.js  Studio config: project, dataset, plugins, schemas
├── sanity.cli.js     CLI config: project + dataset used by `sanity` commands
├── .env              SANITY_STUDIO_* variables (not committed)
└── package.json
```

Seed scripts for sample content will live in `studio/seed/` and are kept separate from app logic.

## 6. Content models (created in their assigned tasks)

| Type | Kind | Fields | Task |
|---|---|---|---|
| `homepage` | singleton | heroTitle, heroDescription, heroImage, heroButtonText, heroButtonUrl (About fields moved to `aboutPage`) | 2 |
| `aboutPage` | singleton | heading, description | change request after 9 |
| `siteSettings` | singleton | siteTitle, siteDescription, contactEmail, logo, socialLinks[] | 5 |
| `navigationItem` | collection | label, url, order, isActive | 6 |
| `project` | collection | title, slug, shortDescription, fullDescription, image, projectUrl, technologies[], featured | 7 |

## 7. Data flow

1. Editor changes content in Studio → saved to the dataset in the Content Lake.
2. React calls a service function, e.g. `getHomepage()`.
3. The service sends a GROQ query through the Sanity client.
4. Sanity's API (CDN) returns JSON.
5. React stores it in state and renders components.

## 8. Environment variables

| File | Variable | Purpose |
|---|---|---|
| `frontend/.env` | `VITE_SANITY_PROJECT_ID` | Which Sanity project to read from |
| `frontend/.env` | `VITE_SANITY_DATASET` | Which dataset (e.g. `production`) |
| `frontend/.env` | `VITE_SANITY_API_VERSION` | Date-pinned API version |
| `studio/.env` | `SANITY_STUDIO_PROJECT_ID` | Project used by the Studio and CLI |
| `studio/.env` | `SANITY_STUDIO_DATASET` | Dataset used by the Studio and CLI |

Only the `VITE_` prefix is exposed to browser code by Vite; only `SANITY_STUDIO_` is exposed by the Studio. The project ID and dataset are public identifiers, not secrets. Write tokens (needed for seed scripts) are never placed in the frontend.

## 9. Development sequence

Tasks 1–10 as listed in `task list.md`, strictly in order, stopping after each task.

## 10. Testing approach

- Each task: run the dev servers and check the result in the browser.
- `npm run build` / `npm run lint` in `frontend` to catch errors.
- `npx sanity build` in `studio` to catch schema/config errors.
- CMS round-trip test from Task 4: edit in Studio → refresh frontend → see change.
- Check loading, error, and empty states by temporarily breaking a query or unpublishing content.

## 11. Final architecture (as built)

```text
                 SANITY CMS (project 79rzokps, dataset production)
                                   │
   ┌────────────┬─────────────┬────┴────────┬─────────────┐
   │            │             │             │             │
Homepage   About Page   Site Settings   Navigation     Projects
(single)   (single)     (single)        (collection)   (collection)
   │            │             │             │             │
   └────────────┴─────────────┴──────┬──────┴─────────────┘
                                     ↓
                     Sanity API / image CDN (GROQ)
                                     ↓
          frontend/src/services/*  →  lib/sanityClient.js
                                     ↓
   Layout: Site Settings + Navigation → header, footer, tab icon, meta
                                     ↓
   /               HomePage            /projects        ProjectsPage
   /about          AboutPage           /projects/:slug  ProjectDetailPage
   /contact        ContactPage         *                NotFoundPage
                                     ↓
                                  Website
```

Fixed interface text (not CMS content): page labels such as "Projects", "Contact", "Email", "Find me online", "Read more", "Visit project", "All projects", and the loading/error/empty messages.

## Decision log

- **Project location:** `portfolio/mini-personal-cms/`.
- **Studio scaffolded by hand** instead of `npm create sanity`, because the interactive wizard needs a browser login. The resulting files match the standard "clean" template.
- **Sanity project:** ID `79rzokps`, dataset `production` (public read). Created by the user at sanity.io/manage.
- **Vision plugin deferred:** `@sanity/vision` (GROQ playground) is not installed in Task 1; it can be added in Task 3 when GROQ is introduced.
- **CORS:** allowed origins are `http://localhost:3333` (Studio) and `http://localhost:5173` (frontend, added in Task 3). A deployed site will need its own domain added.
- **Homepage is a singleton:** fixed document ID `homepage`, opened from a custom Studio menu (`studio/structure.js`) and hidden from "Create new document". Queries can rely on exactly one homepage.
- **Plain `text` for descriptions:** `heroDescription` and `aboutDescription` are plain multi-line text, not Portable Text (rich text), to keep rendering simple. Can be upgraded later if bold/links are needed.
- **Seed scripts:** live in `studio/seed/`, run with `sanity exec --with-user-token` (uses the logged-in CLI user; no token stored in files). They use `create` only if the document doesn't exist, so they never overwrite Studio edits.
- **Images:** `@sanity/image-url` (added in Task 4) builds CDN URLs; `components/SanityImage.jsx` renders any Sanity image field responsively (srcset, crop to aspect ratio around the Studio hotspot, WebP/AVIF via `auto('format')`).
- **Page vs components:** pages (`pages/HomePage.jsx`) fetch data and handle loading/error/empty; components (`Hero`, `AboutSection`) only receive props.
- **Visual design:** one typeface (Schibsted Grotesk via Google Fonts), tokens in `:root` of `index.css`: paper `#fafaf8`, ink `#16232b`, muted `#56636b`, rule `#dce1e3`, accent teal `#0b6e5f`. No UI library, gradients, or animation.
- **Site Settings is a singleton** (fixed ID `siteSettings`), loaded once in the site-wide layout (`App.jsx` in Task 5, `components/Layout.jsx` since Task 7) and passed to `SiteHeader` and `SiteFooter`. If it fails to load, the page still renders without header/footer content.
- **`lib/useSanityData.js`** (Task 5): shared hook that runs a service function and returns `{ data, status }`, replacing the copy-pasted `useEffect` logic in pages.
- **Page title and meta description** are rendered with React 19's built-in `<title>` / `<meta>` support (hoisted into `<head>`); `index.html` no longer has a hard-coded title.
- **Placeholder contact details:** the seeded email (`hello@example.com`) and social URLs are placeholders to be replaced in the Studio; real personal details are never written by seed scripts.
- **Dev server port pinned:** `frontend/vite.config.js` uses `port: 5173, strictPort: true`. Without it Vite silently moves to 5174 when 5173 is busy, and every Sanity request is then blocked by CORS.
- **Navigation is a collection** (`navigationItem`, one document per link, seeded with fixed IDs `navigation-*`). The frontend queries `isActive == true` sorted by `order`, loaded in `App.jsx` alongside Site Settings. The Studio lists items in menu order.
- **Routing (Task 7):** `BrowserRouter` in `main.jsx`; routes in `App.jsx` nested under a layout route (`components/Layout.jsx`) that loads Site Settings + Navigation once and renders `<Outlet context={{ settings }} />`. Pages read settings with `useOutletContext()` and set their own `<title>`. Unknown URLs show `NotFoundPage`.
- **Links from Sanity:** `components/AppLink.jsx` uses the router for internal paths (`/…`) and a plain `<a>` for external URLs (`lib/isInternalUrl.js`). Navigation uses `NavLink` for page links so the active page is marked with `aria-current`.
- **Projects** are a collection (`project`, seeded with IDs `project-<slug>`), listed featured-first then newest-first. `fullDescription` is plain text like the other descriptions.
- **Project details (Task 8):** route `/projects/:slug` → `pages/ProjectDetailPage.jsx`. The slug from `useParams()` is passed to GROQ as a parameter (`slug.current == $slug`), never pasted into the query string. No match → "Project not found" message. Cards link to their detail page; the external project URL is shown on the detail page.
- **`useSanityData` re-fetches when its function changes** (used with `useCallback` per slug) and remembers which request produced the stored result, so an old project is never shown under a new URL.
- **Shared helper:** `lib/toParagraphs.js` splits plain text into paragraphs (About section, project details).
- **Contact page (Task 9):** `/contact` → `pages/ContactPage.jsx`. It makes no request of its own: it reads the Site Settings (email, social links) that `Layout` already loaded, via `useOutletContext()` (`{ settings, settingsStatus }`). No backend email service. The UI labels "Contact", "Email", "Find me online" are fixed interface text, not CMS content.
- **Separate About page (change request after Task 9):** About content moved from the Homepage document to its own `aboutPage` singleton (fixed ID `aboutPage`) so each page has its own document in the Studio. `seed/aboutPage.js` moved the existing text in one transaction and removed the old Homepage fields. The site has a `/about` route; the homepage shows only the hero; the menu links to `/about`.
- **Task 10 cleanup:** link fields must start with `/`, `http(s)://` or `mailto:` (`studio/schemaTypes/linkValidation.js`); technologies must be unique; logo has crop/hotspot and is shown as a 44px square crop and as the tab icon (Vite favicon removed); card images lazy-load; removed unused `sanityConfig` export and the TypeScript-only `@types/react*` packages.
