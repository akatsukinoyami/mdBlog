// Script for creating posts tree

const dirTree = require("directory-tree");
const fs = require('fs');

function makeFilesTree({ treePath, filePath }) {
  fs.writeFile(filePath, JSON.stringify(dirTree(treePath)), (err) => console.error(err))
  console.log(`Wrote file structure of ${treePath} to ${filePath}`)
}

function main(){
  makeFilesTree({
    treePath: "./public/blog",
    filePath: "./src/jsons/posts.json"
  })
}

main()
