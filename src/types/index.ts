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

export type TemplateType = "modern" | "classic" | "minimal" | "dark" | "bistro" | "elegant" | "vintage" | "neobrutalism" | "nature" | "asian" | "monochrome" | "playful" | "luxury" | "fiesta" | "mediterranean" | "farm" | "cyberpunk" | "parisian" | "tropical" | "korean";

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
