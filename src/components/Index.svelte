<script lang="ts">
  import { Tile } from "carbon-components-svelte";

  import Index from './Main/Index.svelte';
  import Post from './Main/Post.svelte';
  import Section from "./Main/Section.svelte";

	import { Route } from "svelte-navigator";
  import { title } from "../stores";

  $: displayedTitle = $title
</script>


<section>
  <h1 class="text-center">{displayedTitle}</h1>

  <Tile>
    <Route path="blog/:section/:post" let:params>
      <Post link="/blog/{params.section}/{params.post}/index" sectionName={params.section} postName={params.post} />
    </Route>
  
    <Route path="blog/:section" let:params>
      <Section sectionName={params.section} />
    </Route>
  
    <Route>
      <Index />
    </Route>
  </Tile>
</section>

<style lang="sass">
  section
    max-width: var(--content-width)
    margin: 20px auto 100px
    padding: 20px
    border-radius: 10px

    h1
      margin: 30px
</style>
