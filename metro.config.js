const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const path = require('path');

const config = {
    resolver: {
        alias: {
          '@src': path.resolve(__dirname, 'src'),
          '@helpers': path.resolve(__dirname, 'src/helpers'),
          '@redux': path.resolve(__dirname, 'src/redux'),
          '@components': path.resolve(__dirname, 'src/view/components'),
          '@navigation': path.resolve(__dirname, 'src/view/navigation'),
          '@screens': path.resolve(__dirname, 'src/view/screens'),
          '@themes': path.resolve(__dirname, 'src/view/themes'),
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
