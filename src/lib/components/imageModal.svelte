<script lang="ts">
  const codes = new Set(['Escape', 'Return', 'Space']);

  let {
    src = $bindable<string | null>(),
    alt = $bindable<string | null>(),
    onclose = () => {}
  } = $props();

  function close() {
    src = null;
    alt = null;
    onclose();
  }

  function onkeyup(e: KeyboardEvent) {
    if (codes.has(e.code)) close();
  }
</script>

<svelte:window {onkeyup} />

{#if src}
  <div class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50" onclick={close}>
    <div class="relative max-h-[95vh] max-w-[95vh]">
      <img class="rounded-lg object-contain max-h-[95vh] max-w-[95vh] mx-auto" {src} {alt} />
      <button
        class="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 focus:outline-none"
        onclick={close}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
{/if}