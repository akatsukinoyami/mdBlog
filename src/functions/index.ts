import { get } from "svelte/store";

import { title } from "../stores";
import { lang } from "../stores/settings";
import type { DirectoryTreeFile } from "../types/directory.tree.file";

export function updateTitle(titleValue: string): void {
  title.update((_) => titleValue);
}

export function setTitle(
  post: DirectoryTreeFile, 
  language=get(lang), 
  func=(_: string) => {}
): string {

  let title = post[`title_${language}`];
  if (!title) title = post.title;
  
  func(title);
  return title;
}
