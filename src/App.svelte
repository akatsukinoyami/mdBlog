<script lang="ts">
  import Navbar from './components/Navbar.svelte';
  import Main from './components/Index.svelte';
  import ImageModal from './components/Partials/ImageModal.svelte';
  import BackToTop from "./components/Partials/BackToTop.svelte";
  import { i18n } from "./functions";

	import { Router } from "svelte-navigator";
  import { title, theme, lang } from "./stores";
  import Footer from './components/Footer.svelte';

  const storedTitle = i18n('mainTitle');
  $: localStorage.lang = $lang;
  $: {
    localStorage.theme = $theme;
    document.body.classList.add('dark-theme')
  }
</script>

<svelte:head>
  <title>{ $title == storedTitle ? storedTitle : `${storedTitle} | ${$title}` }</title>
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
  @import '../node_modules/chota/dist/chota.min.css'

  :global(*)
    font-family: var(--font-family-sans)
    color: var(--font-color)

  :global(html)
    height: 100%

  :global(body)
    margin: 0
    padding: 0
    min-height: 100%
    position: relative
    padding-bottom: 40px
    box-sizing: border-box

  :global(a)
    text-decoration: none

  :global(table)
    table-layout: fixed
    width: 100%

  :root
    --bg-color: #ffffff
    --bg-secondary-color: #f3f3f6
    --color-primary: #14854F
    --color-light-grey: #d2d6dd
    --color-grey: #747681
    --color-dark-grey: #3f4144
    --color-error: #d43939
    --color-success: #28bd14
    --grid-max-width: 120rem
    --grid-gutter: 2rem
    --font-size: 1.6rem
    --font-color: #333333
    --font-family-sans: sans-serif
    --font-family-mono: monaco, "Consolas", "Lucida Console", monospace
</style>
