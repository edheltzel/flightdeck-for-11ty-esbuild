/**
 * Eleventy plugins that modify content
 * @summary This adds eleventy plugins to the build process.
 * @link https://www.11ty.dev/docs/plugins/
 *
 * @file
 * This module exports a function that adds several plugins to the Eleventy.
 *
 * @module plugins
 *
 * @param {Object} config - The Eleventy config object to which the plugins will be added.
 */

const embedEverything = require("eleventy-plugin-embed-everything");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const navigation = require("@11ty/eleventy-navigation");

module.exports = (config) => {
  config.addPlugin(embedEverything);
  config.addPlugin(syntaxHighlight);
  config.addPlugin(navigation);
};
