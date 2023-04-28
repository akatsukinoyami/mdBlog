<script>
  import ChangerLang from "./Partials/ChangerLang.svelte";
  import ChangerTheme from "./Partials/ChangerTheme.svelte";
</script>

<footer>
  <ChangerLang/>
  <ChangerTheme/>
</footer>

<style lang="sass">
  footer
    left: 0
    right: 0
    bottom: 0
    height: 40px
    position: absolute
    background-color: var(--color-light-grey)
</style>
