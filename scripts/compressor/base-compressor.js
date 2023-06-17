// https://github.com/IshIvan/shakal/blob/master/scripts/base-compressor.js

const fs = require('fs');
const glob = require('glob');


module.exports.baseCompressor = (
  compressFunction, 
  options, 
  extension, 
  workdirs,
) =>{

  if (!workdirs) {
    try {
      workdirs = JSON.parse(process.env.dirs)
    } catch {
      workdirs = ['dist/']
    }
  }

  console.log(`Compressing bundle with ${extension}`);
  // console.log(workdirs);

  workdirs.forEach(workdir => {
    glob
      .sync(workdir + '**/*.?(js|json|html|css)')
      .forEach(filepath => {
        fs.readFile(filepath, (err, buffer) => {
          const compressedFilePath = filepath + extension;

          // console.log(compressedFilePath);

          const compressedBuffer = compressFunction(buffer, options);

          fs.writeFileSync(compressedFilePath, compressedBuffer);
        });
      });
  })
};
