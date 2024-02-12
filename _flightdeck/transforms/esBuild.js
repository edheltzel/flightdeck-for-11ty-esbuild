/**
 * Exports a function that runs BEFORE eleventy
 * @param {Object} config - eleventy config object
 * @summary This executes the esbuild tool on the output before build.
 * @link https://esbuild.github.io/api/#build-api
 * @link https://github.com/glromeo/esbuild-sass-plugin
 * cSpell: disable
 */
const isProd = process.env.ENV === "production";
const esbuild = require("esbuild");
const path = require("node:path");

module.exports = (config) => {
  config.addTemplateFormats("js");
  config.addExtension("js", {
		outputFileExtension: "js",
		async compile(inputContent, inputPath) {
			const baseDir = path.basename(path.dirname(inputPath));
			if (baseDir.startsWith("_")) {
				return undefined;
			}
			const result = await esbuild.build({
				entryPoints: [inputPath],
				bundle: true,
        minify: isProd,
        sourcemap: !isProd,
				splitting: true,
				format: "esm",
				logLevel: "warning",
				outdir: "dist/assets/js",
				outbase: "src/assets/js",
				metafile: true,
			});

			const files = [];
			const inputs = Object.values(result.metafile.inputs);
			for (const input of inputs) {
				const { imports } = input;
				if (imports.length) {
					for (const file of imports) {
						files.push(file.path);
					}
				}
			}
			this.addDependencies(inputPath, files);
			return () => result.js;
		},
	});
};
