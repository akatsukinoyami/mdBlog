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

export function i18n(link: string, language = get(lang)): string {
  try {
    const words = i18nObject[language];
    let result: any = words;

    link.split('.').forEach(word => result = result[word])

    return result;

  } catch (error) {
    console.error(error);
    return `No translation for: ${link}`;
  }
}
