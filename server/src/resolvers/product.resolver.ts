import { Resolvers } from "@/graphql/generated.resolver";
import { findProduct, findProducts } from "@/models/product.model";
import { ResponseType } from "@/types/response.types";
import { Product } from "@prisma/client";

export const productResolvers: Resolvers = {
  Query: {
    getProducts: async (_, { categoryId }) => {
      const products = await findProducts(categoryId ? { categoryId } : {});

      return {
        statusCode: 200,
        message: `Successfully retrieved data products`,
        data: products,
      };
    },
  },
};
