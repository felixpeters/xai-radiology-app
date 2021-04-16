/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `RadiologyAI`,
    description: `AI-supported tool for analysis of computed tomography.`,
    author: `@_fpeters`,
  },
  /* Your site config here */
  plugins: ["gatsby-plugin-react-helmet", "gatsby-plugin-postcss"],
}
