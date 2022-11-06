// One time script for downloading images from WP

const fs = require('fs');
const https = require('node:https');
const dirTree = require("directory-tree");
const TurndownService = require('turndown');
const turndownService = new TurndownService()


function main(){
  const tree = dirTree("./public/posts");
  handleRecord(tree.children)
}

function handleRecord(children){
  children.forEach(child => {
    if (child.name.includes('.md')){
      // fs.mkdir(child.path.replace('posts', 'images').replace('.md', ''), err => console.error(err));
      handleFile(child.path);
    }
    if (child.children) {
      // fs.mkdir(child.path.replace('posts', 'images'), err => console.error(err));
      handleRecord(child.children);
    }
  });
}

function handleFile(path){
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) return console.log(err)
    path = path.replace('posts', 'images').replace('.md', '')

    let urls = data.match(/!\[\]\((.+?)\)/g)
    if (urls !== null) {
      urls.forEach(url =>  setTimeout(() => { download(url, path, console.error) }, 300));
    };
  });
}

function download(url, dest, cb){
  const urlChanged = url.replace(/!\[\]\((.+?)\)/g, '$1')
  const urlSplitted = urlChanged.split('/')
  const fileName = urlSplitted[urlSplitted.length-1]
  dest = `${dest}/${fileName}`
  console.warn({urlChanged, urlSplitted, fileName, dest})
  const file = fs.createWriteStream(dest);

  const request = https.get(urlChanged, (response) => {
      // check if response is success
      if (response.statusCode !== 200) return cb('Response status was ' + response.statusCode);
      response.pipe(file);
  });

  // close() is async, call cb after close completes
  file.on('finish', () => file.close(cb));

  // Handle errors
  request.on('error', err => fs.unlink(dest, () => cb(err.message))); // delete the (partial) file and then return the error
  file.on('error', err => fs.unlink(dest, () => cb(err.message))); // delete the (partial) file and then return the error
};
main()
