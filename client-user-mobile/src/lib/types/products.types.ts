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
