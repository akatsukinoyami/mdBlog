// Script for creating posts tree

const dirTree = require("directory-tree");
const fs = require('fs');

const deletableFiles = /(\.DS_Store)|(images)|(index(_\w{2})?\.(jpe?g|png|webp|json|md))/mi;
const langs = ["", "_en", "_ru", "_ua"];

function sortByDate(a, b) {
  if (!a.date || !b.date) return 0;

  a = new Date(a.date);
  b = new Date(b.date);

  if (a > b)   return 1
  if (a < b)   return -1
  return 0
}

function fetchContent(path, lang) {
  try {
    return fs.readFileSync(`./${path}/index${lang}.md`, "utf-8", (err) => { console.log(err) });
  } catch {
  }
}

function writeMetadataToJson(child) {
  return { ...child,  ...require(`../${child.path}/index.json`) };
}

function writeContentToJson(child) {      
  langs.forEach(lang => (
    child[`content${lang}`] = fetchContent(child.path, lang)
  ))
  return child; 
}

function handlePosts(children) {
  return children
    .filter(child => !deletableFiles.test((child.name)))
    .map(child => {
      if (child.children) child.children = handlePosts(child.children);
      if (child.children?.length === 0) delete child.children;
      
      child = writeMetadataToJson(child);
      child = writeContentToJson(child);
      
      return child;
    })
    .filter(child => child !== undefined)
    .sort(sortByDate)
    .reverse()
}


function main() {
  const
    treePath = "./public/blog",
    tree = dirTree(treePath),
    sections = handlePosts(tree.children)
    filePath = "./src/jsons/sections.json";

  fs.writeFile(filePath, JSON.stringify(sections), (err) => console.error(err))
  console.log(`Wrote file structure of ${treePath} to ${filePath}`)
}

main()
