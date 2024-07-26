const pluginWebc = require("@11ty/eleventy-plugin-webc");
const wikilinks = require('./wikilinks.js');

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? '/' : '/';


module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);
  eleventyConfig.setTemplateFormats(["webc", "html", "md", "njk"]);

  // For Obsidian wikilinks integration
  eleventyConfig.addPlugin(wikilinks);

  eleventyConfig.addGlobalData("permalink", () => {
    return (data) => `${baseUrl}${data.page.fileSlug}/index.html`;
  });

  eleventyConfig.addTransform("image-embeds", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(/!\[\[(.*?)\]\]/g, function(match, p1) {
        return `<img src="${baseUrl}images/${p1}" alt="${p1}">`;
      });
    }
    return content;
  });

  // Ignore .obsidian folder
  eleventyConfig.ignores.add("**/.obsidian");

  // Pass through images
  eleventyConfig.addPassthroughCopy({"lvlup/images": "images"});

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
