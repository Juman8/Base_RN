module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./src/assets/fonts/'], // stays the same
  dependencies: {
    'react-native-bootsplash': {
      platforms: {
        android: null,
      },
    },
  },
};
