<script lang="ts">
  import Card from "./Card.svelte";

  export let cards: Record<string, any>[], path: string;
</script>

<div class="card__index">
  {#each cards as card}
    <Card {card} {path} />
  {/each}
</div>

<style lang="sass">
  @import "../styles/breakpoints"

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