import { get } from "svelte/store";
import { trafficEconomy } from "$lib/stores";

interface Modal {
  src: string | null;
  alt: string | null;
}
export const modal = $state<Modal>({ src: null, alt: null });

export function openImgModal(event: Event) {
  const target = event.target;
  if (!(target instanceof HTMLImageElement)) return;

  modal.src = get(trafficEconomy)
    ? target.src.replaceAll("+imagesCompressed", "+images").replace(".webp", "")
    : target.src;
  modal.alt = target.alt || "";
}

export function closeImgModal() {
  modal.src = null;
  modal.alt = null;
}
