import { Prisma } from "@prisma/client";
import prisma from ".";

export const findCategories = async (
  queryFilter: Prisma.CategoryWhereInput
) => {
  return await prisma.category.findMany({
    where: queryFilter,
  });
};
