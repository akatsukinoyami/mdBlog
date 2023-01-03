<script lang="ts">
  import { nameHumanize } from "../functions";
  import titles from "../jsons/titles.json";

  export let
    title: string,
    description: string,
    imgUrl: string;

    title = nameHumanize(title)
    title = `${titles.mainTitle} | ${title}`
</script>


<svelte:head>
  <meta name="description" content={description}>

  <meta property="og:title" content={title}>
  <meta property="og:site_name" content={titles.mainTitle}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={imgUrl}>

  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  <meta name="twitter:image" content={imgUrl}>
</svelte:head>
