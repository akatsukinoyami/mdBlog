<script lang="ts">
  import posts from "../../jsons/posts.json";
  import PostCard from "./PostCard.svelte";
  import { updateTitle } from "../../functions";

  export let sectionName: string;

  const section = posts.children.find(section => section.name === sectionName)
  updateTitle(sectionName)
</script>

<div class="row">
  {#each section.children as post}
    {#if post.hasOwnProperty('children')}
      <PostCard {section} {post} />
    {/if}
  {/each}
</div>
