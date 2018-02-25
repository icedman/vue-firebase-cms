/*
var Template = [
  {
    name: 'Menu',
    path: '',
    meta: { icon: 'fa-building-o', expanded: false },
    children: [
      {
        name: 'Form',
        path: '/TemplateForm',
        meta: { icon: 'fa-building-o', expanded: false },
        children: []
      }
    ]
  }
]
*/

export default [
  {
    name: 'Posts',
    path: '/posts',
    meta: { icon: 'fa-edit', expanded: false },
  },
  {
    name: 'Pages',
    path: '/pages',
    meta: { icon: 'fa-file', expanded: false },
  },
  {
    name: 'Media',
    path: '',
    url: 'http://google.com',
    meta: { icon: 'fa-image', expanded: false },
  },
  {
    name: 'Comments',
    path: '',
    meta: { icon: 'fa-comments-o', expanded: false },
  },
  {
    name: 'Plugins',
    path: '',
    meta: { icon: 'fa-plug', expanded: false },
  },
  {
    name: 'Appearance',
    path: '',
    meta: { icon: 'fa-eye', expanded: false },
    children: [
      {
        name: 'Theme',
        path: '/TemplateForm',
        meta: { icon: 'fa-cog', expanded: false },
      },
      {
        name: 'Menu',
        path: '/TemplateForm',
        meta: { icon: 'fa-cog', expanded: false },
      },
    ],
  },
  {
    name: 'Settings',
    path: '',
    meta: { icon: 'fa-cogs', expanded: false },
  },
];
