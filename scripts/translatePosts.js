const fs = require('fs');
const dirTree = require("directory-tree");
const { translate } =  require('@vitalets/google-translate-api');

function translation(text, to, path){
  translate(text, { to })
  .then(({ text }) => (
    fs.writeFile(path, text, (err) => console.error(err))
  ))
}
function handlePosts(children) {
  children
    .filter(child => child.children)
    .forEach(child => {
      const text = fs.readFileSync(`${child.path}/index_ru.md`, "utf-8", (err) => console.log(err));
      //translation(text, 'en', `${child.path}/index.md`)
      translation(text, 'uk', `${child.path}/index_ua.md`)
  })
}

function main() {
  const tree = dirTree("./public/blog/anime");
  handlePosts(tree.children);
}

main()
