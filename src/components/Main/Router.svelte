<script lang="ts">
  import Index from './Index.svelte';
  import Post from './Post.svelte';
  import Aside from '../Aside/Index.svelte';
  import Section from "./Section.svelte";

	import { Route } from "svelte-navigator";
  import { title } from "../../stores";
</script>


<h1 class="text-center fw-lighter mt-3">{$title}</h1>
<section class="shadow p-4 my-4 mx-auto rounded-5 bg-white">
  <main class="pb-4">

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
  <Aside/>
</section>

<style lang="sass">
  *
    font-family: 'Merriweather', Georgia, Times, serif

  section
    max-width: 950px

  h1
    text-shadow: 0px 0px 4px white
</style>
