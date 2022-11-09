<script lang="ts">
  import type DirectoryTreeFileType from "../types/directory.tree.file.type";
  import { nameHumanize } from "../functions";

  export let
    section: DirectoryTreeFileType,
    post: DirectoryTreeFileType;

  const postName = nameHumanize(post.name);
</script>

<div class="card m-1 p-1">
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src="/blog/{section.name}/{post.name}/index.jpg" alt="Card image for post {postName}.">
  <div class="card-body">
    <h5 class="card-title">{postName}</h5>
    <a href="/blog/{section.name}/{post.name}/" class="btn btn-primary">post</a>
  </div>
</div>

<style lang="sass">
  img
    max-width: 300px
    max-height: 160px

  .card
    width: 32%
</style>
