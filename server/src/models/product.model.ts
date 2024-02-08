import { Prisma } from "@prisma/client";
import prisma from ".";

export const findProducts = async (queryFilter: Prisma.ProductWhereInput) => {
  return await prisma.product.findMany({
    where: queryFilter,
    include: { category: true },
  });
};

export const findProduct = async (queryFilter: Prisma.ProductWhereInput) => {
  return await prisma.product.findFirst({
    where: queryFilter,
    include: { category: true },
  });
};
