<script lang="ts">
  import { Column } from "carbon-components-svelte";
  import { tTitle } from "../../functions";
  import { lang } from "../../stores";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  export let
    link: string,
    card: DirectoryTreeFile;

  $: cardName = tTitle(card, $lang);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Column sm={10} md={4} max={4} aspectRatio="16x9">
  <a
    href="/blog/{link}"
    class="card plate-parent rounded-3"
    style='background-image: url("/blog/{link}/index.jpg")'
  >
    <h4 class="plate-text rounded-3 fw-bold">{cardName}</h4>
  </a>
</Column>

<style lang="sass">
  .card
    display: block
    transition: 0.6s
    transition: all .3s ease-out 0s
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)

    &:hover
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)
      transform: scale(1.03)
      transition: all .15s ease-out 0s
      cursor: pointer
</style>
