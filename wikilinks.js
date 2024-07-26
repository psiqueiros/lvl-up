module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform("wikilinks", function(content, outputPath) {
    if(outputPath && outputPath.endsWith(".html")) {
      return content.replace(/\[\[(.*?)\]\]/g, function(match, p1) {
        const parts = p1.split("|");
        const pageName = parts[0].trim().replace(/\s+/g, "-").toLowerCase();
        const displayText = parts[1] || parts[0];
        return `<a href="/${pageName}">${displayText}</a>`;
      });
    }
    return content;
  });
};
