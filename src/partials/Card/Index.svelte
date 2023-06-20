<script lang="ts">
  import Card from "./Show.svelte";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  export let 
    cards: DirectoryTreeFile[],
    linkPrepare: (card: DirectoryTreeFile) => string;
</script>

<div class="card__index">
  {#each cards as card}
    <Card link={linkPrepare(card)} card={card} />
  {/each}
</div>

<style lang="sass">
  @import "../../styles/breakpoints"

  .card__index
    display: grid
    grid-auto-rows: minmax(200px, auto)
    grid-column-gap: 12px
    grid-row-gap: 12px

  @media (max-width: $sm) 
    .card__index
      grid-template-columns: 1fr

  @media (min-width: $sm) and (max-width: $md)
    .card__index
      grid-template-columns: 1fr 1fr
  
  @media (min-width: $md) 
    .card__index
      grid-template-columns: 1fr 1fr 1fr
</style>