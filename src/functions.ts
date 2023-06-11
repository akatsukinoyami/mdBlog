import { get } from "svelte/store";

import { title, lang } from "./stores";
import en from "./i18n/en.json";
import ru from "./i18n/ru.json";
import ua from "./i18n/ua.json";
import type { DirectoryTreeFile } from "./types/directory.tree.file";

const langs = { en, ru, ua };

export function updateTitle(titleValue: string): string {
  title.update((_) => titleValue);

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
  return langs[language];
}

export function tTitle(post: DirectoryTreeFile, language=get(lang), func=(_: string) => {}){
  let title = post[`title_${language}`];
  if (!title) title = post.title;
  
  func(title);
  return title;
}

export function tPost(post: DirectoryTreeFile, language=get(lang), func=(_: string) => {}){
  let content = post[`content_${language}`];
  if (!content) content = post.content;
  
  func(content);
  return content;
}
