// One time script for converting WP HTML to MD files

const fs = require('fs');
const dirTree = require("directory-tree");
const TurndownService = require('turndown');
const turndownService = new TurndownService()


function main(){
  const tree = dirTree("./public/posts");
  handleFile(tree.children)
}

function handleFile(children){
  children.forEach(child => {
    if (child.name.includes('.md')) convertHTMLtoMD(child.path);
    if (child.children) handleFile(child.children);
  });
}

function convertHTMLtoMD(path){
  fs.readFile(path, 'utf8', function (err,data) {
    if (err) return console.log(err)

    const markdown = turndownService.turndown(data)

    fs.writeFile(path, markdown, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
}

main()
