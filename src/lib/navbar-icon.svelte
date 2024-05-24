<script lang="ts">
  export let src: string, alt="";
</script>

<div class="flex items-center">
  <div class="flex-shrink-0">
    <img class="h-8 w-auto" {src} {alt}>
  </div>
</div>