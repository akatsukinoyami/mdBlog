<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { ChevronLeft, ChevronRight } from "carbon-icons-svelte";

  import Modal from "./Index.svelte";
  import { modalAlt, modalImage } from "../../stores/index";

  const ops = {
    images: [],
    currentImageIndex: 0,
    newImageIndex: 0,

    getModalableImages(): void {
      const images = document.querySelectorAll<HTMLImageElement>("img.modalable")
      this.images = Array.from(images);
    },

    getCurrentImageIndex(): void {
      const condition = ({ src }) => src.includes($modalImage);
      const currentImage = this.images.find(condition);
      this.currentImageIndex = this.images.indexOf(currentImage);
    },

    getNewImageIndex(direction: 1 | -1): void {    
      this.newImageIndex = direction > 0
        ? (this.currentImageIndex + 1) % this.images.length
        : (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    },

    changeImage(direction: 1 | -1): void {
      this.getModalableImages();
      this.getCurrentImageIndex();
      this.getNewImageIndex(direction);
      
      if (this.newImageIndex || this.newImageIndex === 0){
        const { src, alt } = this.images[this.newImageIndex]
        modalImage.set(src)
        modalAlt.set(alt)
      }
    }
  }

  function handleKeydown({ key }) {
    if (!$modalImage) return;
    ["ArrowDown", "ArrowRight"].includes(key) && ops.changeImage(1);
    ["ArrowUp", "ArrowLeft"].includes(key) && ops.changeImage(-1);
	}

  $: show = !!$modalImage;
</script>

<svelte:window on:keydown={handleKeydown}/>

<Modal show={ show } closeModalCallback={ () => modalImage.set("") }>
  <span slot="modal">
    <div class="modal-image rounded-3" style='background-image: url("{$modalImage}"); ' />
    {#if $modalAlt} 
      <p class="modal-caption text-center rounded-3">
        {@html $modalAlt}
      </p> 
    {/if}
  </span>
  <span slot="after">
    <div class="modal-button modal-button-arrow modal-button-left">
      <Button 
        kind="ghost" 
        size="xl" 
        on:click={() => { ops.changeImage(-1) }} 
        iconDescription="Previous Image"
        icon={ChevronLeft}
        tooltipPosition="right"
      />
    </div>
    <div class="modal-button modal-button-arrow modal-button-right">
      <Button 
        kind="ghost" 
        size="xl" 
        on:click={() => { ops.changeImage(1) }}     
        iconDescription="Next Image"
        icon={ChevronRight}
        tooltipPosition="left"
      />
    </div>
  </span>
</Modal>

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

    &caption
      background-color: var(--cds-ui-01)
      position: fixed
      bottom: 0
      left: 50%
      transform: translate(-50%, 0)
      padding: 20px
      z-index: 10002
    
    &button
      position: fixed
      z-index: 10002
      
      &-arrow
        top: 50%
        transform: translate(0, -50%)

      &-left
        left: 0

      &-right
        right: 0
</style>
