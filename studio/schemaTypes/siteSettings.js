import { defineArrayMember, defineField, defineType } from 'sanity'

// Global content that appears on every page (header, footer, browser tab),
// kept in one place so it only needs to be edited once.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      description: 'Shown in the header, footer, and browser tab.',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site description',
      type: 'text',
      rows: 3,
      description: 'A one or two sentence summary. Used by search engines and link previews.',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'email', // Built-in type that checks the address format
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description:
        'Shown small in the header and as the browser tab icon. Use the crop tool to keep only the icon part of a logo with text.',
      options: { hotspot: true }, // Enables the crop and focal-point tools in the Studio
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
      name: 'socialLinks',
      title: 'Social links',
      type: 'array', // An ordered list; editors can add, remove, and drag to reorder
      of: [
        defineArrayMember({
          name: 'socialLink',
          title: 'Social link',
          type: 'object', // A group of fields that lives inside this document
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['GitHub', 'LinkedIn', 'X', 'Instagram', 'Facebook', 'YouTube', 'Other'],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          // How each item appears in the list inside the Studio
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        }),
      ],
    }),
  ],
})
