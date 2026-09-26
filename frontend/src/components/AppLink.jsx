import { Link } from 'react-router'
import { isInternalUrl } from '../lib/isInternalUrl'

// Internal links use the router, which swaps the page without a full browser reload.
// External links are plain <a> tags.
function AppLink({ href, children, ...props }) {
  if (isInternalUrl(href)) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

export default AppLink
