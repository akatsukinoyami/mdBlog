<script lang="ts">
	import { Router, Route } from "svelte-navigator";
  import Navbar from './components/Navbar.svelte';
  import Aside from './components/Aside.svelte';
  import BlogPost from './components/BlogPost.svelte';
  import BlogSection from "./components/BlogSection.svelte";
</script>

<Router primary={false}>
  <Navbar/>
  <main class="container">
      <Route path="blog/:section/:post" let:params>
        <BlogPost link="/blog/{params.section}/{params.post}/index.md" />
      </Route>
      <Route path="blog/:section" let:params>
        <BlogSection sectionName={ params.section } />
      </Route>
      <Route path="page/:page" let:params>
        <BlogPost link="/page/{params.page}.md" />
      </Route>
      <Route component="{ BlogPost }" link="/page/index.md" />
  </main>
  <Aside/>
</Router>

<style lang="sass">
  *
    font-family: 'Merriweather', Georgia, Times, serif
</style>
