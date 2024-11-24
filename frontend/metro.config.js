// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add '.glb' to the list of asset extensions Metro recognizes
config.resolver.assetExts.push('glb');

module.exports = config;
