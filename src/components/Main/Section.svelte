<script lang="ts">
  import Card from "../Partials/Card.svelte";
  import LinkPreviewHead from "../Partials/LinkPreviewHead.svelte";

  import posts from "../../jsons/posts.json";
  import { updateTitle } from "../../functions";

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

<div class="row">
  {#each section.children as post}
    {#if post?.children}
      <Card link={getLink(post)} card={post} />
    {/if}
  {/each}
</div>

<LinkPreviewHead {title} {description} />
