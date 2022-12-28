<script lang="ts">
  import Section from "./Section.svelte";
  import sections from "../../jsons/posts.json";
</script>

<div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h4 class="offcanvas-title" id="offcanvasRightLabel">Posts</h4>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="accordion accordion-flush " id="accordionExample">
      {#each sections.children as section (section.name)}
        {#if section.hasOwnProperty('children')}
          <Section section={section} />
        {/if}
      {/each}
    </div>
  </div>
</div>
