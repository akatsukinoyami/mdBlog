<script lang="ts">
  import Index from './Main/Index.svelte';
  import Post from './Main/Post.svelte';
  import Section from "./Main/Section.svelte";

	import { Route } from "svelte-navigator";
  import { title } from "../stores";
</script>

<h1 class="text-center">{$title}</h1>
<section>
  <main>

      <Route path="blog/:section/:post" let:params>
        <Post link="/blog/{params.section}/{params.post}/index" />
      </Route>

      <Route path="blog/:section" let:params>
        <Section sectionName={params.section} />
      </Route>

      <Route path="page/:page" let:params>
        <Post link="/page/{params.page}" />
      </Route>

      <Route>
        <Index />
      </Route>

  </main>
</section>

<style lang="sass">
  h1
    text-shadow: 0px 0px 4px var(--bg-color)

  section
    max-width: 1000px
    margin: 20px auto 100px
    padding: 20px
    background-color: var(--color-light-grey)
    border-radius: 10px

  main
    padding-bottom: 20px
</style>
