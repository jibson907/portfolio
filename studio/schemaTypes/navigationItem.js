import { defineField, defineType } from 'sanity'
import { validateLink } from './linkValidation'

// One link in the site's main menu. Unlike the Homepage and Site Settings,
// this is a collection: there is one document per menu link.
export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation item',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The text shown in the menu, e.g. "Projects".',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'A page on this site starting with "/" (e.g. /projects), or a full link (https://…).',
      validation: (rule) =>
        rule
          .required()
          .uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] })
          .custom(validateLink),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first. Use gaps (10, 20, 30) so you can insert items later.',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Show in menu',
      type: 'boolean',
      description: 'Turn off to hide this link without deleting it.',
      initialValue: true, // New items start switched on
    }),
  ],
  // Sort options for document lists in the Studio
  orderings: [
    {
      title: 'Menu order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  // How each item appears in Studio lists
  preview: {
    select: { label: 'label', url: 'url', order: 'order', isActive: 'isActive' },
    prepare({ label, url, order, isActive }) {
      return {
        title: isActive === false ? `${label} (hidden)` : label,
        subtitle: `${order ?? '–'} · ${url ?? 'no URL'}`,
      }
    },
  },
})
