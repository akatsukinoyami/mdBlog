<script lang="ts">
  import { nameHumanize } from "../../functions";
  import i18n from "../../jsons/i18n.json";

  export let
    title: string,
    description: string;

  title = nameHumanize(title);
  let imgUrl = location.href === location.origin + '/'
    ? location.href + 'favicon.ico'
    : location.href + '/index.jpg';

</script>


<svelte:head>
  <meta name="description" content={description}>

  <meta property="og:title" content={title}>
  <meta property="og:site_name" content={i18n.mainTitle}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={imgUrl}>
  <meta property="og:url" content={location.href}>
  <meta property="og:type" content='article'>

  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  <meta name="twitter:image" content={imgUrl}>
</svelte:head>
