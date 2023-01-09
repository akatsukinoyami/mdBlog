<script lang="ts">
  import type DirectoryTreeFileInterface from "../../interfaces/directory.tree.file.interface";
	import { links } from "svelte-navigator";
  import { blogLink, nameHumanize } from "../../functions";
  export let section: DirectoryTreeFileInterface = { path: "", name: "" };
</script>

<div class="accordion-item">
  <h2 class="accordion-header d-flex justify-content-between align-items-center" id="heading_{section.name}">
    <button class="accordion-button collapsed text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_{section.name}" aria-expanded="true" aria-controls="collapse_{section.name}">
      {section.name.replaceAll('_', ' ')}
    </button>
    <!-- svelte-ignore a11y-missing-content -->
    <a class="bi bi-rss-fill rss fs-5 text-warning-emphasis" href="/blog/{section.name}/feed.xml" />
  </h2>
  <div id="collapse_{section.name}" class="accordion-collapse collapse" aria-labelledby="heading_{section.name}" data-bs-parent="#accordionExample">
    <div class="accordion-body list-group-flush" use:links>
      {#each section.children as post}
        {#if post?.children}
          <a href={ blogLink(section, post) } class="list-group-item link my-3">
            <i class="bi bi-file-richtext-fill"></i>
            <span class="text-capitalize"> { nameHumanize(post.name) } </span>
          </a>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style lang="sass">
  a
    text-decoration: none
    color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity))

    &:hover
      cursor: pointer
      color: var(--bs-blue)

  .rss
    transition: 0.1s

    &:hover
      transform: scale(1.03)
      shadow: 0 0 2px rgba(0,0,0, 0.3)
</style>
