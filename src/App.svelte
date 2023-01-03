<script lang="ts">
  import Navbar from './components/Navbar/Index.svelte';
  import Main from './components/Main/Index.svelte';
  import BackToTop from "./components/BackToTop.svelte";

	import { Router } from "svelte-navigator";
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
  <Main />
  <BackToTop />
</Router>
