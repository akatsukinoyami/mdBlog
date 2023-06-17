function writeMetadataToJson(child) {
  return { 
    ...child,  
    ...require(`../../${child.path}/index.json`) ,
  };
}

module.exports = writeMetadataToJson;
