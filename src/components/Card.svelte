<script lang="ts">
  import { nameHumanize } from "../functions";
  import type DirectoryTreeFileInterface from "../interfaces/directory.tree.file.interface";

  export let
    link: string,
    card: DirectoryTreeFileInterface;

  const cardName = nameHumanize(card.name);
</script>

<div class="card m-1 pt-1">
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src="/blog/{link}/index.jpg" class="rounded" alt="Card image for post {cardName}.">
  <div class="card-body p-2">
    <a href="/blog/{link}" class="text-dark">
      <h5 class="card-title">{cardName}</h5>
    </a>
  </div>
</div>

<style lang="sass">
  img
    max-width: 300px
    max-height: 160px

  .card
    width: 32%
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)
    border: none
    transition: 0.3s

    &:hover
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)

  .card-body
    a
      text-decoration: none
</style>
