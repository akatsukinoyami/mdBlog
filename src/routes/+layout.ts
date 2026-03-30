import { toast } from 'svelte-sonner';
import yaml from 'yaml';

export async function load({ fetch }) {
	const entity = await fetch(`/posts.yaml`)
		.then((res) => res.text())
		.then((text) => yaml.parse(text))
		.catch((error) => toast.error('Error', { description: error.toString() }));

	return { entity, path: '' };
}
