const fs = require('fs');
const path = require('path');

/**
 * @param {string} value
 * @returns {string}
 */
function stripNumericPrefix(value) {
  return value.replace(/^\d+_/, '');
}

/**
 * @param {string} value
 * @returns {string}
 */
function humanize(value) {
  return value
    .replace(/^\d+_/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * @param {string} fileName
 * @returns {boolean}
 */
function isMarkdownFile(fileName) {
  return fileName.endsWith('.md') || fileName.endsWith('.mdx');
}

/**
 * @param {string} dirPath
 */
function getDirectoryDocStats(dirPath) {
  const entries = fs.readdirSync(dirPath, {withFileTypes: true});
  const directMdFiles = entries.filter(entry => entry.isFile() && isMarkdownFile(entry.name));

  let totalMdFiles = directMdFiles.length;
  let hasSubdirectories = false;

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      hasSubdirectories = true;
      const nested = getDirectoryDocStats(path.join(dirPath, entry.name));
      totalMdFiles += nested.totalMdFiles;
    }
  }

  return {directMdFiles, totalMdFiles, hasSubdirectories};
}

/**
 * @param {string} dirPath
 * @returns {number}
 */
function countMarkdownFilesRecursive(dirPath) {
  const entries = fs.readdirSync(dirPath, {withFileTypes: true});
  let count = 0;

  for (const entry of entries) {
    if (entry.isFile() && isMarkdownFile(entry.name)) {
      count += 1;
    } else if (entry.isDirectory() && !entry.name.startsWith('.')) {
      count += countMarkdownFilesRecursive(path.join(dirPath, entry.name));
    }
  }

  return count;
}

/**
 * @param {string} dirPath
 * @returns {number | null}
 */
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

/**
 * @param {{baseDir: string, useTranslations?: boolean}} params
 */
function getDocsNavbarItems({baseDir, useTranslations = false}) {
  const docsPath = path.join(baseDir, 'docs');
  const items = [];

  try {
    const entries = fs.readdirSync(docsPath, {withFileTypes: true});

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) {
        continue;
      }

      const match = entry.name.match(/^(\d+)_(.+)$/);
      const sidebarId = stripNumericPrefix(entry.name);
      const label = humanize(match ? match[2] : entry.name);
      const defaultSortOrder = match ? parseInt(match[1], 10) : 999;

      const dirPath = path.join(docsPath, entry.name);
      const {directMdFiles, totalMdFiles, hasSubdirectories} = getDirectoryDocStats(dirPath);
      const categoryPosition = getCategoryPosition(dirPath);
      const sortOrder = categoryPosition ?? defaultSortOrder;

      if (totalMdFiles === 0) {
        console.log(`Skipping navbar item: ${entry.name} (no docs found)`);
        continue;
      }

      const hasIndexFile = directMdFiles.some(file => {
        const lower = file.name.toLowerCase();
        return lower === 'index.md' || lower === 'index.mdx';
      });
      const otherMdFiles = directMdFiles.filter(file => {
        const lower = file.name.toLowerCase();
        return lower !== 'index.md' && lower !== 'index.mdx';
      });

      if (hasIndexFile && otherMdFiles.length === 0) {
        const folderName = stripNumericPrefix(entry.name);
        const docId = `${folderName}/index`;
        console.log(`Navbar item: ${entry.name} -> doc: ${docId}, label: ${label} (index.md)`);
        items.push({
          type: 'doc',
          docId,
          position: 'left',
          label: useTranslations ? sidebarId : label,
          sortOrder,
        });
      } else if (hasSubdirectories || otherMdFiles.length > 0 || (hasIndexFile && otherMdFiles.length > 0)) {
        console.log(`Navbar item: ${entry.name} -> docSidebar: ${sidebarId}, label: ${label}`);
        items.push({
          type: 'docSidebar',
          sidebarId,
          position: 'left',
          label: useTranslations ? sidebarId : label,
          sortOrder,
        });
      } else if (directMdFiles.length === 1) {
        const folderName = stripNumericPrefix(entry.name);
        const fileName = stripNumericPrefix(directMdFiles[0].name.replace(/\.mdx?$/, ''));
        const docId = `${folderName}/${fileName}`;
        console.log(`Navbar item: ${entry.name} -> doc: ${docId}, label: ${label}`);
        items.push({
          type: 'doc',
          docId,
          position: 'left',
          label: useTranslations ? sidebarId : label,
          sortOrder,
        });
      }
    }

    items.sort((a, b) => a.sortOrder - b.sortOrder);
    items.forEach(item => delete item.sortOrder);
    console.log('Navbar items generated:', items.map(i => i.sidebarId || i.docId));
  } catch (error) {
    console.warn('Could not read docs directory:', error);
  }

  return items;
}

module.exports = {
  countMarkdownFilesRecursive,
  getDocsNavbarItems,
  stripNumericPrefix,
};
