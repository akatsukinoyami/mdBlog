<script lang="ts">
  import i18n from "../i18n/index";
  import { lang } from "../stores/settings";
  import { title } from "../stores/index";


  $: t = i18n($lang);
  $: tabTitle = $title == t.mainTitle ? t.mainTitle : `${$title} | ${t.mainTitle}`;
  $: h1Title = $title
</script>

<svelte:head>
  <title>{ tabTitle }</title>
</svelte:head>

<h1 class="text-center">
  { h1Title }
</h1>

<style lang="sass">
  h1
    margin: 30px
</style>
