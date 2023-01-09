// Script for creating rss feeds

const fs = require('fs');
const i18n = require("../src/jsons/i18n.json");
const blogDirTree = require("../src/jsons/posts.json");

function processPost(section, post) {
  const
    metadata = require(`../${post.path}/index.json`),
    title = `${metadata.title} | ${i18n.mainTitle}` || i18n.mainTitle,
    link = `https://${i18n.domain}/blog/${section.name}/${post.name}`,
    content = fs.readFileSync(`./${post.path}/index.md`, 'utf8', (err) => console.error(err)),
    description = content.substr(0, 1000);
  return `
  <item>
    <title>${title}</title>
    <link>${link}</link>
    <guid>${link}</guid>
    <description>
      ${description}...
    </description>
  </item>
`
    // <pubDate>Wed, 27 Nov 2013 15:17:32 GMT (Note: The date must be in this format)</pubDate>

}

function processSection(section) {
  const
    metadata = require(`../${section.path}/index.json`),
    title = `${metadata.title} | ${i18n.mainTitle}` || i18n.mainTitle,
    link = `https://${i18n.domain}/blog/${section.name}`,
    description = metadata.description || i18n.fallbackDescription,
    imgUrl = `${link}/index.jpg`;
  let rssContent =`<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
<channel>
  <title>${title}</title>
  <link>${link}</link>
  <description>
    ${description}
  </description>
  <image>
    <title>${title}</title>
    <link>${link}</link>
    <url>${imgUrl}</url>
    <width>640</width>
    <heght>480</heght>
  </image>
  `;

  section.children.forEach(post => {
    if (!post?.children) { return };
    rssContent += processPost(section, post);
  });

  rssContent += `
</channel>
</rss>`;

  fs.writeFileSync(`${section.path}/feed.xml`, rssContent, (err) => console.error(err))

  console.log(`Wrote xml feed for ${section.name}`);
};

function processBlogFolder(treePath) {
  blogDirTree.children.forEach(section => {
    if (!section?.children) { return };
    processSection(section);
  });

  console.log(`Wrote xml feeds for all sections`);
};

processBlogFolder();
