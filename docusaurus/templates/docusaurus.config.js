// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');
const mermaid = import('mdx-mermaid');

const siteName= process.env.SITE_NAME
const projectName= process.env.PROJECT_NAME || siteName
const baseUrl = process.env.BASE_URL || '/'
const url = process.env.URL || 'https://www.kingtech.nl'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: siteName,
  tagline: siteName,
  url: url,
  baseUrl: baseUrl,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'kingtech', // Usually your GitHub org/user name.
  projectName: projectName,//process.env.PROJECT_NAME, // Usually your repo name.
  plugins: [[ require.resolve('docusaurus-lunr-search'), {
    languages: ['en'], // language codes
    maxHits: 50
  }]],
  presets: [
    [
      '@docusaurus/preset-classic',
    {
      docs: {
        sidebarPath: require.resolve("./sidebars.js"),
        routeBasePath: "/",
        remarkPlugins: [mermaid, math],
        rehypePlugins: [katex],
      },
      blog: false, // Optional: disable the blog plugin
      // ...
    
        theme: {
          customCss: require.resolve('./static/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: siteName,
        logo: {
          alt: 'KingTech Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docsVersionDropdown',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: url,
            label: 'KingTech',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Last stable version',
                to: '/',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} KingTech.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    markdown: {
      mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'], 
};

module.exports = config;
