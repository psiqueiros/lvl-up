const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc);
    eleventyConfig.setTemplateFormats("webc,html,md,njk");
};