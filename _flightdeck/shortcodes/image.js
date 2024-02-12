/**
 * Generates an HTML picture tag with responsive attributes using the @11ty/eleventy-img library.
 * @param {string} src - The path to the image file.
 * @param {string} alt - The alternative text for the image.
 * @param {string} sizes - The responsive sizes attribute for the image.
 * @returns {Promise<string>} - The generated HTML for the image element.
 * @usage {% Image "image path", "atl-text" %}
 * @example {% Image "/assets/images/moon.jpg", "A picture of the moon" %}
 * @field rootPath - is set to keep the path to the image file relative to the src directory.
 * this keeps the path consistent between markdown image tags and the Image shortcode.
 */

// Import Image library
const Image = require("@11ty/eleventy-img");

// Shortcode function
module.exports = async (src, alt, className = null, sizes = '100vw', loadAttr = 'lazy') => {
  const rootPath = `./src${src}`;
  const outputDir = "./dist/assets/images/";
  const urlPath = "/assets/images/";
  const metadata = await Image(rootPath, {
    widths: [400, 800, 1600],
    formats: ["webp"],
    outputDir: outputDir,
    urlPath: urlPath,
    svgShortCircuit: "size",
    sharpWebpOptions: {
      quality: 50,
    },
  });
  const format = metadata[Object.keys(metadata)[0]];
  const data = format[format.length - 1];

  // Generate HTML
  return Image.generateHTML(metadata, {
    alt,
    sizes: sizes || "100vw",
    className: className != null ? className : null,
    loading: loadAttr || "lazy",
    decoding: "async",
  });
}
