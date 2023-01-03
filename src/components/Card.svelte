<script lang="ts">
  import { nameHumanize } from "../functions";
  import type DirectoryTreeFileInterface from "../interfaces/directory.tree.file.interface";

  export let
    link: string,
    card: DirectoryTreeFileInterface;

  const cardName = nameHumanize(card.name);

  function comeToPage(): void{
    location.href = `/blog/${link}`
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="col-12 col-sm-6 col-md-4 p-2">
  <div
    class="mycard text-dark rounded"
    style='background-image: url("/blog/{link}/index.jpg")'
    on:click={comeToPage}
  >
    <h5 class="card-title">{cardName}</h5>
  </div>
</div>

<style lang="sass">

  .mycard
    background-position: center center
    background-repeat: no-repeat no-repeat
    background-size: cover
    border: none
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)
    height: 200px
    position: relative
    transition: 0.3s

    &:hover
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)
      cursor: pointer

    .card-title
      background: rgba(256, 256, 256, 0.4)
      bottom: 10px
      left: 50%
      position: absolute
      width: 80%
      text-align: center
      /* смещение-x | смещение-y | радиус-размытия | цвет */
      text-shadow: 0px 0px 4px white
      transform: translate(-50%, 0)

</style>
