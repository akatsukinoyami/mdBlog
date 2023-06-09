<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { ChevronLeft, ChevronRight, Close } from "carbon-icons-svelte";

  import { modalAlt, modalImage } from "../../stores";

  function getModableImages(): HTMLImageElement[]{
    return Array.from(document.querySelectorAll<HTMLImageElement>("img.modalable"));
  }

  function getCurrentImageIndex(images: HTMLImageElement[]): number{
    return images.indexOf(images.find(({src}) => src.includes($modalImage)));
  }
  function getNewImageIndex(images: HTMLImageElement[], currentImageIndex: number, direction: 1 | -1): number{
    if (direction > 0) {
      return currentImageIndex+1 < images.length ? currentImageIndex+1 : 0
    } else if (direction < 0) {
      return currentImageIndex-1 >= 0 ? currentImageIndex-1 : images.length-1
    }
  }

  function changeModal(direction: 1 | -1): void {
    const images = getModableImages();
    const currentImageIndex = getCurrentImageIndex(images);
    const newImageIndex = getNewImageIndex(images, currentImageIndex, direction);
    
    if (newImageIndex){
      const { src, alt } = images[newImageIndex]
      modalImage.set(src)
      modalAlt.set(alt)
    }
  }

  $: document.body.classList[$modalImage ? 'add' : 'remove']('noscroll');
  let
    modalButton = "position: fixed; z-index: 10002;",
    modalButtonClose = "top: 0; right: 0;",
    modalButtonArrow = "top: 50%; transform: translate(0, -50%);",
    modalButtonLeft  = "left: 0;",
    modalButtonRight = "right: 0;";
</script>

{#if $modalImage}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal-background" on:click={() => { modalImage.set("") }}>
    <div class="modal-image rounded-3" style='background-image: url("{$modalImage}"); '></div>
    {#if $modalAlt} <p class="modal-caption text-center rounded-3">{@html $modalAlt}</p> {/if}
  </div>
  <Button 
    kind="ghost" 
    size="xl" 
    on:click={() => { modalImage.set("") }}    
    iconDescription="Close Image"    
    icon={Close}        
    tooltipPosition="left"
    style="{modalButton} {modalButtonClose}"
  />
  <Button 
    kind="ghost" 
    size="xl" 
    on:click={() => { changeModal(-1) }} 
    iconDescription="Previous Image"
    icon={ChevronLeft}
    tooltipPosition="right"
    style="{modalButton} {modalButtonArrow} {modalButtonLeft}"
  />
  <Button 
    kind="ghost" 
    size="xl" 
    on:click={() => { changeModal(1) }}     
    iconDescription="Next Image"
    icon={ChevronRight}
    tooltipPosition="left"
    style="{modalButton} {modalButtonArrow} {modalButtonRight}"
  />
{/if}

<style lang="sass">
  .modal-
    &image
      position: fixed
      top: 50%
      left: 50%
      z-index: 10001
      transform: translate(-50%, -50%)

      background-position: center center
      background-repeat: no-repeat no-repeat
      background-size: contain

      width: 95vw
      height: 95vh
    
    &background
      position: fixed
      top: 0
      left: 0
      z-index: 10000
      width: 100vw
      height: 100vh
      background-color: rgba(0, 0, 0, 0.5)
      backdrop-filter: blur(4px)
      -webkit-backdrop-filter: blur(4px)

    &caption
      background-color: var(--cds-ui-01)
      position: fixed
      bottom: 0
      left: 50%
      transform: translate(-50%, 0)
      padding: 20px
      z-index: 10002
</style>
