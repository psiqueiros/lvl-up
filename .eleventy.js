// .eleventy.js
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const obsidianstuff = require('./obsidianstuff');
const { baseUrl } = require('./config');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);
  eleventyConfig.setTemplateFormats(["webc", "html", "md", "njk"]);

  // Custom filter to transform filenames
  eleventyConfig.addFilter("transformFilename", function(filename) {
    return filename.trim().toLowerCase().replace(/\s+/g, "-");
  });

  // Custom collection to apply the filter to filenames
  eleventyConfig.addCollection("filteredPages", function(collectionApi) {
    return collectionApi.getAll().map(item => {
      item.fileSlug = eleventyConfig.getFilter("transformFilename")(item.fileSlug);
      return item;
    });
  });

  // Obsidian syntax handling
  eleventyConfig.addPlugin(obsidianstuff);

  // Global permalink data
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) => `${data.page.fileSlug}/index.html`;
  });

  // Ensure no nested directories
  return {
    dir: {
      input: "lvlup",
      output: "_site",
      includes: "../_includes",
    },
    passthroughFileCopy: true
  };
};
