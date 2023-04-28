<script lang="ts">
  import Card from "../Partials/Card.svelte";

  import { updateTitle } from "../../functions";

  import type { DirectoryTreeFile } from "../../types/directory.tree.file";
  import sections from "../../jsons/sections.json";

  export let sectionName: string;
  updateTitle(sectionName)

  const section = sections.find((section: DirectoryTreeFile) => section.name === sectionName);

  function getLink(post: DirectoryTreeFile): string {
    return `${section.name}/${post.name}`;
  }
</script>

<div class="row">
  {#each section.children.reverse() as post}
    <Card link={getLink(post)} card={post} />
  {/each}
</div>
