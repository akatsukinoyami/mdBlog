<script lang="ts">
  import { Tile } from "carbon-components-svelte";
	import { Route } from "svelte-navigator";

  import Index from "./Main/Index.svelte";
  import Post from "./Main/Post.svelte";
  import Section from "./Main/Section.svelte";
  import Title from "./Partials/Title.svelte";
</script>

<section>
  <Title />
  <Tile>
    <Route path="blog/*">
      <Route path=":sectionName/:postName" component={Post} />
      <Route path=":sectionName/" component={Section} />
    </Route>

    <Route component={Index} />
  </Tile>
</section>

<style lang="sass">
  section
    max-width: var(--content-width)
    margin: 20px auto 100px
    padding: 20px
    border-radius: 10px
</style>
