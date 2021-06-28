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
    {
      resolve: "gatsby-plugin-mixpanel",
      options: {
        apiToken: "f72f27e4b75db721be6fd9207e86a027",
        // optional fields, default values
        enableOnDevMode: true, // if false mixpanel will be activated on NODE_ENV=production only
        mixpanelConfig: {
          api_host: "https://api-eu.mixpanel.com",
        }, // override specific config for mixpanel initialization https://github.com/mixpanel/mixpanel-js/blob/8b2e1f7b/src/mixpanel-core.js#L87-L110
        pageViews: "all", // see below
        // set pageViews to 'all' and use this option to set the same event name for all page view events
        trackPageViewsAs: "view page", // optionally: set an Event Name to use for all page views, eg: trackPageViewsAs: 'Page view'
        //getPageViewTransformerFn: null, // optionally: function body as a string to customize the event sent to mixpanel. Receives one parameter: location. Example 'return () => ({url: location.pathname})'
      },
    },
  ],
}
