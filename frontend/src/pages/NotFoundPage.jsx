import { Link } from 'react-router'

// Shown for any URL that doesn't match a route in App.jsx.
function NotFoundPage() {
  return (
    <div className="status">
      <title>Page not found</title>
      <h1 className="status__title">Page not found</h1>
      <p>
        There's nothing at this address. Check the link, or go to the <Link to="/">homepage</Link>.
      </p>
    </div>
  )
}

export default NotFoundPage
