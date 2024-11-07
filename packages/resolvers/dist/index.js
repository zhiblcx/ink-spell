'use strict'
var e = [
  'BookContentSetUp',
  'BookDirectory',
  'BookShelf',
  'BookShelfDetail',
  'EmptyPage',
  'EmailInput',
  'ErrorPage',
  'GlobalPending',
  'InkCard',
  'LanguageSelect',
  'Navigation',
  'PersonCard',
  'Sortable',
  'ThemeToggle',
  'UploadBase64Photo',
  'UploadPhoto',
  'SortableItem'
]
var n = () => ({
  type: 'component',
  resolve: (o) => {
    if (e.includes(o)) return { from: '@/shared/components', name: o }
  }
})
exports.clientComponentResolver = n //# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
