<script lang="ts">
  const bigImageClass = 'big-image';
  const modalImageClass = 'modal-image';

  $: bigImageOn = false;
  $: document.body.classList[bigImageOn ? 'remove' : 'add']('noscroll');

  function closeImages() {
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove(bigImageClass);
    }

    bigImageOn = !bigImageOn;
  }

  function otherImage(event: KeyboardEvent): void {
    const images = Array.from(document.getElementsByClassName(modalImageClass));
    const currentImage = document.getElementsByClassName(bigImageClass)[0] as HTMLImageElement;

    currentImage.classList.remove(bigImageClass);
    images[
      images.indexOf(currentImage) +
      (event.key === "ArrowLeft" ? -1 : 1)
    ].classList.add(bigImageClass);
  }

  function toggleImage(image: HTMLImageElement): void {
    const imageAlreadyBig = image.classList.contains(bigImageClass);
    image.classList[imageAlreadyBig ? 'remove' : 'add'](bigImageClass);
    bigImageOn = !bigImageOn;
  }

  function handleClick(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    const isImage = element.tagName == 'IMG'
    const isModalImage = element.classList.contains(modalImageClass)

    isImage && isModalImage
      ? toggleImage(element as HTMLImageElement)
      : null;
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (!bigImageOn || document.getElementsByClassName(bigImageClass).length < 1) return;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft":
        otherImage(event); break;
      case "Escape":
        closeImages();  break;
    }
  }

</script>

<svelte:window on:click={handleClick} on:keydown={handleKeydown}/>

{#if bigImageOn}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal-background" on:click={closeImages} />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <i class="bi bi-x-lg modal-icon modal-close" on:click={closeImages} />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <i class="bi bi-chevron-right modal-icon modal-previous" on:click={() => otherImage(-1)} />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <i class="bi bi-chevron-right modal-icon modal-next" on:click={() => otherImage(1)} />
{/if}

<style lang="sass">
  .modal-
    &background
      position: fixed
      top: 0
      left: 0
      z-index: 1040
      width: 100vw
      height: 100vh
      background-color: rgba(0, 0, 0, 0.5)
      backdrop-filter: blur(4px)
      -webkit-backdrop-filter: blur(4px)

    &icon
      position: fixed
      z-index: 1041
      color: white
      font-weight: 800
      font-size: 30px
      cursor: pointer

    &close
      top: 20px
      right: 20px

    &previous
      top: 50%
      left: 20px
      transition: translate(0, -50%)

    &next
      top: 50%
      right: 20px
      transition: translate(0, -50%)
</style>
