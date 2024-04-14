<script lang="ts">
  import { Button, ImageLoader } from "carbon-components-svelte";
  import { Jpg, Gif, Png, Svg } from "carbon-icons-svelte";

  import { i18n, imgMode, modalImage, modalAlt } from "../stores";

  export let src: string, alt = "";
  
  function openModal(){ 
    modalImage.set(src); 
    modalAlt.set(alt); 
  }

  const props: Record<string, any> = {};
  if (src.match(/\.jpe?g/i)) props.icon = Jpg;
  if (src.match(/\.png/i))   props.icon = Png;
  if (src.match(/\.gif/i))   props.icon = Gif;
  if (src.match(/\.svg/i))   props.icon = Svg;

  $: mode = $imgMode
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<figure class="text-center w-100 mb-1" on:click={openModal}>
  {#if mode === "showFulls"}
    <ImageLoader src={src} alt={alt} class="rounded-3 modalable" />
  {/if}

  {#if mode === "showThumbs"}
    <ImageLoader src={src.replace('images', 'thumbs')} alt={alt} class="rounded-3 modalable" />
  {/if}

  {#if mode === "showLink" }
    <Button kind="secondary" {...props}>{ $i18n.image }</Button>
  {/if}

  {#if alt} 
    <figcaption class="text-center">{@html alt }</figcaption> 
  {/if}
</figure>
