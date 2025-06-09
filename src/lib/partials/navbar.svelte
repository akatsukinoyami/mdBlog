<script lang="ts">
	import { mdiCog } from '@mdi/js';
	import { flex, hoverShadows } from '$lib/constants';
	import { lang } from '$lib/stores';
	import i18n from '$lib/i18n';
	import Icon from '../components/icon.svelte';

  let t = $derived(i18n($lang));
</script>

<div
	class={[
		'sticky top-0 h-12 px-5 sm:mx-2 sm:mt-2 md:mx-5 z-40',
		'sm:rounded-full sm:shadow-md',
		'ring ring-1 ring-gray-100 dark:ring-gray-950',
		'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xs',
		flex
	]}
>
	<a href="/" class={[flex, hoverShadows, 'mr-auto gap-2 font-semibold']}>
		<img src="/icon-64.png" width="32" alt="icon" /> {t('title.app')}
	</a>

	<end class={[flex, 'ml-auto gap-4']}>
		<a class="opacity-50 hover:opacity-80" href="/settings"><Icon path={mdiCog} /></a>
	</end>
</div>
