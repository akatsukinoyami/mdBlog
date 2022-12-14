import { title } from "./stores";
import type DirectoryTreeFileType from "./interfaces/directory.tree.file.interface";

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
  section: DirectoryTreeFileType,
  post: DirectoryTreeFileType
): string {
  return `/blog/${section.name}/${post.name}`
}

export function toggleTheme(element: HTMLElement, oldClass: string, newClass: string): void {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}
