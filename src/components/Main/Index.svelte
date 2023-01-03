<script lang="ts">
  import posts from "../../jsons/posts.json";
  import Card from "../Card.svelte";
  import Post from "./Post.svelte";
  import LinkPreviewHead from "../LinkPreviewHead.svelte";
  import { updateTitle } from "../../functions";
  import titles from "../../jsons/titles.json";

  updateTitle(titles.mainTitle)

  const title = titles.mainTitle;
  const description = "Small private blog of Katsu Dev."
  const imgUrl = "/favicon.ico"
</script>

<LinkPreviewHead {title} {description} {imgUrl} />
<Post link="/page/index" />
<div class="row mt-4">
  {#each posts.children as section}
    {#if section?.children}
      <Card link={section.name} card={section} />
    {/if}
  {/each}
</div>
