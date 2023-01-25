export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'New Town Mountain',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    '@nuxtjs/axios'
  ],
  serverMiddleware: [
    {path: '/create_new_invoice', handler: '~/api/create_new_invoice.js'},
    {path: '/get_all_invoices', handler: '~/api/get_all_invoices.js'},
    {path: '/save_item_to_table', handler: '~/api/save_item_to_table.js'},
    {path: '/get_all_data_for_invoice', handler: '~/api/get_all_data_for_invoice.js'},
    {path: '/delete_invoice', handler: '~/api/delete_invoice.js'},
    {path: '/load_current_item', handler: '~/api/load_current_item.js'},
    {path: '/edit_item', handler: '~/api/edit_item.js'},
    {path: '/delete_item_from_invoice', handler: '~/api/delete_item_from_invoice.js'},
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-sweetalert2'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
