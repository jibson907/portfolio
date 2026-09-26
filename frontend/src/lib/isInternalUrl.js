// URLs from Sanity can point inside the site ("/projects") or outside it ("https://…").
// "//example.com" is excluded because browsers treat it as an external address.
export function isInternalUrl(url = '') {
  return url.startsWith('/') && !url.startsWith('//')
}
