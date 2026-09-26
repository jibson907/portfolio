// Splits plain text from Sanity into paragraphs.
// A blank line in the Studio's text field starts a new paragraph.
export function toParagraphs(text = '') {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
