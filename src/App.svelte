<script lang="ts">
  import Navbar from './components/Navbar/Index.svelte';
  import Main from './components/Index.svelte';
  import BackToTop from "./components/Partials/BackToTop.svelte";
  import titles from "./jsons/titles.json";

	import { Router } from "svelte-navigator";
  import { title } from "./stores";
</script>

<svelte:head>
  <title>{
    $title == titles.mainTitle
      ? titles.mainTitle
      : `${titles.mainTitle} | ${$title}`
  }</title>
</svelte:head>

<Router primary={false}>
  <div id="modalBackground"></div>
  <Navbar/>
  <Main />
  <BackToTop />
</Router>
