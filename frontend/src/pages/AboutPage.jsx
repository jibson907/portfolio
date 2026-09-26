import { useOutletContext } from 'react-router'
import { getAboutPage } from '../services/aboutPageService'
import { useSanityData } from '../lib/useSanityData'
import { toParagraphs } from '../lib/toParagraphs'
import StatusMessage from '../components/StatusMessage'

// /about: content from the About Page document in Sanity.
function AboutPage() {
  const { settings } = useOutletContext()
  const { data: about, status } = useSanityData(getAboutPage)

  if (status === 'loading') {
    return <StatusMessage title="Loading…" />
  }

  if (status === 'error') {
    return (
      <StatusMessage title="This page couldn't load">
        The content service didn't respond. Check your connection and refresh the page.
      </StatusMessage>
    )
  }

  if (!about) {
    return (
      <StatusMessage title="Nothing published yet">
        Open Sanity Studio, fill in the About Page, and click Publish.
      </StatusMessage>
    )
  }

  const pageTitle = settings?.siteTitle ? `${about.heading} | ${settings.siteTitle}` : about.heading

  return (
    <article className="about-page">
      <title>{pageTitle}</title>
      <h1 className="page-title">{about.heading}</h1>
      <div className="about-page__body">
        {toParagraphs(about.description).map((paragraph, index) => (
          // The text never reorders, so its position is a safe, always-unique key
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}

export default AboutPage
