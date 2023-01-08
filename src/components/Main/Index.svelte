<script lang="ts">
  import posts from "../../jsons/posts.json";
  import Post from "./Post.svelte";
  import Card from "../Partials/Card.svelte";
  import LinkPreviewHead from "../Partials/LinkPreviewHead.svelte";
  import { updateTitle } from "../../functions";
  import i18n from "../../jsons/i18n.json";

  updateTitle(i18n.mainTitle)

  const title = i18n.mainTitle;
  const description = i18n.fallbackDescription;
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
