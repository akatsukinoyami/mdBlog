<script lang="ts">
  import { Button, ImageLoader } from "carbon-components-svelte";
  import { Jpg, Gif, Png, Svg } from "carbon-icons-svelte";

  import { modalImage, modalAlt, imgMode } from "../../stores";
  import i18n from "../../i18n";
  import { lang } from "../../stores";

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

  $: t = i18n($lang);
  $: mode = $imgMode
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<figure on:click={openModal} data-src={src}>
  {#if mode === "showFulls"}
    <ImageLoader src={src} alt={alt} class="rounded-3 modalable" />
  {/if}

  {#if mode === "showThumbs"}
    <ImageLoader src={src.replace('images', 'thumbs')} alt={alt} class="rounded-3 modalable" />
  {/if}

  {#if mode === "showLink" }
    <Button kind="secondary" {...props}>{ t.image }</Button>
  {/if}

  {#if alt} 
    <figcaption class="text-center">{@html alt }</figcaption> 
  {/if}
</figure>
