const bigImageClass = ['big-image'];
const noScrollClass = ['noscroll'];
const modalBackgroundClass = ['modal-background'];
const closeModalImage = ['bi', 'bi-x-lg', 'close-modal']


function enlargeImage(id) {
  const image = document.getElementById(id);

  function toggleImage(callbackfn) {
    [
      [ image, bigImageClass ],
      [ document.getElementsByTagName('body')[0], noScrollClass ],
      [ document.getElementById('closeModal'), closeModalImage ],
      [ document.getElementById('modalBackground'), modalBackgroundClass],
    ]
      .forEach(([element, classes]) => {
      callbackfn(element.classList, classes)
    })
  }

  !image.classList.contains(bigImageClass)
    ? toggleImage((classList, classes) => classList.add(...classes))
    : toggleImage((classList, classes) => classList.remove(...classes));
};
