<script lang="ts">
  let {
    size = 100, 
    height = size,
    width = size,
  } = $props();
</script>

<span 
  class={[
    "relative animate-spin",
    "before:content-[''] before:absolute before:shadow-[0_0_10px_2px_rgba(0,0,0,0.3)_inset] before:rounded-[50%] before:inset-0",
    "after:content-[''] after:absolute after:shadow-[0_0_10px_2px_rgba(0,0,0,0.3)_inset] after:rounded-full after:inset-0",
    "after:shadow-[0_2px_0_#973c00_inset] dark:after:shadow-[0_2px_0_#fff_inset] after:animate-[rotate_2s_linear_infinite]",
  ]}
  style:height="{height}px"
  style:width="{width}px"
></span>