// Script for creating posts tree

function main() {
  const dirTree = require("directory-tree");
  const fs = require('fs');

  const
    treePath = "./public/blog",
    filePath = "./src/jsons/posts.json";

  fs.writeFile(filePath, JSON.stringify(dirTree(treePath)), (err) => console.error(err))
  console.log(`Wrote file structure of ${treePath} to ${filePath}`)
}

main()
