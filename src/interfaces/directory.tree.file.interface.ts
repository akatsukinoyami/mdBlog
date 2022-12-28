export default interface DirectoryTreeFileInterface {
  path: string;
  name: string;
  children?: DirectoryTreeFileInterface[];
}
