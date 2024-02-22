import { Prisma, PrismaClient } from "@prisma/client";
import dataProductShirts from "./data/productShirt.data";
import { ProductCategorySeedEnum } from "./data/products.data";
import { generateSlug } from "@/utils/generateSlug";

const prisma = new PrismaClient();

export const run = async () => {
  try {
    // write your code here
    const category = await prisma.category.findFirst({
      where: {
        name: ProductCategorySeedEnum.KEMEJA,
      },
    });

    const products = await prisma.product.createMany({
      data: dataProductShirts.map((val) => {
        delete val.categoryName;

        const product: Prisma.ProductCreateManyInput = {
          ...val,
          slug: generateSlug(val.name),
          rate: 0,
          categoryId: category?.id || null,
        };

        return product;
      }),
    });

    console.log(
      `Successfully seeding data products with count : ${products.count}`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
