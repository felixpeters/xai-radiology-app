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
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./data/",
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: '/mus.js',
      },
    },
  ],
}
