# Welcome to the Phantom React Native SDK Demo App

This app demonstrates how to use the Phantom React Native SDK to create a wallet and sign transactions.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app iOS or Android

   ```bash
    npm run start:ios
   ```

   ```bash
    npm run start:android
   ```

These commands will build a custom expo development client for iOS and Android.
Due to native dependencies and the use of Deep Linking in the SDK, you cannot use the SDK with Expo Go.

# Polyfills

This project uses the polyfills for the following modules:

- `buffer`
- `crypto`
- `stream`

Check out the following files to see how the polyfills are configured:

- `metro.config.js`
- `babel.config.js`
- `src/setupPolyfill.ts`
