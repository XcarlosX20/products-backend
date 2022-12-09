require('dotenv').config({ path: '.env' })
module.exports = {
  FRONTEND_URL:
    process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL
      : process.env.CLIENT_URL_LOCAL,
}