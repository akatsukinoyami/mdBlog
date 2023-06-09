export type DirectoryTreeFile = {
  path: string;
  name: string;
  children?: DirectoryTreeFile[];
  description?: string;
  title?: string;
  title_en?: string;
  title_ru?: string;
  title_ua?: string;
  content?: string;
  content_en?: string;
  content_ru?: string;
  content_ua?: string;
  date?: string;
}
