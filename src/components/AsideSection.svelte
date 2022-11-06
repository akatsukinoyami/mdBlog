<script lang="ts">
	import { Link } from "svelte-navigator";
  import type DirectoryTreeFileType from "../types/directory.tree.file.type";
  export let section: DirectoryTreeFileType = { path: "", name: "" };

  function nameHumanize(name: string): string {
    return name.replaceAll('_', ' ')
  }
  function link(post: DirectoryTreeFileType): string {
    return `/blog/${section.name}/${post.name}`
  }
</script>

<div class="accordion-item">
  <h2 class="accordion-header" id="heading_{section.name}">
    <button class="accordion-button collapsed text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_{section.name}" aria-expanded="true" aria-controls="collapse_{section.name}">
      {section.name.replaceAll('_', ' ')}
    </button>
  </h2>
  <div id="collapse_{section.name}" class="accordion-collapse collapse" aria-labelledby="heading_{section.name}" data-bs-parent="#accordionExample">
    <div class="accordion-body list-group-flush">
      {#each section.children as post}
        {#if post.hasOwnProperty('children')}
          <div class="list-group-item text-capitalize">
            <Link to={ link(post) }>
              <i class="bi bi-file-richtext-fill"></i> { nameHumanize(post.name) }
            </Link>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
