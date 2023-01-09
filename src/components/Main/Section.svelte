<script lang="ts">
  import Card from "../Partials/Card.svelte";
  import LinkPreviewHead from "../Partials/LinkPreviewHead.svelte";

  import posts from "../../jsons/posts.json";
  import i18n from "../../jsons/i18n.json";
  import { nameHumanize, updateTitle } from "../../functions";

  import type DirectoryTreeFileInterface from "../../interfaces/directory.tree.file.interface";

  export let sectionName: string;
  updateTitle(sectionName)

  const
    section = posts.children.find(section => section.name === sectionName),
    title = section.name,
    description = "Small private blog of Katsu Dev.",
    imgUrl = `/blog/${section.name}/index.jpg`;

  function getLink(post: DirectoryTreeFileInterface): string {
    return `${section.name}/${post.name}`;
  }
</script>

<svelte:head>
  <link
    rel="alternate"
    type="application/rss+xml"
    title="RSS Feed for {nameHumanize(sectionName)} of {i18n.mainTitle}"
    href="{location.href}/feed.xml"
  />
</svelte:head>

<div class="row">
  {#each section.children as post}
    {#if post?.children}
      <Card link={getLink(post)} card={post} />
    {/if}
  {/each}
</div>

<LinkPreviewHead {title} {description} />
