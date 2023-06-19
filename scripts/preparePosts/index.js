// Script for creating posts tree

const fs = require('fs');
const dirTree = require("directory-tree");
const handlePosts = require('./handlePosts.js');

const treePath = "./public/blog";
const filePath = "./src/jsons/sections.json";

fs.rmSync(treePath, {recursive: true})
fs.cpSync("../blog", treePath, {recursive: true});

const tree = dirTree(treePath);
const sections = handlePosts(tree.children);

fs.writeFile(
  filePath, 
  JSON.stringify(sections), 
  (err) => console.error(err),
)
console.log(`Wrote file structure of ${treePath} to ${filePath}`)
