import { PrismaClient } from "@prisma/client";
import categories from "./data/category.data";

const prisma = new PrismaClient();

export const run = async () => {
  try {
    for await (const category of categories) {
      try {
        const data = await prisma.category.upsert({
          create: category,
          update: category,
          where: {
            name: category.name,
          },
        });
        console.log(`Successfully upsert category with name ${data.name}`);
      } catch (error) {
        console.log(
          `An error occured while upsert category with name ${category.name}`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};
