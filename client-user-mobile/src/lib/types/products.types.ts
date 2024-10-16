import { UserType } from "./users.types";

export type ProductType = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  imgUrl: string;
  price: number;
  stock: number;
  rate?: number;
  gender: ProductGenderEnum;
  categoryId?: string;
  category?: CategoryType;
};

export enum ProductGenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNISEX = "UNISEX",
}

export type CategoryType = {
  id: string;
  name: string;
  imgUrl?: string;
  imgUrlActive?: string;
};

export type ProductReviewType = {
  id: string;
  context: string;
  rate: number;
  productId: string;
  userId: string;
  user?: UserType;
  createdAt: Date | string;
};

export type ProductCartType = {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  isActive: boolean;
  createdAt: Date | string;
  product: ProductType;
};
