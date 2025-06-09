<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Jellyfish } from 'svelte-loading-spinners';
	import { classMerger, getConverter, openImgModal, url } from '$lib/utils';
	import { lang } from '$lib/stores';
	import { highlight } from '$lib/utils/highlight';
	import ImageModal from '$lib/components/imageModal.svelte';
	import type { Entity } from '$lib/types';

	let { entity, path }: { entity: Entity; path: string } = $props();
	let text = $state('');
	let loading = $state(false);

	async function load(file: string): Promise<string | number> {
		return fetch(url('files', path, file))
			.then((res) => res.text())
			.then((mdPost) => (text = getConverter(path).makeHtml(mdPost)))
			.catch(error => toast.error(error.toString()));
	}

	$effect(() => {
		if (entity?.post?.includes($lang)) {
			load(`+post.${$lang}.md`)
		} else if (entity?.post?.includes('default')) {
			load(`+post.default.md`)
		} else {
			text = '';
		}
	});
</script>

<article class={["justify-center py-10", loading ? 'flex' : 'hidden']}>
	<Jellyfish color='' size=200 />
</article>

<article 
	class={classMerger("text-justify text-pretty", {
		block: !!text && !loading,
		hidden: !text || loading,
	})}
	use:highlight
	onclick={openImgModal}
>{@html text}</article>

<ImageModal />
