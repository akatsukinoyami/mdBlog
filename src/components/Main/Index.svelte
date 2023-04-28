<script lang="ts">
  import posts from "../../jsons/posts.json";
  import Post from "./Post.svelte";
  import Card from "../Partials/Card.svelte";
  import { updateTitle } from "../../functions";
  import i18n from "../../jsons/i18n.json";

  updateTitle(i18n.mainTitle)
</script>

<Post link="/page/index" />
<div class="row">
  {#each posts.children as section}
    {#if section?.children}
      <Card link={section.name} card={section} />
    {/if}
  {/each}
</div>
