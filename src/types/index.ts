export interface User {
  id: string;
  username: string;
  email: string;
}

export interface MenuItem {
  category: string;
  name: string;
  price: number;
  image?: string;
}

export type TemplateType = "modern" | "classic" | "elegant" | "neobrutalism" | "nature" | "farm" | "rimberio";

export interface Menu {
  _id: string;
  userId: string;
  title: string;
  template: TemplateType;
  categories: string[];
  items: MenuItem[];
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}
