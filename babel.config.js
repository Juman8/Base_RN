module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          '@screens': './src/screens',
          '@redux': './src/redux',
          '@components': './src/components',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@services': './src/services',
          '@navigation': './src/navigation',
          '@types': './src/types',
          '@theme': './src/theme',
          '@translations': './src/translations',
          '@constants': './src/constants',
          '@instances': './src/instances',
          '@api': './src/api',
          '@interfaces': './src/interfaces',
          '@models': './src/models',
          '@lib': './lib',
          '@schema': './src/schema',
          '@examples': './src/screens/examples',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
