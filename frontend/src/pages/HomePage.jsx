import { useOutletContext } from 'react-router'
import { getHomepage } from '../services/homepageService'
import { useSanityData } from '../lib/useSanityData'
import Hero from '../components/Hero'
import StatusMessage from '../components/StatusMessage'

// The page's job: fetch the Homepage content, handle the waiting and failure
// cases, then hand the data to presentational components.
function HomePage() {
  const { settings } = useOutletContext()
  const { data: homepage, status } = useSanityData(getHomepage)

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

  if (!homepage) {
    return (
      <StatusMessage title="Nothing published yet">
        Open Sanity Studio, fill in the Homepage, and click Publish.
      </StatusMessage>
    )
  }

  return (
    <>
      {settings?.siteTitle && <title>{settings.siteTitle}</title>}
      <Hero
        title={homepage.heroTitle}
        description={homepage.heroDescription}
        image={homepage.heroImage}
        buttonText={homepage.heroButtonText}
        buttonUrl={homepage.heroButtonUrl}
      />
    </>
  )
}

export default HomePage
