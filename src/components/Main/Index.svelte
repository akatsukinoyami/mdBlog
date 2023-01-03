<script lang="ts">
  import posts from "../../jsons/posts.json";
  import Card from "../Card.svelte";
  import Post from "./Post.svelte";
  import { updateTitle } from "../../functions";

  let titleValue: string = "Katsu's Nikki";

  updateTitle(titleValue)
</script>

<Post link="/page/index" />
<div class="row mt-4">
  {#each posts.children as section}
    {#if section?.children}
      <Card link={section.name} card={section} />
    {/if}
  {/each}
</div>
