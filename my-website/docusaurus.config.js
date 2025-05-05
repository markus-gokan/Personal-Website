// docusaurus.config.js
const path = require('path');

module.exports = {
  title: 'Markus Gokan',
  tagline: 'Engineer | Hobbyist | Classic Car Enthusiast',
  url: 'https://markusgokan.github.io',
  baseUrl: '/portfolio-site/',
  favicon: 'img/favicon.ico',
  organizationName: 'markusgokan',
  projectName: 'portfolio-site',



  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false,
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
        // ← NO configureWebpack here!
      },
    ],
  ],

  themeConfig: {
    navbar: {
      style: 'dark',
      title: 'Markus Gokan',
      items: [
        { to: '/about',  label: 'About',   position: 'left' },
        { to: '/projects', label: 'Portfolio', position: 'left' },
        { to: '/gallery.mdx',  label: 'Gallery',  position: 'left' },
        {
          href: 'https://www.linkedin.com/in/markus-gokan/',
          label: 'LinkedIn',
          position: 'right',
        },
      ],
    },
    colorMode: { defaultMode: 'dark' },
  },
};