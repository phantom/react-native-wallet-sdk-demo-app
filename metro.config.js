const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Ensure Buffer is available globally
global.Buffer = require("buffer").Buffer;

// Add entry point configuration
config.resolver = {
  ...config.resolver,
  // sourceExts: [...config.resolver.sourceExts, 'cjs'],
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    "@noble/ed25519": require.resolve("@noble/ed25519"),
    "@noble/secp256k1": require.resolve("@noble/secp256k1"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("web-streams-polyfill"),
    buffer: require.resolve("buffer"),
  },
};

module.exports = config;
