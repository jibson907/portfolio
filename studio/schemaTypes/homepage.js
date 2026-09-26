import { defineField, defineType } from 'sanity'
import { validateLink } from './linkValidation'

// A schema describes the shape of one kind of content. Sanity uses it to build
// the editing form in the Studio. It does NOT create a database table: the
// content itself is stored as JSON documents in the Content Lake.
export const homepage = defineType({
  name: 'homepage', // Saved on every document as _type: "homepage"; used in GROQ queries
  title: 'Homepage', // Shown to editors in the Studio
  type: 'document', // A top-level item that can be created, edited, and published
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string', // Short, single-line text
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text', // Plain multi-line text
      rows: 3,
      validation: (rule) => rule.required().max(250),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true }, // Lets editors choose the focal point when the image is cropped
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe the image for screen readers and search engines.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Hero button text',
      type: 'string',
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: 'heroButtonUrl',
      title: 'Hero button URL',
      type: 'url',
      description: 'A full link (https://…), an email link (mailto:…), or a page on this site (/projects).',
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }).custom(validateLink),
    }),
    // The About heading and description moved to their own document: see aboutPage.js
  ],
})
