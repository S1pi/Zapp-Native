// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Expo‑oletus
      ['babel-preset-expo', {jsxImportSource: 'nativewind'}],
      // 👉  NativeWind v4 ‑preset **presets‑taulukkoon**
      'nativewind/babel',
    ],
    plugins: [
      // (lisää nämä vain jos oikeasti tarvitset)
      // "expo-router/babel",
      'react-native-reanimated/plugin',
    ],
  };
};
