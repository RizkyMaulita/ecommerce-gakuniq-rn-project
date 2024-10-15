import { Prisma } from "@prisma/client";
import prisma from ".";

type QueryCategoryParamsType = {
  queryFilter?: Prisma.CategoryWhereInput;
  excludeFields?: Prisma.CategoryOmit;
  limit?: number;
  offset?: number;
  include?: Prisma.CategoryInclude;
};

export const findCategories = async ({
  queryFilter,
}: QueryCategoryParamsType) => {
  return await prisma.category.findMany({
    where: queryFilter,
  });
};
