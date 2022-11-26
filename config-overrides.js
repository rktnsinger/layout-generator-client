/* eslint-disable no-param-reassign */
module.exports = function override(config) {
  config.resolve.fallback = {
    fs: false,
    path: false,
    crypto: false,
  };

  return config;
};
