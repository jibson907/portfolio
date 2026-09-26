import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { getSiteSettings } from '../services/siteSettingsService'
import { getNavigation } from '../services/navigationService'
import { useSanityData } from '../lib/useSanityData'
import { urlFor } from '../lib/sanityImage'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

// The shared frame around every page. It loads Site Settings and Navigation once;
// they stay loaded while the visitor moves between pages.
function Layout() {
  // The two requests run in parallel; each part of the header appears when its data arrives.
  const { data: settings, status: settingsStatus } = useSanityData(getSiteSettings)
  const { data: navigationItems } = useSanityData(getNavigation)
  const { pathname } = useLocation()

  // Start each new page at the top, like a normal website would.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="page">
      {/* React 19 moves <meta> and <link> into the document <head> automatically. */}
      {settings?.siteDescription && <meta name="description" content={settings.siteDescription} />}
      {settings?.logo?.asset && (
        // Browser tab icon: the logo from Site Settings, cropped square as set in the Studio.
        <link rel="icon" href={urlFor(settings.logo).width(64).height(64).fit('crop').format('png').url()} />
      )}

      <SiteHeader
        siteTitle={settings?.siteTitle}
        logo={settings?.logo}
        navigationItems={navigationItems ?? []}
      />

      <main>
        {/* The current page renders here. `context` lets pages read the site settings. */}
        <Outlet context={{ settings, settingsStatus }} />
      </main>

      {/* If settings are missing or fail to load, the page still works without footer content. */}
      {settings && (
        <SiteFooter
          siteTitle={settings.siteTitle}
          contactEmail={settings.contactEmail}
          socialLinks={settings.socialLinks}
        />
      )}
    </div>
  )
}

export default Layout
