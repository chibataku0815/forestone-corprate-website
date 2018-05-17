import contentful from 'contentful'
import config from './.contentful.json'
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
})

module.exports = {

  /*
   ** Headers of the page
   */
  head: {
    title: 'forestone-corprate-website',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: ['~plugins/contentful.js'],
  generate: {
    routes() {
      return client.getEntries({
        'content_type': config.CTF_BLOG_POST_TYPE_ID
      }).then((entries) => {
        return [...entries.items.map(entry => `posts/${entry.fields.slug}`)]
      })
    }
  },
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: config.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  }
}
