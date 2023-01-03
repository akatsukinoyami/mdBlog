<script lang="ts">
  import { nameHumanize } from "../functions";
  import type DirectoryTreeFileInterface from "../interfaces/directory.tree.file.interface";

  export let
    link: string,
    card: DirectoryTreeFileInterface;

  const cardName = nameHumanize(card.name);
</script>

<div class="card m-1 p-1">
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src="/blog/{link}/index.jpg" alt="Card image for post {cardName}.">
  <div class="card-body">
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

  a
    text-decoration: none
</style>
