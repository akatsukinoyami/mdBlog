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

  :global(.border-none)
    border: none !important

  :global(body.dark)
    --bg-color: #000000
    --abg-color: #ffffff
    --bg-secondary-color: #131316
    --font-color: #f5f5f5
    --color-grey: #ccc
    --color-light-grey: #3f4144
    --color-dark-grey: #777
    --color-whalf-transparent: rgba(256, 256, 256, 0.4)
    --color-bhalf-transparent: rgba(0, 0, 0, 0.4)


  :root
    --bg-color: #ffffff
    --abg-color: #000000
    --bg-secondary-color: #f3f3f6
    --color-primary: #14854F
    --color-grey: #747681
    --color-light-grey: #d2d6dd
    --color-dark-grey: #3f4144
    --color-error: #d43939
    --color-success: #28bd14
    --color-whalf-transparent: rgba(0, 0, 0, 0.4)
    --color-bhalf-transparent: rgba(256, 256, 256, 0.4)
    --grid-max-width: 120rem
    --grid-gutter: 2rem
    --font-size: 1.6rem
    --font-color: #333333
    --font-family-sans: sans-serif
    --font-family-mono: monaco, "Consolas", "Lucida Console", monospace
</style>
