<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, ProgressBar } from "carbon-components-svelte";
  import Post from "../components/Post.svelte";
  import Title from "../components/Title.svelte";
  import CardList from "../components/CardList.svelte"
  import { i18n, lang } from "../stores";
  import { generateBreadcrumbs } from "../utils";
  import { parse } from "yaml";

  export let location: Location;
  $: path = location.pathname === "/" ? "/blog" : location.pathname;
  $: breadcrumbs = generateBreadcrumbs(location.pathname)
</script>

{#await fetch(`${path}/index.yaml`).then(data => data.text()).then(text => parse(text))}
  <ProgressBar helperText={$i18n.wait} />
{:then entity}
  <Breadcrumb noTrailingSlash>
    {#each breadcrumbs as item, i}
      <BreadcrumbItem href={item.href} isCurrentPage={i === breadcrumbs.length - 1}>
        {item.text}
      </BreadcrumbItem>
    {/each}
  </Breadcrumb>

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