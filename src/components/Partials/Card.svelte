<script lang="ts">
  import { links } from "svelte-navigator";
  import { nameHumanize } from "../../functions";
  import type DirectoryTreeFileInterface from "../../interfaces/directory.tree.file.interface";

  export let
    link: string,
    card: DirectoryTreeFileInterface;

  const cardName = nameHumanize(card.name);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="col-4" use:links>
  <a
    href="/blog/{link}"
    class="card my-card text-dark rounded"
    style='background-image: url("/blog/{link}/index.jpg")'
  >
    <h5 class="card-title">{cardName}</h5>
  </a>
</div>

<style lang="sass">
  .my-card
    background-position: center center
    background-repeat: no-repeat no-repeat
    background-size: cover
    border: none
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)
    display: block
    height: 200px
    position: relative
    transition: 0.6s
    transition: all .3s ease-out 0s

    &:hover
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)
      transform: scale(1.03)
      transition: all .15s ease-out 0s
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
