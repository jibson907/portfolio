import { NavLink } from 'react-router'
import AppLink from './AppLink'
import { isInternalUrl } from '../lib/isInternalUrl'

// The main menu. It renders whatever items Sanity returns, in the order given,
// so adding, renaming, reordering, or hiding links happens in the Studio only.
function Navigation({ items = [] }) {
  if (items.length === 0) return null

  return (
    <nav className="navigation" aria-label="Main">
      <ul className="navigation__list">
        {items.map((item) => (
          <li key={item._id}>
            {isInternalUrl(item.url) && !item.url.includes('#') ? (
              // NavLink adds aria-current="page" when the current URL starts with its URL,
              // so "Projects" stays active on /projects/some-project.
              // `end` (exact match only) stops "Home" (/) from matching every page.
              <NavLink className="navigation__link" to={item.url} end={item.url === '/'}>
                {item.label}
              </NavLink>
            ) : (
              // Section links (/#about) and external links never count as "the current page".
              <AppLink className="navigation__link" href={item.url}>
                {item.label}
              </AppLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
