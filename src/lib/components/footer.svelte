<script>
  import { hoverShadows } from "$lib/constants";
  import { theme } from "$lib/stores";

  const links = $derived([
    ["t.me/nyawoobot", `telegram`, "Telegram"],
    ["github.com/akatsukinoyami/mdBlog", `github-${$theme}`, "Github"],
    ["svelte.dev", `svelte`, "Svelte"],
    ["tailwindcss.com", `tailwind`, "TailwindCSS"],
    ["hetzner.com", `hetzner`, "Hetzner"],
    ["tailwindcss.com", `caprover`, "Caprover"],
  ]);

  const linkClasses = [
    "hidden md:flex gap-3 justify-end items-center mb-1 xl:mb-4",
    "text-xs grayscale hover:grayscale-0 opacity-50 hover:opacity-80",
    hoverShadows
  ];
</script>

<footer class="
  flex xl:block 
  w-full xl:w-inherit
  gap-4 justify-center
  fixed bottom-0 xl:right-6
">
  {#each links as [link, icon, label]}
    <a class={linkClasses} href="https://{link}" target="_blank">
      {label} <img class="h-3 w-3" src="/icons/{icon}.svg" alt="{label} icon" />
    </a>
  {/each}
</footer>