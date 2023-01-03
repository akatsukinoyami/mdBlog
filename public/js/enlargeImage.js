const bigImage = 'big-image';
const noScroll = 'noscroll';
const modalBackground = 'modal-background';

function enlargeImage(id){
  const image = document.getElementById(id);
  const background = document.getElementById('modalBackground');
  const body = document.getElementsByTagName('body')[0];

  if (image.classList.contains(bigImage)) {
    image.classList.remove(bigImage)
    body.classList.remove(noScroll);
    background.classList.remove(modalBackground);
  } else {
    image.classList.add(bigImage);
    body.classList.add(noScroll);
    background.classList.add(modalBackground);
  };
};
