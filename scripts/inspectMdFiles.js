// Script for creating posts tree

const dirTree = require("directory-tree");
const fs = require('fs');

const deletableFiles = /(\.DS_Store)|(images)|(index(_\w{2})?\.(jpe?g|png|webp|json|md))/mi;

function sortByDate(a, b) {
  if (!a.date || !b.date) return 0;

  a = new Date(a.date);
  b = new Date(b.date);

  if (a > b)   return 1
  if (a < b)   return -1
  return 0
}

function writeMetadataToJson(child) {
  return { ...child,  ...require(`../${child.path}/index.json`) };
}

function fetchTranslationContentExistency(child) {   
  exists = (version) => fs.existsSync(`./${child.path}/index${version}.md`)
  
  child.version = { en: exists(""), ru: exists("_ru"), ua: exists("_ua") } 
  return child; 
}

function handlePosts(children) {
  return children
    .filter(child => !deletableFiles.test((child.name)))
    .map(child => {
      if (child.children) child.children = handlePosts(child.children);
      if (child.children?.length === 0) delete child.children;
      
      child = writeMetadataToJson(child);
      child = fetchTranslationContentExistency(child);
      
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
