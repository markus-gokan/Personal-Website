// docusaurus.config.js
const path = require('path');

module.exports = {
  title: 'Markus Gokan',
  tagline: 'Engineer | Hobbyist | Classic Car Enthusiast',
  url: 'https://markusgokan.github.io',
  baseUrl: '/portfolio-site/',
  favicon: 'img/tron-bike.png',
  organizationName: 'markus-gokan',
  projectName: 'Personal-Website',



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
      hideOnScroll: true,
      items: [
        { to: '/projects', label: 'Portfolio', position: 'left' },
        { to: '/about',  label: 'About',   position: 'left' },
        { to: '/gallery',  label: 'Gallery',  position: 'left' },
      
      ],
    },
    colorMode: { defaultMode: 'dark' },
    respectPrefersColorScheme: false,
  },
};