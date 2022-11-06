<script lang="ts">
	import { Link } from "svelte-navigator";
  import posts from "../jsons/posts.json";
  import type DirectoryTreeFileType from "../types/directory.tree.file.type";

  export let sectionName: string;

  const section = posts.children[sectionName].children

  function nameHumanize(name: string): string {
    return name.replaceAll('_', ' ')
  }
  function link(post: DirectoryTreeFileType): string {
    return `/post/${section.name}/${post.name}`
  }
</script>

<div>
  {#each section as post}
    {#if post.hasOwnProperty('children')}
      <div class="list-group-item decoration-none text-capitalize">
        <Link to={ link(post) }>
          <i class="bi bi-file-richtext-fill"></i> { nameHumanize(post.name) }
        </Link>
      </div>
    {/if}
  {/each}
</div>
