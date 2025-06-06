<script>
  import { hoverShadows } from "$lib/constants";
  import { theme } from "$lib/stores";

  const links = $derived([
    ["github.com/akatsukinoyami/mdBlog", `github-${$theme}`, "Github"],
    ["svelte.dev", `svelte`, "Svelte"],
    ["tailwindcss.com", `tailwind`, "TailwindCSS"],

  ])
  
</script>

<footer class="flex justify-center fixed bottom-0 items-center justify-center w-full">
  <nav class="inline-flex gap-10 px-10 pb-1 pt-2 shadow-2xl/30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xs rounded-t-xl opacity-50 hover:opacity-100">
    {#each links as [link, icon, label]}
      <a class={["flex gap-3 items-center text-xs", hoverShadows]} href="https://{link}" target="_blank">
        <img class="h-3 w-3" src="/icons/{icon}.svg" alt="{label} icon" />{label}
      </a>
    {/each}
  </nav>
</footer>