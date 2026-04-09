module.exports = function disableInvalidProgressPlugin() {
  return {
    name: 'disable-invalid-progress-plugin',
    configureWebpack(config, _isServer, {currentBundler}) {
      if (currentBundler.name !== 'webpack' || !Array.isArray(config.plugins)) {
        return {};
      }

      const originalCount = config.plugins.length;
      const pluginNames = config.plugins.map((plugin) => plugin?.constructor?.name || typeof plugin);
      console.log(`Webpack plugins before filtering: ${pluginNames.join(', ')}`);

      config.plugins = config.plugins.filter((plugin) => {
        if (!plugin || typeof plugin !== 'object') {
          return true;
        }

        const pluginLike = /** @type {{[key: string]: unknown}} */ (plugin);
        const constructorName = plugin.constructor?.name || '';
        const optionsLike =
          (pluginLike.options && typeof pluginLike.options === 'object' ? /** @type {{[key: string]: unknown}} */ (pluginLike.options) : null) ||
          (pluginLike._options && typeof pluginLike._options === 'object' ? /** @type {{[key: string]: unknown}} */ (pluginLike._options) : null);

        const hasInvalidProgressFields =
          ('reporter' in pluginLike ||
            'reporters' in pluginLike ||
            'name' in pluginLike ||
            'color' in pluginLike ||
            (optionsLike !== null &&
              ('reporter' in optionsLike || 'reporters' in optionsLike || 'name' in optionsLike || 'color' in optionsLike)));

        const hasWebpackBarShape =
          constructorName === 'WebpackBar' ||
          (constructorName === 'ProgressPlugin' && hasInvalidProgressFields) ||
          (('reporter' in pluginLike || 'reporters' in pluginLike) &&
            ('name' in pluginLike || 'color' in pluginLike));

        if (hasWebpackBarShape) {
          const pluginName = constructorName || 'unknown-plugin';
          console.warn(`Removing incompatible webpack progress plugin: ${pluginName}`);
          return false;
        }

        return true;
      });

      if (config.plugins.length !== originalCount) {
        console.log(`Filtered webpack plugins: ${originalCount} -> ${config.plugins.length}`);
      }

      return {};
    },
  };
};