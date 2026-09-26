import { defineArrayMember, defineField, defineType } from 'sanity'

// One portfolio project. Like navigation, this is a collection: one document per project.
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL-friendly name used in the project page address, e.g. /projects/sales-dashboard. Click "Generate" to create it from the title.',
      options: {
        source: 'title', // The "Generate" button builds the slug from the title
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 2,
      description: 'One or two sentences shown on the project card.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full description',
      type: 'text',
      rows: 8,
      description: 'Shown on the project page. Leave a blank line between paragraphs.',
    }),
    defineField({
      name: 'image',
      title: 'Project image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      description: 'Link to the live project or its source code.',
    }),
    defineField({
      name: 'technologies',
      title: 'Technology',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' }, // Type a technology and press Enter to add it
      validation: (rule) => rule.unique(), // The same technology can't be added twice
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured projects are listed first.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', technologies: 'technologies', media: 'image', featured: 'featured' },
    prepare({ title, technologies, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: technologies?.join(', '),
        media,
      }
    },
  },
})
