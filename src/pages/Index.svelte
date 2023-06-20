<script lang="ts">
  import { Route } from "svelte-navigator";
  import { Tile }  from "carbon-components-svelte";

  import Title   from "../partials/Title.svelte";
  import Auth    from "./auth/Index.svelte";
  import Blog    from "./blog/Index.svelte";
  import Section from "./blog/Section.svelte";
  import Post    from "./blog/Post.svelte";

  import { backend } from "../stores/backend";

  $: authable = $backend.avaliable;
</script>

<section>
  <Title />
  <Tile>
    {#if authable}
      <Route path="auth/*">
        <Route path="sign_in" component={Auth} />
        <Route path="sign_up" component={Auth} register={true} />
      </Route>
    {/if}
    <Route path="blog/*">
      <Route path=":sectionName/:postName" component={Post} />
      <Route path=":sectionName/" component={Section} />
    </Route>
    <Route component={Blog}/>
  </Tile>
</section>

<style lang="sass">
  section
    max-width: var(--content-width)
    margin: 20px auto 100px
    padding: 20px
    border-radius: 10px
</style>
