<script>
  import { hoverShadows } from "$lib/constants";
  import { classMerger } from "$lib/utils";

  const inverted = new Set(['github', 'caprover'])
</script>

<footer class="flex xl:flex-col w-full xl:w-max gap-4 xl:gap-0 justify-center fixed bottom-0 xl:right-6">
  {#each [
    ["t.me/nyawoobot", `telegram`, "Telegram"],
    ["github.com/akatsukinoyami/mdBlog", `github`, "Github"],
    ["svelte.dev", `svelte`, "Svelte"],
    ["tailwindcss.com", `tailwind`, "TailwindCSS"],
    ["hetzner.com", `hetzner`, "Hetzner"],
    ["tailwindcss.com", `caprover`, "Caprover"],
  ] as [link, icon, label]}
    <a 
      href="https://{link}" 
      class={classMerger(
        "hidden md:inline mb-1 xl:mb-4 text-right",
        "text-xs grayscale-90 hover:grayscale-0 opacity-50 hover:opacity-80",
        hoverShadows
      )} 
      target="_blank"
    >
      {label} 
      <img 
        class={classMerger(
          "h-4 w-4 ml-2 inline", 
          { 'invert dark:invert-0': inverted.has(icon)}
        )} 
        src="/icons/{icon}.svg" 
        alt="{label} icon" 
      />
    </a>
  {/each}
</footer>