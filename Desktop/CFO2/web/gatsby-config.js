/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require('dotenv').config()

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-sanity`,
      options:{
        projectId: `uclsz3yh`,
        dataset: `production`,
        token: process.env.SANITY_TOKEN
      }
    }
  ],
}
