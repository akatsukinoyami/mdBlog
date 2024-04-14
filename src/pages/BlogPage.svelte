<script lang="ts">
  import { ProgressBar } from "carbon-components-svelte";
  import Post from "../components/Post.svelte";
  import Title from "../components/Title.svelte";
  import CardList from "../components/CardList.svelte"
  import { i18n, lang } from "../stores";

  export let location: Location;
  $: path = location.pathname === "/" ? "/blog" : location.pathname;
</script>

{#await fetch(`${path}/index.json`).then(data => data.json())}
  <ProgressBar helperText={$i18n.wait} />
{:then entity} 
  <Title title={entity.title[$lang]} />
  {#if entity?.post}
    <Post post={entity} {path} />
  {/if}
  {#if entity?.children}
    <CardList cards={entity.children} {path}/>
  {/if}
{:catch error}
  <ProgressBar value={0} status="error" labelText="Error" helperText={error} />
{/await}