// Shared rule for link fields (menu items, buttons).
// The built-in URL check accepts relative links like "projects/" too, but those
// break depending on the current page. Only allow links the website can follow.
export function validateLink(value) {
  if (!value) return true // Emptiness is handled by rule.required() where needed

  const isValid = /^(\/|https?:\/\/|mailto:)/.test(value)
  return (
    isValid ||
    'Start with "/" for a page on this site (e.g. /projects), or use a full link (https://…) or mailto:…'
  )
}
