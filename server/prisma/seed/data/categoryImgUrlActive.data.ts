import { Prisma } from "@prisma/client";
import { ProductCategorySeedEnum } from "./products.data";

const categories: Prisma.CategoryCreateInput[] = [
  {
    name: ProductCategorySeedEnum.ATASAN,
    imgUrlActive:
      "https://res.cloudinary.com/dxdgvvdwi/image/upload/v1708617642/E-Commerce%20Project/icon_tshirt_active_hnfufi.png",
  },
  {
    name: ProductCategorySeedEnum.JAKET,
    imgUrlActive:
      "https://res.cloudinary.com/dxdgvvdwi/image/upload/v1708617641/E-Commerce%20Project/icon_jacket_active_kkgpob.png",
  },
  {
    name: ProductCategorySeedEnum.KEMEJA,
    imgUrlActive:
      "https://res.cloudinary.com/dxdgvvdwi/image/upload/v1708617641/E-Commerce%20Project/icon_cloth_active_a1um8v.png",
  },
  {
    name: ProductCategorySeedEnum.CARDIGAN,
    imgUrlActive:
      "https://res.cloudinary.com/dxdgvvdwi/image/upload/v1708617642/E-Commerce%20Project/icon_cardigan_active_pehlvz.png",
  },
];

export default categories;
