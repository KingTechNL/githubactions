// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const {themes: prismThemes} = require('prism-react-renderer');
const fs = require('fs');
const path = require('path');

// Convert folder names to human-readable labels
function humanize(str) {
  return str
    // Remove numeric prefixes
    .replace(/^\d+_/, '')
    // Split on capital letters, underscores, and hyphens
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    // Capitalize first letter of each word
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Inspect folder content recursively so nested docs are counted
function getDirectoryDocStats(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const directMdFiles = entries.filter(entry =>
    entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))
  );

  let totalMdFiles = directMdFiles.length;
  let hasSubdirectories = false;

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      hasSubdirectories = true;
      const nested = getDirectoryDocStats(path.join(dirPath, entry.name));
      totalMdFiles += nested.totalMdFiles;
    }
  }

  return { directMdFiles, totalMdFiles, hasSubdirectories };
}

// Read a category position from Docusaurus category metadata files
function getCategoryPosition(dirPath) {
  const jsonPath = path.join(dirPath, '_category_.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      if (typeof parsed.position === 'number' && Number.isFinite(parsed.position)) {
        return parsed.position;
      }
    } catch (error) {
      console.warn(`Could not parse ${jsonPath}:`, error);
    }
  }

  const yamlFiles = ['_category_.yml', '_category_.yaml'];
  for (const fileName of yamlFiles) {
    const yamlPath = path.join(dirPath, fileName);
    if (!fs.existsSync(yamlPath)) {
      continue;
    }

    try {
      const yamlText = fs.readFileSync(yamlPath, 'utf8');
      const match = yamlText.match(/^\s*position\s*:\s*(["']?)(-?\d+(?:\.\d+)?)\1\s*(?:#.*)?$/m);
      if (match) {
        const value = Number(match[2]);
        if (Number.isFinite(value)) {
          return value;
        }
      }
    } catch (error) {
      console.warn(`Could not read ${yamlPath}:`, error);
    }
  }

  return null;
}

// Dynamically generate navbar items from docs folder structure
function getDocsNavbarItems(useTranslations = false) {
  const docsPath = path.join(__dirname, 'docs');
  const items = [];
  
  try {
    const entries = fs.readdirSync(docsPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        // Extract number prefix and name (prefix is optional)
        const match = entry.name.match(/^(\d+)_(.+)$/);
        const sidebarId = entry.name.replace(/^\d+_/, '');
        const label = humanize(match ? match[2] : entry.name);
        const defaultSortOrder = match ? parseInt(match[1], 10) : 999; // No prefix = sort last
        
        // Count markdown files recursively so nested sections are included
        const dirPath = path.join(docsPath, entry.name);
        const { directMdFiles, totalMdFiles, hasSubdirectories } = getDirectoryDocStats(dirPath);
        const categoryPosition = getCategoryPosition(dirPath);
        const sortOrder = categoryPosition ?? defaultSortOrder;

        if (totalMdFiles === 0) {
          console.log(`Skipping navbar item: ${entry.name} (no docs found)`);
          continue;
        }
        
        // Check if there's an index.md file
        const hasIndexFile = directMdFiles.some(f => f.name.toLowerCase() === 'index.md' || f.name.toLowerCase() === 'index.mdx');
        const otherMdFiles = directMdFiles.filter(f => f.name.toLowerCase() !== 'index.md' && f.name.toLowerCase() !== 'index.mdx');
        
        // If there's an index.md and either no other files or only nested folders, link directly to index
        if (hasIndexFile && (otherMdFiles.length === 0 || (otherMdFiles.length === 0 && hasSubdirectories))) {
          const folderName = entry.name.replace(/^\d+_/, '');
          const docId = `${folderName}/index`;
          console.log(`Navbar item: ${entry.name} -> doc: ${docId}, label: ${label} (index.md)`);
          items.push({
            type: 'doc',
            docId: docId,
            position: 'left',
            label: useTranslations ? sidebarId : label,
            sortOrder: sortOrder,
          });
        }
        // Use docSidebar when folder has nested folders or multiple docs (excluding index.md)
        else if (hasSubdirectories || otherMdFiles.length > 0 || (hasIndexFile && otherMdFiles.length > 0)) {
          console.log(`Navbar item: ${entry.name} -> docSidebar: ${sidebarId}, label: ${label}`);
          items.push({
            type: 'docSidebar',
            sidebarId: sidebarId,
            position: 'left',
            label: useTranslations ? sidebarId : label,
            sortOrder: sortOrder,
          });
        } else if (directMdFiles.length === 1) {
          // Link directly when there is a single top-level doc and no nested folders
          const folderName = entry.name.replace(/^\d+_/, '');
          const fileName = directMdFiles[0].name.replace(/\.mdx?$/, '').replace(/^\d+_/, '');
          const docId = `${folderName}/${fileName}`;
          console.log(`Navbar item: ${entry.name} -> doc: ${docId}, label: ${label}`);
          items.push({
            type: 'doc',
            docId: docId,
            position: 'left',
            label: useTranslations ? sidebarId : label,
            sortOrder: sortOrder,
          });
        }
      }
    }
    
    // Sort by category metadata position first, then fallback order
    items.sort((a, b) => a.sortOrder - b.sortOrder);
    
    // Remove sortOrder property before returning (not needed in final config)
    items.forEach(item => delete item.sortOrder);
    
    console.log('Navbar items generated:', items.map(i => i.sidebarId || i.docId));
  } catch (error) {
    console.warn('Could not read docs directory:', error);
  }
  
  return items;
}

// Read translation folder names from the specified path
function getTranslationFolderNames(translationsPath) {
  try {
    const fullTranslationsPath = path.join(__dirname, translationsPath);
    if (!fs.existsSync(fullTranslationsPath)) return [];

    const entries = fs.readdirSync(fullTranslationsPath, {withFileTypes: true});
    return entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => entry.name);
  } catch {
    return [];
  }
}

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
const translationFolderNames = getTranslationFolderNames(translationsPath);
const translationLocaleConfigs = Object.fromEntries(
  translationFolderNames.map(locale => [
    locale,
    {label: locale.length === 2 ? locale.toUpperCase() : locale},
  ])
);
const hasTranslations = translationFolderNames.length > 0;
if (hasTranslations) {
  console.log(`Translations folders found in ${translationsPath}: ${translationFolderNames.join(', ')}. i18n enabled.`);
} else {
  console.warn(`No translation folders found in ${translationsPath}. i18n disabled.`);
}

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
          ...(navbarAsRoot ? getDocsNavbarItems(hasTranslations) : [
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
