const fs = require('fs');
const path = require('path');

/**
 * @param {{baseDir: string, translationsPath?: string}} params
 */
function getTranslationsConfig({baseDir, translationsPath = 'i18n'}) {
  const fullTranslationsPath = path.join(baseDir, translationsPath);
  let translationFolderNames = [];

  try {
    if (fs.existsSync(fullTranslationsPath)) {
      const entries = fs.readdirSync(fullTranslationsPath, {withFileTypes: true});
      translationFolderNames = entries
        .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
        .map(entry => entry.name);
    }
  } catch {
    translationFolderNames = [];
  }

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

  return {
    translationFolderNames,
    translationLocaleConfigs,
    hasTranslations,
  };
}

module.exports = {
  getTranslationsConfig,
};
