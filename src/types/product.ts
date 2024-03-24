export interface Attribute {
  type: string;
  option: string;
}
export interface Variants {
  id: string;
  label: string;
  default: boolean;
  previews: string;
  price: number;
  attributes: Attribute[];
}

export type ItemProduct = {
  thumbnail?: any;
  variant?: Variants;
  title?: string;
  id: string;
  name: string;
  price: number;
  currency: "KHR" | "USD";
  preview: string;
  slug?: string;
  variantId?: string | null;
};

export type ProductType = {
  id: string;
  title: string;
  thumbnail: string;
  rating: number;
  brand: string;
  currency: "KHR" | "USD";
  price: number;
  slug: string;
  previews: string[];
  tags: string[];
  quantity: number;
  variants: Variants[];
  sell: number;
  desc: string;
  detail: string;
  createdAt: string;
};

// dynamic types
export type HeaderType = {
  logo: string;
  name: string;
  type: boolean;
};
