module.exports = function disableInvalidProgressPlugin() {
  return {
    name: 'disable-invalid-progress-plugin',
    configureWebpack(config, _isServer, {currentBundler}) {
      if (currentBundler.name !== 'webpack' || !Array.isArray(config.plugins)) {
        return {};
      }

      const originalCount = config.plugins.length;
      config.plugins = config.plugins.filter((plugin) => {
        if (!plugin || typeof plugin !== 'object') {
          return true;
        }

        const pluginLike = /** @type {{[key: string]: unknown}} */ (plugin);
        const constructorName = plugin.constructor?.name || '';
        const hasWebpackBarShape =
          constructorName === 'WebpackBar' ||
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