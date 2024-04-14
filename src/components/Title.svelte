<script lang="ts">
  import { i18n } from "../stores";

  export let title: string;

  $: tabTitle = title === $i18n.mainTitle ? $i18n.mainTitle : `${title} | ${$i18n.mainTitle}`;
  $: h1Title = title
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
