<script>
  import ChangerLang from "./Partials/ChangerLang.svelte";
  import ChangerTheme from "./Partials/ChangerTheme.svelte";
</script>

<footer class="text-right">
  <ChangerLang/>
  <ChangerTheme/>
</footer>

<style lang="sass">
  footer
    left: 0
    right: 0
    bottom: 0
    height: 40px
    position: fixed
    background-color: var(--bg-color)
</style>
