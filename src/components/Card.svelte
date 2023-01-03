<script lang="ts">
  import { nameHumanize } from "../functions";
  import type DirectoryTreeFileInterface from "../interfaces/directory.tree.file.interface";

  export let
    link: string,
    card: DirectoryTreeFileInterface;

  const cardName = nameHumanize(card.name);
</script>

<div class="col mycard m-2 py-2 d-flex flex-column align-items-center">
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src="/blog/{link}/index.jpg" class="rounded" alt="Card image for post {cardName}.">
  <div class="mycard-body p-2 align-self-center">
    <a href="/blog/{link}" class="text-dark">
      <h5 class="card-title">{cardName}</h5>
    </a>
  </div>
</div>

<style lang="sass">
  img
    max-width: 300px
    max-height: 160px

  .mycard
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)
    border: none
    transition: 0.3s

    &:hover
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)

  .mycard-body
    a
      text-decoration: none
</style>
