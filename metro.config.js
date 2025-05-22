const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

// Get paths to our mock files
const wsMockPath = path.join(__dirname, 'src', 'utils', 'ws-mock.js');
const tlsMockPath = path.join(__dirname, 'src', 'utils', 'tls-mock.js');
const httpMockPath = path.join(__dirname, 'src', 'utils', 'http-mock.js');
const netMockPath = path.join(__dirname, 'src', 'utils', 'net-mock.js');
const utilMockPath = path.join(__dirname, 'src', 'utils', 'util-mock.js');
const assertMockPath = path.join(__dirname, 'src', 'utils', 'assert-mock.js');

const config = getDefaultConfig(__dirname);

// Provide browser-compatible versions for Node.js modules
config.resolver.extraNodeModules = {
  // Core Node.js modules
  events: require.resolve('events'),
  // Use our own custom mocks instead of browserify versions where needed
  http: httpMockPath,
  https: require.resolve('https-browserify'),
  net: netMockPath,
  stream: require.resolve('readable-stream'),
  zlib: require.resolve('browserify-zlib'),
  path: require.resolve('path-browserify'),
  crypto: require.resolve('crypto-browserify'),
  url: require.resolve('url'),
  util: utilMockPath,
  assert: assertMockPath,
  
  // Mock implementations
  fs: false,
  tls: tlsMockPath, // Use our custom tls mock
  ws: wsMockPath,   // Use our WebSocket mock
};

module.exports = config; 