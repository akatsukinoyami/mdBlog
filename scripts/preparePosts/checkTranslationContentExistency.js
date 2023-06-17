const fs = require('fs');

function checkTranslationContentExistency(child) {   
  exists = (version) => fs.existsSync(`./${child.path}/index${version}.md`)
  
  child.version = { en: exists(""), ru: exists("_ru"), ua: exists("_ua") } 
  return child; 
}

module.exports = checkTranslationContentExistency
