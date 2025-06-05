<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		key: string;
		value: unknown;
		clearItem?: () => void;
		clearAll?: () => void;
		onsave?: () => void;
		onupdate?: (props: Record<string, typeof value>) => void;
	}

	let {
		key = 'local-storage-key',
		value = $bindable(''),
		onsave = () => {},
		onupdate = () => {}
	}: Props = $props();

	let prevValue = value;

	function setItem(value: unknown): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	onMount(() => {
		const item = localStorage.getItem(key);

		if (item != null) {
			try {
				value = JSON.parse(item);
			} catch {
				value = item;
			}
		} else {
			setItem(value);
			onsave();
		}
	});

	$effect(() => {
		if (prevValue !== value) {
			setItem(value);
			onupdate({ prevValue, value });
		}

		prevValue = value;
	});
</script>
