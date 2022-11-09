import { title } from "./stores";
import type DirectoryTreeFileType from "./types/directory.tree.file.type";

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

// <div class="list-group-item decoration-none text-capitalize">
//   <Link to={ blogLink(section, post) }>
//     <i class="bi bi-file-richtext-fill"></i> { nameHumanize(post.name) }
//   </Link>
// </div>
