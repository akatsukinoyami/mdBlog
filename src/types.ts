type Multilang = {
  en: string; ru: string; ua: string;
}

export type Entity = {
  title: Multilang;
  post: boolean;
  date: string;
  description: string;
  text: Multilang;
  children: Entity[];
}
