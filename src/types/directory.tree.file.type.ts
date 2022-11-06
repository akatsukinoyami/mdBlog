export default interface DirectoryTreeFileType {
  path: string;
  name: string;
  children?: DirectoryTreeFileType[];
}
