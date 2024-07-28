// .eleventy.js
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc,{
    components: "_includes/webc/*.webc"
  });

  eleventyConfig.setTemplateFormats(["webc", "html", "md", "njk"]);

  // Global permalink data
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) => `${data.page.fileSlug}/index.html`;
  });

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
