<script lang="ts">
  import Navbar from './components/Navbar/Index.svelte';
  import Aside from './components/Aside/Index.svelte';
  import Post from './components/Main/Post.svelte';
  import Section from "./components/Main/Section.svelte";
  import BackToTop from "./components/BackToTop.svelte";

	import { Router, Route } from "svelte-navigator";
  import { title } from "./stores";

  let titleValue: string = "Katsu Nikki";
	title.subscribe((value: string) => { titleValue = value });
</script>

<svelte:head>
  <title>{
    titleValue == "Katsu Nikki" ? "Katsu Nikki" : `Katsu Nikki | ${titleValue}`
  }</title>
</svelte:head>

<Router primary={false}>
  <Navbar/>
  <h1 class="text-center fw-lighter mt-3">{titleValue}</h1>
  <section class="shadow p-4 my-4 mx-auto rounded-5 bg-white">
    <main class="pb-4">
        <Route path="blog/:section/:post" let:params>
          <Post link="/blog/{params.section}/{params.post}/index.md" />
        </Route>
        <Route path="blog/:section" let:params>
          <Section sectionName={params.section} />
        </Route>
        <Route path="page/:page" let:params>
          <Post link="/page/{params.page}.md" />
        </Route>
        <Route>
          <Post link="/page/index.md" />
        </Route>
    </main>
    <Aside/>
  </section>
  <BackToTop />
</Router>

<style lang="sass">
  *
    font-family: 'Merriweather', Georgia, Times, serif

  section
    max-width: 950px

  h1
    text-shadow: 0px 0px 4px white
</style>
