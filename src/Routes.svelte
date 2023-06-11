<script lang="ts">
  import { Tile }   from "carbon-components-svelte";
	import { Route }  from "svelte-navigator";

  import Title      from "./components/Partials/Title.svelte";
  import Index      from "./components/Blog/Index.svelte";
  import Section    from "./components/Blog/Section.svelte";
  import Post       from "./components/Blog/Post.svelte";
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
