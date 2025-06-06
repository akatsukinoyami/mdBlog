<script>
  import { hoverShadows } from "$lib/constants";
  import { theme } from "$lib/stores";

  const links = $derived([
    ["github.com/akatsukinoyami/mdBlog", `github-${$theme}`, "Github"],
    ["svelte.dev", `svelte`, "Svelte"],
    ["tailwindcss.com", `tailwind`, "TailwindCSS"],

  ])
  
</script>

<footer class="
  flex md:block 
  w-full md:w-inherit
  gap-4 justify-center
  fixed bottom-0 md:right-6
">
  {#each links as [link, icon, label]}
    <a class={["flex gap-3 justify-end items-center text-xs mb-1 md:mb-4 grayscale hover:grayscale-0 opacity-50  hover:opacity-80", hoverShadows]} href="https://{link}" target="_blank">
      {label} <img class="h-3 w-3" src="/icons/{icon}.svg" alt="{label} icon" />
    </a>
  {/each}
</footer>