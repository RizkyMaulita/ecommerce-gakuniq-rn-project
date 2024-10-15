import { Prisma } from "@prisma/client";
import prisma from ".";

type QueryProductParamsType = {
  queryFilter?: Prisma.ProductWhereInput;
  excludeFields?: Prisma.ProductOmit;
  limit?: number;
  offset?: number;
  include?: Prisma.ProductInclude;
};

export const findProducts = async ({
  queryFilter,
  include,
}: QueryProductParamsType) => {
  return await prisma.product.findMany({
    where: queryFilter,
    include,
  });
};

export const findProduct = async ({
  queryFilter,
  include,
}: QueryProductParamsType) => {
  return await prisma.product.findFirst({
    where: queryFilter,
    include,
  });
};
