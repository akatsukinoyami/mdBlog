<script lang="ts">
  import { Link } from "svelte-navigator";
  import { updateTitle } from "../functions";
  import posts from "../jsons/posts.json";
  import BlogPostCard from "./BlogPostCard.svelte";

  export let sectionName: string;

  const section = posts.children.find(section => section.name === sectionName)
  updateTitle(sectionName)
</script>

<div class="row">
  {#each section.children as post}
    {#if post.hasOwnProperty('children')}
      <BlogPostCard {section} {post} />
    {/if}
  {/each}
</div>
