<script lang="ts">
	import { Router, Route } from "svelte-navigator";
  import Navbar from './components/Navbar.svelte';
  import Aside from './components/Aside.svelte';
  import BlogPost from './components/BlogPost.svelte';
  import BlogSection from "./components/BlogSection.svelte";
  import BackToTop from "./components/BackToTop.svelte";

  import { title } from "./stores";

  let titleValue: string = "Katsu Nikki";
	title.subscribe((value: string) => { titleValue = value });
</script>

<svelte:head>
  <title>{titleValue}</title>
</svelte:head>

<Router primary={false}>
  <Navbar/>
  <main class="pb-4">
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
  <BackToTop />
</Router>

<style lang="sass">
  *
    font-family: 'Merriweather', Georgia, Times, serif
</style>
