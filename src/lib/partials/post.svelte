<script lang="ts">
	import showdown from 'showdown';
	import { toast } from 'svelte-sonner';
	import { Jellyfish } from 'svelte-loading-spinners';
	import { url } from '$lib/utils';
	import { lang } from '$lib/stores';
	import { showdownExtensions } from '$lib/showdown.config';
	import { highlight } from '../highlight';
	import ImageModal from '$lib/components/imageModal.svelte';
	import type { Entity } from '$lib/types';

	let { entity, path }: { entity: Entity; path: string } = $props();
	let text = $state('');
	let modalSrc = $state<string | null>(null);
	let modalAlt = $state<string | null>(null);
	let loading = $state(false);

	async function load(file: string): Promise<string | number> {
		const converter = new showdown.Converter({
			tables: true,
			ghCodeBlocks: true,
			simpleLineBreaks: true,
			strikethrough: true,
			extensions: [
				...showdownExtensions,
				{
					type: 'output',
					regex: /\+images\//g,
					replace: url('files', path, `+images/`)
				}
			]
		});

		return fetch(url('files', path, file))
			.then((res) => res.text())
			.then((mdPost) => (text = converter.makeHtml(mdPost)))
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

	function handleClick(event: Event) {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
		
    modalSrc = target.src
    modalAlt = target.alt || ""
  }
</script>

{#if loading}
	<article class="flex justify-center py-10">
		<Jellyfish color='' size=200 />
	</article>
{:else if text}
	<article class="text-justify text-pretty" onclick={handleClick} use:highlight>
		{@html text}
	</article>

	<ImageModal bind:src={modalSrc} bind:alt={modalAlt} />
{/if}
