module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};




// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       "react-native-reanimated/plugin",
//     ],
//   };
// };
//The Below is a perfect replacement for the above too i guess
// module.exports = {
//   presets: ["module:metro-react-native-babel-preset"],
//   plugins: [
//     "react-native-reanimated/plugin",
//   ],
// }