// .eleventy.js
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const baseUrl = process.env.NODE_ENV === "production" ? "/lvl-up/" : "/";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc,{
    components: "_includes/webc/**/*.webc",
    		// Adds an Eleventy WebC transform to process all HTML output
		useTransform: false,

		// Additional global data used in the Eleventy WebC transform
		transformData: {},

		// Options passed to @11ty/eleventy-plugin-bundle
		bundlePluginOptions: {},
  });

  eleventyConfig.setTemplateFormats(["webc", "html", "md", "njk"]);

  // Global permalink data
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) => `${data.page.fileSlug}/index.html`;
  });

  eleventyConfig.addGlobalData("baseUrl", baseUrl);

  eleventyConfig.addPassthroughCopy("input/img");

  // Ensure no nested directories
  return {
    dir: {
      input: "input",
      output: "_site",
      includes: "../_includes",
    },
    passthroughFileCopy: true
  };
};
