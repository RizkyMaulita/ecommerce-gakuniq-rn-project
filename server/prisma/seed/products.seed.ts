import prisma from "@/models";
import dataProducts, { ProductCategorySeedEnum } from "./data/products.data";
import { Prisma } from "@prisma/client";
import { generateSlug } from "@/utils/generateSlug";

(async () => {
  try {
    await prisma.$connect();
    await prisma.category.createMany({
      data: Object.keys(ProductCategorySeedEnum).map((category) => ({
        name: category,
      })),
    });

    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: Object.keys(ProductCategorySeedEnum),
        },
      },
    });

    const payloadProduct = dataProducts.map((val) => {
      const category = categories.find((ctg) => ctg.name === val.categoryName);

      delete val.categoryName;

      const product: Prisma.ProductCreateManyInput = {
        ...val,
        slug: generateSlug(val.name),
        rate: 0,
        categoryId: category?.id || null,
      };

      return product;
    });

    const countProducts = await prisma.product.createMany({
      data: payloadProduct,
    });

    console.log(
      `Successfully seeding data products with count : ${countProducts.count}`
    );
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
})();
