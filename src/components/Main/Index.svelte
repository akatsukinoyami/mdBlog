<script lang="ts">
  import Post from "./Post.svelte";
  import Card from "../Partials/Card.svelte";
  import { i18n, updateTitle } from "../../functions";
  import sections from "../../jsons/sections.json";

  updateTitle(i18n('mainTitle'))
</script>

<Post link="/page/index" />
<div class="row">
  {#each sections as section}
    {#if section?.children}
      <Card link={section.name} card={section} />
    {/if}
  {/each}
</div>
