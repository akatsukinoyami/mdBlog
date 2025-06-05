<script lang="ts">
	import { page } from '$app/state';
	import { lang } from '$lib/stores';
	import { url } from '$lib/utils';
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
		'bg-cover bg-center bg-no-repeat',
		'transform transition-transform duration-500 ease-in-out hover:scale-105 hover:duration-200',
		className
	]}
	href={url(page.data.path, folderName)}
	style:background-image='url("{url('files', page.data.path, folderName, 'index.jpg')}")'
	aria-label="card"
>	
	<span
		class="
      absolute bottom-3 w-full text-center
      text-shadow-[-1px_-1px_1px_var(--color-amber-50),-1px_1px_1px_var(--color-amber-50),1px_-1px_1px_var(--color-amber-50),1px_1px_1px_var(--color-amber-50)]
      dark:text-shadow-[-1px_-1px_1px_var(--color-gray-950),-1px_1px_1px_var(--color-gray-950),1px_-1px_1px_var(--color-gray-950),1px_1px_1px_var(--color-gray-950)]
    "
	>
		{entity?.title?.[$lang]}
	</span>
</a>
