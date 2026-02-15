// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const siteName= process.env.SITE_NAME
const projectName= process.env.PROJECT_NAME || siteName
const baseUrl = process.env.BASE_URL || '/'
const url = process.env.URL || 'https://www.kingtech.nl'
const customCss = process.env.CUSTOM_CSS

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
  projectName: projectName, // Usually your repo name.
  presets: [
    [
      'classic',
      {
        docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            routeBasePath: "/",
        },
        blog: false, // Optional: disable the blog plugin
        // ...
        
        theme: {
            customCss: customCss ? require.resolve(customCss) : undefined,
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
            href: url,
            label: 'KingTech',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} KingTech.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;
