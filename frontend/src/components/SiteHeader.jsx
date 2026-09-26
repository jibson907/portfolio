import { Link } from 'react-router'
import { urlFor } from '../lib/sanityImage'
import Navigation from './Navigation'

// Site-wide header: logo and site title from Site Settings, menu from Navigation.
// Each part is optional, so the header still works if one request fails.
function SiteHeader({ siteTitle, logo, navigationItems }) {
  return (
    <header className="site-header">
      {siteTitle && (
        <Link className="site-header__brand" to="/">
          {logo?.asset && (
            // A square crop at twice the display size, so it stays sharp on high-resolution screens.
            // It follows the crop set in the Studio. alt="" because the site title next to it says the same thing.
            <img
              className="site-header__logo"
              src={urlFor(logo).width(88).height(88).fit('crop').auto('format').url()}
              alt=""
              width="44"
              height="44"
            />
          )}
          <span>{siteTitle}</span>
        </Link>
      )}

      <Navigation items={navigationItems} />
    </header>
  )
}

export default SiteHeader
