<script lang="ts">
  const bigImageClass = 'big-image';

  function closeImages() {
    const images = document.getElementsByTagName('img');

    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove(bigImageClass);
    }

    toggleBackground(true);
  }

  // true for hiding background and buttons, false to open it
  function toggleBackground(condition: boolean): void {
    [
      [ document.getElementsByTagName('body')[0], ['noscroll'] ],
      [ document.getElementById('modalBackground'), ['modal-background'] ],
      [ document.getElementById('closeModal'), ['bi', 'bi-x-lg', 'modal-icon', 'modal-close'] ],
      [ document.getElementById('previousImage'), ['bi', 'bi-chevron-left', 'modal-icon', 'modal-previous'] ],
      [ document.getElementById('nextImage'), ['bi', 'bi-chevron-right', 'modal-icon', 'modal-next'] ],
    ]
    .forEach((elem) => {
      const element = elem[0] as HTMLElement;
      const classes = elem[1] as string[];
      condition
        ? element.classList.remove(...classes)
        : element.classList.add(...classes);
    })
  }

  function otherImage(step: number): void {
    const images = Array.from(document.getElementsByClassName('modal-image'));
    const currentImage = document.getElementsByClassName(bigImageClass)[0] as HTMLImageElement;

    const indexOfCurrentImage = images.indexOf(currentImage)
    currentImage.classList.remove(bigImageClass);
    images[indexOfCurrentImage+step].classList.add(bigImageClass);
  }

  function toggleImage(image: HTMLImageElement) {
    const imageAlreadyBig = image.classList.contains('big-image')
    imageAlreadyBig
      ? image.classList.remove('big-image')
      : image.classList.add('big-image');
    toggleBackground(imageAlreadyBig);
  }

  function handleClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const isImage = element.tagName == 'IMG'
    const isModalImage = element.classList.contains('modal-image')

    isImage && isModalImage
      ? toggleImage(element as HTMLImageElement)
      : null;
  }

</script>

<svelte:window on:click={handleClick}/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="modalBackground" on:click={closeImages} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<i id="closeModal" on:click={closeImages} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<i id="previousImage" on:click={() => otherImage(-1)} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<i id="nextImage" on:click={() => otherImage(1)} />
