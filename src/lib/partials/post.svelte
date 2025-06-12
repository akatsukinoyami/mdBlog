<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { getConverter, openImgModal, url } from '$lib/utils';
	import { lang } from '$lib/stores';
	import { highlight } from '$lib/utils/highlight';
	import ImageModal from '$lib/components/imageModal.svelte';
	import { Circle1 } from '$lib/components/spinners';
	import type { Entity } from '$lib/types';

	let { entity, path }: { entity: Entity; path: string } = $props();

	async function loadPost(file: string | null): Promise<string | number | undefined> {
		if (!file) return;

		return fetch(url(['files', path, file]))
			.then((res) => res.text())
			.then((mdPost) => getConverter(path).makeHtml(mdPost))
			.catch(error => toast.error(error.toString()));
	}
</script>

{#await loadPost(entity?.post?.includes($lang) ? `+post.${$lang}.md` : entity?.post?.includes('default') ? `+post.default.md` : null)}
	<article class="flex justify-center w-full py-20">
		<Circle1 />
	</article>
{:then post}
	{#if post}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<article class="text-justify text-pretty" use:highlight onclick={openImgModal} role="complementary">
			{@html post}
		</article>
		<ImageModal />
	{/if}
{/await}

