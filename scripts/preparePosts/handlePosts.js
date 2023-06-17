const writeMetadataToJson = require('./writeMetadataToJson.js');
const checkTranslationContentExistency = require('./checkTranslationContentExistency.js');
const resizeImages = require('./resizeImages.js');

const deletableFiles = /(\.DS_Store)|(index(_\w{2})?\.(jpe?g|png|webp|json|md))/mi;

function sortByDate(a, b) {
  if (!a.date || !b.date) return 0;

  a = new Date(a.date);
  b = new Date(b.date);

  if (a > b)   return 1;
  if (a < b)   return -1;
  return 0;
}

function handlePosts(children) {
  return children
    .filter(child => !deletableFiles.test((child.name)))
    .map(child => {
      if (child.name === "images") {
        resizeImages(child.children);
        return child;
      };
      
      if (child.children) child.children = handlePosts(child.children);
      if (child.children?.length === 0) delete child.children;
      
      child = writeMetadataToJson(child);
      child = checkTranslationContentExistency(child);
      
      return child;
    })
    .filter(child => child !== undefined)
    .sort(sortByDate)
    .reverse()
}

module.exports = handlePosts;
