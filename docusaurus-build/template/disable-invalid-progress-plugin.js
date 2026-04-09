module.exports = function disableInvalidProgressPlugin() {
  return {
    name: 'disable-invalid-progress-plugin',
    configureWebpack(config, _isServer, {currentBundler}) {
      if (currentBundler.name !== 'webpack' || !Array.isArray(config.plugins)) {
        return {};
      }

      config.plugins = config.plugins.filter((plugin) => {
        if (!plugin || typeof plugin !== 'object') {
          return true;
        }

        const pluginLike = /** @type {{[key: string]: unknown}} */ (plugin);
        const hasWebpackBarShape =
          ('reporter' in pluginLike || 'reporters' in pluginLike) &&
          ('name' in pluginLike || 'color' in pluginLike);

        if (hasWebpackBarShape) {
          const pluginName = plugin.constructor?.name || 'unknown-plugin';
          console.warn(`Removing incompatible webpack progress plugin: ${pluginName}`);
          return false;
        }

        return true;
      });

      return {};
    },
  };
};