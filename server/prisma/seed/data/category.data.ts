import { Prisma } from "@prisma/client";
import { ProductCategorySeedEnum } from "./products.data";

const categories: Prisma.CategoryCreateInput[] = [
  {
    name: ProductCategorySeedEnum.ATASAN,
    imgUrl:
      "https://res.cloudinary.com/dxdgvvdwi/image/upload/v1708584723/E-Commerce%20Project/icon_tshirt_ma5h11.png",
  },
  {
    name: ProductCategorySeedEnum.JAKET,
    imgUrl:
      "https://res.cloudinary.com/dxdgvvdwi/image/upload/v1708584723/E-Commerce%20Project/icon_jacket_oj646v.png",
  },
  {
    name: ProductCategorySeedEnum.KEMEJA,
    imgUrl:
      "https://res.cloudinary.com/dxdgvvdwi/image/upload/v1708584723/E-Commerce%20Project/icon_cloth_nhaexk.png",
  },
  {
    name: ProductCategorySeedEnum.CARDIGAN,
    imgUrl:
      "https://res.cloudinary.com/dxdgvvdwi/image/upload/v1708584723/E-Commerce%20Project/icon_cardigan_tl8fwv.png",
  },
];

export default categories;
