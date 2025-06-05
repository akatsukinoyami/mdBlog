export async function load({ parent, params }) {
	const { entity } = await parent();

	return {
		entity,
		path: params?.post || ''
	};
}
