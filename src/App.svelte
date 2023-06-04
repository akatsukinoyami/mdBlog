<script lang="ts">
  import Navbar from './components/Navbar.svelte';
  import Main from './components/Index.svelte';
  import ImageModal from './components/Partials/ImageModal.svelte';
  import BackToTop from "./components/Partials/BackToTop.svelte";
  import { i18n } from "./functions";

	import { Router } from "svelte-navigator";
  import { title, theme, lang } from "./stores";
  import Footer from './components/Footer.svelte';

  let storedTitle: string, displayedTitle: string;
  $: {
    localStorage.lang = $lang;
    storedTitle = i18n('mainTitle', $lang);
    displayedTitle = $title == storedTitle ? storedTitle : `${storedTitle} | ${$title}`
  }
  $: {
    localStorage.theme = $theme;
    document.body.classList.remove('dark', 'light')
    document.body.classList.add($theme)
    }
</script>

<svelte:head>
  <title>{ displayedTitle }</title>
</svelte:head>

<svelte:body style="background-color: #821475;"></svelte:body>

<Router primary={false}>
  <ImageModal />
  <Navbar/>
  <Main />
  <Footer/>
  <BackToTop />
</Router>


<style lang="sass">
  @import './app.sass'
</style>
