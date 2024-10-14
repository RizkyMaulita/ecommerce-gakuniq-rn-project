import { Prisma } from "@prisma/client";
import prisma from ".";
import { mapPrismaProductGenderToGraphQL } from "@/graphql/utils/mapPrismaEnum";

export const findProducts = async (queryFilter: Prisma.ProductWhereInput) => {
  return (
    await prisma.product.findMany({
      where: queryFilter,
      include: { category: true },
    })
  ).map((el) => {
    return {
      ...el,
      gender: mapPrismaProductGenderToGraphQL(el.gender),
    };
  });
};

export const findProduct = async (queryFilter: Prisma.ProductWhereInput) => {
  return await prisma.product.findFirst({
    where: queryFilter,
    include: { category: true },
  });
};
