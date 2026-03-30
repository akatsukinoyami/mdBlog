import { type Entity } from '../types';

export { classMerger } from './classMerger';
export { clickOutside } from './clickOutside';
export { highlight } from './highlight';
export { closeImgModal, modal, openImgModal } from './imgModal.svelte';
export { getConverter } from './showdown';
export { fromStorage } from './stores';
export { bgUrl, url } from './url';

export function range(n: number): number[] {
	return [...Array(n).keys()];
}

export function getChild(current: Entity | undefined, segment: string) {
	return current?.children?.[segment];
}

export function getEntityByPath(root: Entity, path: string): Entity | undefined {
	return path.split('/').filter(Boolean).reduce(getChild, root);
}
