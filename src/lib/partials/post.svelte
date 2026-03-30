<script lang="ts">
	import { toast } from 'svelte-sonner';
	import ImageModal from '$lib/components/imageModal.svelte';
	import { Circle1 } from '$lib/components/spinners';
	import { lang, trafficEconomy } from '$lib/stores';
	import { type Entity, type Post } from '$lib/types';
	import { url } from '$lib/utils';
	import { highlight } from '$lib/utils/highlight';
	import { openImgModal } from '$lib/utils/imgModal.svelte';
	import { getConverter } from '$lib/utils/markdownit';

	let { entity, path }: { entity: Entity; path: string } = $props();

	async function loadPost(
		post: Post[] | null,
		economy = $trafficEconomy
	): Promise<string | number | undefined> {
		if (!post) return;

		const filename = post?.includes($lang)
			? `+post.${$lang}.md`
			: post?.includes('default')
				? `+post.default.md`
				: null;

		if (!filename) return;

		return fetch(url(['files', path, filename]))
			.then((res) => res.text())
			.then((mdPost) => getConverter(path, economy === 'true').makeHtml(mdPost))
			.catch((error) => toast.error(error.toString()));
	}
</script>

{#await loadPost(entity?.post, $trafficEconomy)}
	<article class="flex justify-center w-full py-20">
		<Circle1 />
	</article>
{:then post}
	{#if post}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<article
			class="text-justify text-pretty"
			use:highlight
			onclick={openImgModal}
			role="complementary"
		>
			{@html post}
		</article>
		<ImageModal />
	{/if}
{/await}
