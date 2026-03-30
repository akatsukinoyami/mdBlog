interface Modal {
	src: string | null;
	alt: string | null;
}

export const modal = $state<Modal>({ src: null, alt: null });

export function openImgModal(event: Event) {
	const target = event.target;
	if (!(target instanceof HTMLImageElement)) return;

	// Always show the original — if economy mode served a compressed webp, strip it back
	modal.src = target.src
		.replaceAll('+imagesCompressed', '+images')
		.replace('.webp', '');
	modal.alt = target.alt || '';
}

export function closeImgModal() {
	modal.src = null;
	modal.alt = null;
}
