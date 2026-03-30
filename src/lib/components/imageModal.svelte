<script lang="ts">
	import { closeImgModal, modal } from '$lib/utils';
	import Icon from './icon.svelte';

	const codes = new Set(['Escape', 'Return', 'Space']);

	function onkeyup(e: KeyboardEvent) {
		if (codes.has(e.code)) closeImgModal();
	}

	function onclick(e: MouseEvent) {
		if (e.target === e.currentTarget) closeImgModal();
	}

	$effect(() => {
		document.body.classList.toggle('overflow-hidden', !!modal.src);
	});
</script>

<svelte:window {onkeyup} />

<background {onclick} class={[
  "fixed inset-0 bg-black/70 backdrop-blur-xs items-center justify-center z-50",
  modal.src ? "flex" : "hidden"
]} role="none">
  <div class="relative max-h-[95vh] max-w-[95vw]">
    <img {...modal} class="rounded-lg object-contain max-h-[95vh] max-w-[95vw] mx-auto" />
    <button
      class="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 focus:outline-none"
      onclick={close}
    >
      <Icon 
        class="h-6 w-6" 
        stroke="currentColor"
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2"
        fill="none"
        path="M6 18L18 6M6 6l12 12"
      />
    </button>
  </div>
</background>