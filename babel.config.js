module.exports = function (api)
{
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'react-native-reanimated/plugin', {
          relativeSourceLocation: true,
        },
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
  };
};


// module.exports = function (api)
// {
//   api.cache(true);
//   return {
//     env: {
//       production: {
//         plugins: ['react-native-paper/babel'],
//       },
//     },
//     presets: ['babel-preset-expo'],
//     plugins: [
//       'react-native-reanimated/plugin',
//       ['expo-image-picker', {
//         photosPermission: 'The app accesses your photos to let you share them with your friends.',
//       }],
//     ],
//   };
// };
