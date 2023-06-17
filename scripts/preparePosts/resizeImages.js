const fs = require('fs');
const sharp = require("sharp");

function resizeImages(images) {
  if (images.length === 0) return;

  fs.mkdirSync(
    images[0].path.replace(/images(.+)/i, 'thumbs')
  )

  images.forEach((image) => {
    if (image.name.match(/\.(jpe?g|png|webp)/i)) {
      sharp(image.path)
        .resize(600)
        .toFile(image.path.replace('images', 'thumbs'))
    }
  });
};

module.exports = resizeImages;
