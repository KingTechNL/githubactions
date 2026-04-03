// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const {themes: prismThemes} = require('prism-react-renderer');
const {getDocsNavbarItems} = require('./navigation-utils');
const {getTranslationsConfig} = require('./translation-utils');

// Load configuration from environment variables with defaults
const siteName= process.env.SITE_NAME || 'GGV Blogs'
const projectName= process.env.PROJECT_NAME || siteName
const baseUrl = process.env.BASE_URL || '/'
const url = process.env.URL || 'https://www.kingtech.nl'
const customCss = process.env.CUSTOM_CSS
const brand = process.env.BRAND || 'KingTech'
const logo = process.env.LOGO || 'https://www.gravatar.com/avatar/1c367716e9c649121b5b877ad2f1b72f'
const favicon = process.env.FAVICON || 'https://www.gravatar.com/avatar/1c367716e9c649121b5b877ad2f1b72f'
const navbarAsRoot = process.env.NAVBAR_AS_ROOT === 'true'; // Default: false unless explicitly set to 'true'
const translationsDefault = process.env.TRANSLATIONS_DEFAULT || 'en';
const translationsPath = 'i18n';

// Read translation folders to configure i18n locales
const {
  translationFolderNames,
  translationLocaleConfigs,
  hasTranslations,
} = getTranslationsConfig({baseDir: __dirname, translationsPath});

// Docusaurus configuration object
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: siteName,
  tagline: siteName,
  url: url,
  baseUrl: baseUrl,
  onBrokenLinks: 'throw',
  markdown: {
    format: 'detect',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  favicon: favicon,
  organizationName: brand, // Usually your GitHub org/user name.
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
          alt: `${ brand } Logo`,
          src: logo,
        },
        items: [
          // If using navbar as root, generate items from docs folder structure; otherwise use default sidebar
          ...(navbarAsRoot ? getDocsNavbarItems({baseDir: __dirname, useTranslations: hasTranslations}) : [
            {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              position: 'left',
              label: 'Docs',
            },
          ]),
          // Add language dropdown to the right of the navbar when translations exist
          ...(hasTranslations ? [{
            type: 'localeDropdown',
            position: 'right',
          }] : []),
          // External link to the right of the navbar
          ...(url ? [{
            href: url,
            label: brand,
            position: 'right',
          }] : []),
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} ${ brand }.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
    
  // Translation and internationalization settings (only when translations exist)
  ...(hasTranslations
    ? {
        i18n: {
          defaultLocale: translationsDefault,
          locales: translationFolderNames,
          localeConfigs: translationLocaleConfigs,
        },
      }
    : {}),
};

module.exports = config;
