type Title = {
  en: string;
  kh?: string;
};

export type SubCategory = {
  id: string;
  logo?: string;
  title: Title;
};

export type Category = {
  id: string;
  logo: string;
  title: Title;
  children: SubCategory[];
};
