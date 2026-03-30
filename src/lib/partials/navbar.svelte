<script lang="ts">
	import i18n from '$lib/i18n';
	import { lang } from '$lib/stores';
	import { flex, hoverShadows } from '$lib/utils/markdownit/constants';
	import Controls from '../components/controls.svelte';

	let t = $derived(i18n($lang));
</script>

<div
	class={[
		'sticky top-0 h-12 px-5 sm:mx-2 sm:mt-2 md:mx-5 z-40',
		'sm:rounded-full sm:shadow-md',
		'ring-1 ring-gray-100 dark:ring-gray-950',
		'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xs',
		flex
	]}
>
	<a href="/" class={[flex, hoverShadows, 'mr-auto gap-2 font-semibold']}>
		<img src="/tsunya/icon-64.png" width="32" alt="icon" /> {t('title.app')}
	</a>

	<end class={[flex, 'ml-auto']}>
		<Controls />
	</end>
</div>
