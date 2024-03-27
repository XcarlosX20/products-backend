require('dotenv').config({ path: '.env' })
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const myVariables = [
  {
    name: 'FRONTEND_URL',
    urls: {
      development: process.env.CLIENT_URL_LOCAL,
      production: process.env.CLIENT_URL,
    },
  },
  {
    name: 'DB_URL',
    urls: {
      development: process.env.DB_LOCAL,
      production: process.env.DB_URL,
    },
  },
]
myVariables.forEach((i) => (module.exports[i.name] = i.urls[env]))
