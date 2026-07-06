const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Passthrough copies
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy({ "public/manifest.json": "/manifest.json" });
  eleventyConfig.addPassthroughCopy({ "public/_headers": "/_headers" });
  eleventyConfig.addPassthroughCopy({ "public/_redirects": "/_redirects" });
  eleventyConfig.addPassthroughCopy({ "public/images": "/images" });
  eleventyConfig.addPassthroughCopy("src/styles");

  // Watch targets for dev server
  eleventyConfig.addWatchTarget("src/styles/");

  // Collections
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/articles/*.md")
      .filter(item => item.data.published !== false)
      .sort((a, b) => b.date - a.date);
  });

  // RSS feed collection
  eleventyConfig.addCollection("feed", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/articles/*.md")
      .filter(item => item.data.published !== false)
      .sort((a, b) => b.date - a.date);
  });

  // Filters
  eleventyConfig.addFilter("toPersianNum", function(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, d => persianDigits[d]);
  });

  eleventyConfig.addFilter("dateFormat", function(date) {
    const d = new Date(date);
    return d.toLocaleDateString('fa-IR');
  });

  eleventyConfig.addFilter("dateISO", function(date) {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("json", function(obj) {
    return JSON.stringify(obj, null, 2);
  });

  eleventyConfig.addFilter("slugify", function(str) {
    return str.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  });

  // Shortcodes
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

  // Image shortcode for responsive images
  async function imageShortcode(src, alt, sizes) {
    sizes = sizes || "(max-width: 768px) 100vw, 50vw";
    if (!src) return "";
    try {
      const metadata = await Image(src, {
        widths: [400, 800, 1200],
        formats: ["webp", "jpeg"],
        urlPath: "/images/",
        outputDir: "_site/images/",
      });

      const imageAttributes = {
        alt: alt || "",
        sizes: sizes,
        loading: "lazy",
        decoding: "async",
      };

      return Image.generateHTML(metadata, imageAttributes);
    } catch (e) {
      console.error("Image shortcode error:", e);
      return `<img src="${src}" alt="${alt || ""}" loading="lazy">`;
    }
  }

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // Global data
  eleventyConfig.addGlobalData("siteUrl", "https://kamaan.pages.dev");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};