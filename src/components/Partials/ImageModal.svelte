<script lang="ts">
  const
    bigImageClass = 'big-image',
    modalImageClass = 'modal-image',
    modalButtonsClass = 'btn btn-outline-light bi modal-icon';

  $: bigImageOn = false;
  $: document.body.classList[bigImageOn ? 'add' : 'remove']('noscroll');

  function closeAllImages() {
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove(bigImageClass);
    }
    bigImageOn = !bigImageOn;
  }

  function otherImage(step: number): void {
    const images = Array.from(document.getElementsByClassName(modalImageClass));
    const currentImage = document.getElementsByClassName(bigImageClass)[0] as HTMLImageElement;

    currentImage.classList.remove(bigImageClass);
    images[
      images.indexOf(currentImage) + step
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
        otherImage(event.key === "ArrowLeft" ? -1 : 1); break;
      case "Escape":
        closeAllImages();  break;
    }
  }

</script>

<svelte:window on:click={handleClick} on:keydown={handleKeydown}/>

{#if bigImageOn}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal-background" on:click={closeAllImages} />

  <button
    class="{modalButtonsClass} bi-x-lg modal-close"
    type="button" on:click={closeAllImages}
  />
  <button
    class="{modalButtonsClass} modal-arrows bi-chevron-left modal-previous"
    type="button" on:click={() => otherImage(-1)}
  />
  <button
    class="{modalButtonsClass} modal-arrows bi-chevron-right modal-next"
    type="button" on:click={() => otherImage(1)}
  />
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
      border: none

      &:hover
        color: rgba(var(--bs-dark-rgb))

    &close
      top: 20px
      right: 20px

    &arrows
      top: 50%
      transform: translate(0, -50%)

    &previous
      left: 20px

    &next
      right: 20px
</style>
