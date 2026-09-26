// Site-wide footer: title, contact email, and social links from Site Settings.
function SiteFooter({ siteTitle, contactEmail, socialLinks = [] }) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p className="site-footer__copyright">
        © {year} {siteTitle}
      </p>

      <ul className="site-footer__links">
        {contactEmail && (
          <li>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </li>
        )}
        {socialLinks.map((link) => (
          <li key={link._key}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.platform}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}

export default SiteFooter
