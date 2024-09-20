module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@images': './src/assets/images',
          '@components': './src/components',
          '@config': './src/config',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@network': './src/network',
          '@store': './src/store',
          '@appconstants': './src/constants',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
