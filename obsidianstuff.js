// obsidianstuff.js
const { baseUrl } = require('./config');

module.exports = function(eleventyConfig) {
  // Image embeds transform
  eleventyConfig.addTransform("image-embeds", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(/!\[\[(.*?)\]\]/g, function(match, p1) {
        return `<img src="${baseUrl}images/${p1}" alt="${p1}">`;
      });
    }
    return content;
  });

  // Wikilinks transform
  eleventyConfig.addTransform("wikilinks", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(/\[\[(.*?)\]\]/g, function(match, p1) {
        const parts = p1.split("|");
        const pageName = parts[0].trim().toLowerCase().replace(/\s+/g, "-");
        const displayText = parts[1] || parts[0];
        return `<a href="${baseUrl}${pageName}">${displayText}</a>`;
      });
    }
    return content;
  });

  // Ignore .obsidian folder
  eleventyConfig.ignores.add("**/.obsidian");

  // Pass through images
  eleventyConfig.addPassthroughCopy({"lvlup/images": "images"});
};
