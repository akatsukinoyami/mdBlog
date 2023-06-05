<script lang="ts">
  import { Button, ImageLoader } from "carbon-components-svelte";
    import { ChevronLeft, ChevronRight, Close } from "carbon-icons-svelte";

  export let src: string, alt = "";
  
  let bigImageOn = false;

  function toggleModal(){
    bigImageOn = !bigImageOn;
  }

  $: document.body.classList[bigImageOn ? 'add' : 'remove']('noscroll');

  type tooltipPosition = "top" | "right" | "bottom" | "left";
  type button = {iconDescription: string, icon: any, tooltipPosition: tooltipPosition, "on:click": () => void, style: string }
  const buttons: button[] = [
    { iconDescription: "Close Image",    icon: Close,        tooltipPosition: "left",  "on:click": toggleModal, style: "position: fixed; top: 0; right: 0;" },
    { iconDescription: "Previous Image", icon: ChevronLeft,  tooltipPosition: "right", "on:click": toggleModal, style: "position: fixed; top: 50%; left: 0;  transform: translate(0, -50%);" },
    { iconDescription: "Next Image",     icon: ChevronRight, tooltipPosition: "left",  "on:click": toggleModal, style: "position: fixed; top: 50%; right: 0; transform: translate(0, -50%);" },
  ]
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<figure on:click={toggleModal} data-src={src}>
  <ImageLoader src={ src } alt={ alt } fadeIn {...{"class": "rounded-3"}}/>
  {#if alt} <figcaption class="text-center">{ alt }</figcaption> {/if}
</figure>

{#if bigImageOn}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal-background" on:click={toggleModal}>
    <div class="modal-image rounded-3" style="background-image: url({src})"></div>
    {#if alt} <p class="modal-caption text-center rounded-3">{ alt }</p> {/if}
  
    {#each buttons as buttonProps}
      <Button kind="ghost" size="xl" {...buttonProps} />
    {/each}
  </div>
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
