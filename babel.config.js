module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      ["@babel/plugin-syntax-dynamic-import"],
      ["@babel/plugin-proposal-export-namespace-from"],
      ["@babel/plugin-proposal-export-default-from"],
    ],
  };
};
