import { defineField, defineType } from 'sanity'

// Content for the /about page. A singleton, like the Homepage: there is one About page.
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 10,
      description: 'Leave a blank line between paragraphs.',
      validation: (rule) => rule.required(),
    }),
  ],
})
