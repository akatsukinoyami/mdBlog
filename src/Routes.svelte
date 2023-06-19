<script lang="ts">
  import { Tile }   from "carbon-components-svelte";

  import Title      from "./components/Partials/Title.svelte";
  import Auth       from "./components/Auth/Index.svelte";
  import Blog       from "./components/Blog/Index.svelte";
</script>

<section>
  <Title />
  <Tile>
    <Auth/>
    <Blog/>
  </Tile>
</section>

<style lang="sass">
  section
    max-width: var(--content-width)
    margin: 20px auto 100px
    padding: 20px
    border-radius: 10px
</style>
