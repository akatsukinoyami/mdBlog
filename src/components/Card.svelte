<script lang="ts">
  import { lang } from "../stores";
  
  export let card: Record<string, any>, path: string;
  $: href = `${path}/${card.path}`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<a {href}
  class="card plate-parent rounded-3"
  style:background-image="url('{href}/index.jpg')"
>
  <h4 class="plate-text rounded-3 fw-bold">{card.title[$lang]}</h4>
</a>

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
  
.plate-
  &parent
    display: block
    height: 100%
    position: relative    
    background-position: center center
    background-repeat: no-repeat no-repeat
    background-size: cover

  &text
    width: 80%

    bottom: 10px
    left: 50%
    position: absolute
    transform: translate(-50%, 0)
    text-align: center

    color: var(--card-text)
    background-color: var(--card-plate)
</style>
