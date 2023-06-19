import { get } from "svelte/store";

import { title, lang } from "../stores";
import type { DirectoryTreeFile } from "../types/directory.tree.file";

export function updateTitle(titleValue: string): void {
  title.update((_) => titleValue);
}

export function tTitle(
  post: DirectoryTreeFile, 
  language=get(lang), 
  func=(_: string) => {}
): string {

  let title = post[`title_${language}`];
  if (!title) title = post.title;
  
  func(title);
  return title;
}
