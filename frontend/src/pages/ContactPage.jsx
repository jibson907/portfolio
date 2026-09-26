import { useOutletContext } from 'react-router'
import StatusMessage from '../components/StatusMessage'

// /contact: reuses the Site Settings the Layout already loaded, so this page
// makes no request of its own. Edit the email or social links once in the
// Studio and the header, footer, and this page all update together.
function ContactPage() {
  const { settings, settingsStatus } = useOutletContext()

  if (settingsStatus === 'loading') {
    return <StatusMessage title="Loading…" />
  }

  if (settingsStatus === 'error') {
    return (
      <StatusMessage title="Contact details couldn't load">
        The content service didn't respond. Check your connection and refresh the page.
      </StatusMessage>
    )
  }

  const contactEmail = settings?.contactEmail
  const socialLinks = settings?.socialLinks ?? []
  const pageTitle = settings?.siteTitle ? `Contact | ${settings.siteTitle}` : 'Contact'

  if (!contactEmail && socialLinks.length === 0) {
    return (
      <StatusMessage title="No contact details yet">
        Add a contact email or social links in Sanity Studio under Site Settings, then click Publish.
      </StatusMessage>
    )
  }

  return (
    <section className="contact-page">
      <title>{pageTitle}</title>
      <h1 className="page-title">Contact</h1>

      {contactEmail && (
        <div className="contact-page__group">
          <h2 className="contact-page__label">Email</h2>
          <a className="contact-page__email" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </div>
      )}

      {socialLinks.length > 0 && (
        <div className="contact-page__group">
          <h2 className="contact-page__label">Find me online</h2>
          <ul className="contact-page__links">
            {socialLinks.map((link) => (
              <li key={link._key}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default ContactPage
