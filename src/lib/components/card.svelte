<script lang="ts">
	import { page } from '$app/state';
	import { lang } from '$lib/stores';
	import { url, bgUrl } from '$lib/utils';
	import { textStroke } from '$lib/constants';
	import type { Entity } from '$lib/types';

	interface Props extends Record<string, unknown> {
		folderName: string;
		entity: Entity;
		class?: string;
	}

	let { class: className, folderName, entity, ...props }: Props = $props();
</script>

<a
	{...props}
	class={[
		'relative block h-60 rounded-xl',
		'bg-cover bg-center bg-no-repeat dark:brightness-60 dark:contrast-200',
		'transform transition-transform duration-500 ease-in-out hover:scale-105 hover:duration-200',
		className
	]}
	href={url(page.data.path, folderName)}
	style:background-image={bgUrl('files', page.data.path, folderName, 'index.jpg')}
	aria-label="card"
>	
	<span class={["absolute bottom-3 w-full text-center px-1", textStroke]}>
		{entity?.title?.[$lang]}
	</span>
</a>
