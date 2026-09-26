// Customizes the Studio's left-hand menu.
// A website has exactly one homepage, about page, and set of site settings, so instead of
// lists where editors could create many copies, each menu item opens one fixed
// document. The seed scripts and the frontend rely on these IDs.
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(S.document().schemaType('homepage').documentId('homepage')),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      // Navigation is a collection: a list of many documents, shown in menu order.
      S.listItem()
        .title('Navigation')
        .id('navigation')
        .schemaType('navigationItem')
        .child(
          S.documentTypeList('navigationItem')
            .title('Navigation')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
      S.listItem()
        .title('Projects')
        .id('projects')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),
    ])
