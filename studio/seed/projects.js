// Seeds sample portfolio projects.
// Run from the studio folder (requires `npx sanity login` first):
//   npm run seed:projects
//
// Safe to run again: projects that already exist are skipped, so Studio edits are never overwritten.

import { createReadStream } from 'node:fs'
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-25' })

// Placeholder project links: replace them with your real repositories or live sites in the Studio.
const projects = [
  {
    slug: 'retail-sales-dashboard',
    title: 'Retail Sales Analytics Dashboard',
    shortDescription:
      'An interactive dashboard that tracks daily sales, top products, and regional performance for a chain of retail stores.',
    fullDescription:
      'A regional retailer was tracking sales in separate spreadsheets for each branch, which made it slow to spot trends or compare stores.\n\nI cleaned and merged two years of transaction data with Python and Pandas, modelled it into a simple star schema, and built a Power BI dashboard with filters for date, branch, and product category.\n\nManagers now see yesterday\'s performance every morning without waiting for a weekly report, and the team used it to cut slow-moving stock in three branches.',
    image: 'sales-dashboard.jpg',
    alt: 'A desk with a monitor, tablet, keyboard, and notebook arranged neatly',
    projectUrl: 'https://github.com/your-username/retail-sales-dashboard',
    technologies: ['Python', 'Pandas', 'Power BI', 'SQL'],
    featured: true,
  },
  {
    slug: 'clinic-appointment-booking',
    title: 'Clinic Appointment Booking System',
    shortDescription:
      'A web app that lets patients book, reschedule, and cancel clinic appointments online, with an admin view for staff.',
    fullDescription:
      'Patients at a small private clinic had to call during office hours to book appointments, and staff kept the schedule in a paper diary.\n\nI built a React frontend with a Node.js and Express API backed by PostgreSQL. Patients choose a doctor and an open time slot; staff get a daily schedule view and can block out unavailable hours.\n\nAutomatic email reminders reduced missed appointments, and the front desk spends far less time on the phone.',
    image: 'clinic-booking.jpg',
    alt: 'A laptop on a wooden desk next to an open notebook with sketches',
    projectUrl: 'https://github.com/your-username/clinic-appointment-booking',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    featured: true,
  },
  {
    slug: 'student-performance-predictor',
    title: 'Student Performance Predictor',
    shortDescription:
      'A machine learning model that flags students at risk of failing early in the term so teachers can offer support sooner.',
    fullDescription:
      'Teachers usually only discover struggling students after mid-term exams, when there is little time left to help.\n\nUsing anonymised attendance, assignment, and test data, I trained and compared several classification models with scikit-learn. A random forest gave the best balance of accuracy and explainability, and I wrapped it in a Streamlit app where teachers upload a class list and see a risk score for each student.\n\nThe project also taught me a lot about handling imbalanced data and explaining model results to non-technical users.',
    image: 'student-performance.jpg',
    alt: 'A person holding a phone while working on a laptop',
    projectUrl: 'https://github.com/your-username/student-performance-predictor',
    technologies: ['Python', 'scikit-learn', 'Streamlit'],
    featured: true,
  },
  {
    slug: 'small-business-cms-website',
    title: 'Small Business Website with a Headless CMS',
    shortDescription:
      'A fast, responsive website for a local business, with a Sanity Studio so the owner can update content without a developer.',
    fullDescription:
      'The owner of a local catering business wanted to update the menu, prices, and photos without paying a developer for every change.\n\nI built the site with React and Vite and connected it to Sanity. The owner edits content in Sanity Studio, and the website picks up the changes automatically.\n\nThe site loads quickly on mobile data, which matters because most of their customers find them on their phones.',
    image: 'business-website.jpg',
    alt: 'A laptop, glasses, and a mouse on a wooden table',
    projectUrl: 'https://github.com/your-username/small-business-cms-website',
    technologies: ['React', 'Vite', 'Sanity'],
    featured: false,
  },
  {
    slug: 'rainfall-crop-yield-analysis',
    title: 'Rainfall and Crop Yield Analysis',
    shortDescription:
      'An exploratory data analysis of how rainfall patterns affect maize and sorghum yields across farming regions.',
    fullDescription:
      'This project combined public weather records with regional harvest data to see how the timing and amount of rainfall relate to crop yields.\n\nI cleaned and joined the datasets in Pandas, explored seasonal patterns with Matplotlib and Seaborn, and summarised the findings in a Jupyter notebook written for a non-technical audience.\n\nThe clearest finding was that rainfall in the early planting weeks mattered more than the season total.',
    image: 'crop-yield.jpg',
    alt: 'A hand on a mouse next to a keyboard and a coffee mug',
    projectUrl: 'https://github.com/your-username/rainfall-crop-yield-analysis',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
    featured: false,
  },
]

async function seedProjects() {
  for (const { slug, image, alt, ...fields } of projects) {
    const _id = `project-${slug}`

    if (await client.getDocument(_id)) {
      console.log(`Skipped "${fields.title}" (already exists).`)
      continue
    }

    const imageAsset = await client.assets.upload(
      'image',
      createReadStream(new URL(`./images/projects/${image}`, import.meta.url)),
      { filename: image },
    )

    await client.create({
      _id,
      _type: 'project',
      ...fields,
      slug: { _type: 'slug', current: slug }, // Slugs are stored as an object with a `current` value
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
        alt,
      },
    })
    console.log(`Created "${fields.title}".`)
  }

  console.log('Done. Open Sanity Studio → Projects to see and edit them.')
}

seedProjects().catch((error) => {
  console.error('Seeding failed:', error.message)
  process.exit(1)
})
