<script lang="ts">
  import { ImageLoader } from "carbon-components-svelte";
  import { modalImage, modalAlt } from "../../stores";

  export let src: string, alt = "";
  
  function openModal(){ modalImage.set(src); modalAlt.set(alt); }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<figure on:click={openModal} data-src={src}>
  <ImageLoader src={src} alt={alt} class="rounded-3 modalable" />
  {#if alt} <figcaption class="text-center">{@html alt }</figcaption> {/if}
</figure>
