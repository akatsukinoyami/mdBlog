<script lang="ts">
  import Card from "../Partials/Card.svelte";

  import posts from "../../jsons/posts.json";
  import i18n from "../../jsons/i18n.json";
  import { nameHumanize, updateTitle } from "../../functions";

  import type DirectoryTreeFileInterface from "../../interfaces/directory.tree.file.interface";

  export let sectionName: string;
  updateTitle(sectionName)

  const section = posts.children.find(section => section.name === sectionName);

  function getLink(post: DirectoryTreeFileInterface): string {
    return `${section.name}/${post.name}`;
  }
</script>

<div class="row">
  {#each section.children.reverse() as post}
    {#if post?.children}
      <Card link={getLink(post)} card={post} />
    {/if}
  {/each}
</div>
