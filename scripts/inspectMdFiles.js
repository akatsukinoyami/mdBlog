// Script for creating posts tree

const dirTree = require("directory-tree");
const fs = require('fs');

const deletableFiles = [".DS_Store", "images", "index.jpg", "index.json", "index.md"];

function sortByDate(a, b) {
  if (!a.date || !b.date) return 0;

  a = new Date(a.date);
  b = new Date(b.date);

  if (a > b)   return 1
  if (a < b)   return -1
  return 0
}

function deleteDS(children) {
  return children
    .filter(child => !deletableFiles.includes(child.name))
    .map(child => {
      if (child.children) child.children = deleteDS(child.children);
      if (child.children.length === 0) {
        delete child.children;
      }
      child = {
        ...child, 
        ...require(`../${child.path}/index.json`)
      };
      
      try {
        child.content = fs.readFileSync(`./${child.path}/index.md`, "utf-8", (err) => { console.log(err) });
      } catch {}
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
    sections = deleteDS(tree.children)
    filePath = "./src/jsons/sections.json";

  fs.writeFile(filePath, JSON.stringify(sections), (err) => console.error(err))
  console.log(`Wrote file structure of ${treePath} to ${filePath}`)
}

main()
