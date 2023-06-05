import { get } from "svelte/store";

import { title, lang } from "./stores";
import i18nObject from "./jsons/i18n.json";
import type { DirectoryTreeFile } from "./types/directory.tree.file";

export function updateTitle(titleValue: string): string {
  title.update((_) => nameHumanize(titleValue));

  return "";
}

export function nameHumanize(name: string): string {
  let nameArray = name.split('_')
  nameArray = nameArray.map(word => { return word[0].toUpperCase() + word.slice(1) })
  return nameArray.join(' ')
}

export function blogLink(
  section: DirectoryTreeFile,
  post: DirectoryTreeFile
): string {
  return `/blog/${section.name}/${post.name}`
}

export function toggleTheme(elements: HTMLCollectionOf<HTMLElement> | HTMLElement[], color: string): void {
  Array.from(elements).forEach((element) => {
    element.style.backgroundColor = color;
  })
}

export function i18n(language = get(lang)): Record<string, any> {
  return i18nObject[language];
}
