<script lang="ts">
  import posts from "../../jsons/posts.json";
  import Card from "../Card.svelte";
  import { updateTitle } from "../../functions";
  import type DirectoryTreeFileInterface from "../../interfaces/directory.tree.file.interface";

  export let sectionName: string;

  const section = posts.children.find(section => section.name === sectionName)
  updateTitle(sectionName)

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
