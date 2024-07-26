const pluginWebc = require("@11ty/eleventy-plugin-webc");
const wikilinks = require('./wikilinks.js');

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? '/lvl-up/' : '/';

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc);
    eleventyConfig.setTemplateFormats("webc,html,md,njk");

    //for Obsidian wikilinks integration
    eleventyConfig.addPlugin(wikilinks);

    eleventyConfig.addGlobalData("permalink", () => {
        return (data) => `${baseUrl}${data.page.fileSlug}/index.html`;
    });
    
    eleventyConfig.addTransform("image-embeds", function(content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
            return content.replace(/!\[\[(.*?)\]\]/g, function(match, p1) {
                return `<img src="${baseUrl}images/${p1}" alt="${p1}">`;
            });}
            return content;
        });


    // Obsidian content folder setup
    eleventyConfig.ignores.add("**/.obsidian");
    eleventyConfig.addPassthroughCopy("lvlup/images");

    return {
        dir: {
            input: "lvlup",  // Replace with your actual vault folder name
            output: "_site",
            includes: "../_includes",  // Adjust if needed
        },
    // This tells Eleventy to copy these files as-is
    passthroughFileCopy: true
  };
};