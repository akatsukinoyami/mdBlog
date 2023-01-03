<script lang="ts">
  import posts from "../../jsons/posts.json";
  import Post from "./Post.svelte";
  import Card from "../Partials/Card.svelte";
  import LinkPreviewHead from "../Partials/LinkPreviewHead.svelte";
  import { updateTitle } from "../../functions";
  import titles from "../../jsons/titles.json";

  updateTitle(titles.mainTitle)

  const title = titles.mainTitle;
  const description = "Small private blog of Katsu Dev."
</script>

<LinkPreviewHead {title} {description} />
<Post link="/page/index" />
<div class="row mt-4">
  {#each posts.children as section}
    {#if section?.children}
      <Card link={section.name} card={section} />
    {/if}
  {/each}
</div>
