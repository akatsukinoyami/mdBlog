import fs from "fs";
import path from "path";
import sharp from "sharp";

const image = /images\/.+?\.(jpe?g|gif|png|webp)/
const json = /index\.json/

const dist = (path) => `dist/${path}`;
const thumb = (path) => dist(path).replace('images', 'thumbs');

async function handleJson(filepath) {
  await handleCardImage(filepath);
  let data = JSON.parse(await fs.promises.readFile(filepath));  
  try {
    data = await handleCategory(filepath, data);
    data = await handlePost(filepath, data);
  } catch(error) { 
    console.error(error)
  } finally {
    await fs.promises.writeFile(dist(filepath), JSON.stringify(data));
  }
}
async function handlePost(filepath, json) {
  if(json.post){
    json.text = Object.fromEntries(await Promise.all(
      ['en', 'ru', 'ua'].map(async (lang) => {
        try {
          return [lang, await fs.promises.readFile(filepath.replace('index.json', `index_${lang}.md`), 'utf8')];
        } catch(error) { 
          console.error(error)
    }})));
  }
  return json;
}
async function handleCategory(filepath, json) {
  const folderpath = filepath.replace('/index.json', '')
  const childrenNames = filterChildren(await fs.promises.readdir(folderpath));
  if (childrenNames.length) {
    json.children = await Promise.all(childrenNames.map(async (name) => ({
      path: name, ...JSON.parse(await fs.promises.readFile(`${folderpath}/${name}/index.json`, 'utf8'))
    })))
  }
  return json;
}
async function handleCardImage(filepath) {
  try {
    const imgpath = filepath.replace('.json', '.jpg');  
    await sharp(imgpath)
      .resize({ width: 400 })
      .toFile(thumb(imgpath))
  } catch(error) { 
    console.error(error)
  }
}
function filterChildren(childArray) {
  const filterableFiles = [
    "images", ".DS_Store", "index.jpg", "index.json",
    "index_en.md", "index_ru.md", "index_ua.md", 
  ];
  return childArray.filter(e => !filterableFiles.includes(e));
}

async function handleFile(filepath) {
  if (image.test(filepath)) await handleImage(filepath);
  if (json.test(filepath)) await handleJson(filepath);
}

async function handleImage(filepath) {
  await fs.promises.copyFile(filepath, dist(filepath));
  await sharp(filepath)
    .resize({ height: 400 })
    .toFile(thumb(filepath))
}

async function handleFolder(filepath) {
  await fs.promises.mkdir(dist(filepath), { recursive: true });
  if (filepath.includes('images')) {
    await fs.promises.mkdir(thumb(filepath), { recursive: true });
  }
}

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) {
      await handleFolder(entry);
      yield* walk(entry);
    }
    else if (d.isFile()) {
      yield entry;
    }
  }
}

async function main() {
  for await (const p of walk('blog/')) {
    handleFile(p)
  }
}

main()
