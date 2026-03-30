<script lang="ts">
	import { page } from "$app/state";
	import { lang } from "$lib/stores";
	import { type Class, type Entity } from "$lib/types";
	import { bgUrl, url } from "$lib/utils";
	import { textStroke } from "$lib/utils/markdownit/constants";

	interface Props extends Record<string, unknown> {
		folderName: string;
		entity: Entity;
		class?: Class;
	}

	let { class: className, folderName, entity, ...props }: Props = $props();
</script>

<a
	{...props}
	class={[
		"relative block h-60 rounded-xl",
		"bg-cover bg-center bg-no-repeat",
		"transform transition-transform duration-500 ease-in-out hover:scale-105 hover:duration-200",
		className,
	]}
	href={url([page.data.path, folderName])}
	style:background-image={bgUrl([
		"files",
		page.data.path,
		folderName,
		"index.jpg",
	])}
	aria-label="card"
>
	<span class={["absolute bottom-3 w-full text-center px-1", textStroke]}>
		{entity?.title?.[$lang]}
	</span>
</a>
