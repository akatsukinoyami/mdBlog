// Script for creating posts tree

const deletableFiles = [".DS_Store", "images", "index.jpg", "index.json", "index.md"];

function deleteDS(children) {
  return children
    .filter(child => !deletableFiles.includes(child.name))
    .map(child => {
      if (child.children) child.children = deleteDS(child.children);
      if (child.children.length === 0) {
        delete child.children;
      }
      return child;
    })
    .filter(child => child !== undefined)
}


function main() {
  const dirTree = require("directory-tree");
  const fs = require('fs');

  const
    treePath = "./public/blog",
    tree = dirTree(treePath),
    sections = deleteDS(tree.children)
    filePath = "./src/jsons/sections.json";

  fs.writeFile(filePath, JSON.stringify(sections), (err) => console.error(err))
  console.log(`Wrote file structure of ${treePath} to ${filePath}`)
}

main()
