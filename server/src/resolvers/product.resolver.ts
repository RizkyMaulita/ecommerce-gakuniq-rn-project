import { Resolvers } from "@/graphql/generated.resolver";
import { findProduct, findProducts } from "@/models/product.model";

export const productResolvers: Resolvers = {
  Query: {
    getProducts: async (_, { categoryId }) => {
      const products = await findProducts({
        queryFilter: categoryId ? { categoryId } : undefined,
        include: { category: true },
      });

      return {
        statusCode: 200,
        message: `Successfully retrieved data products`,
        data: products,
      };
    },
    getProduct: async (_, { productId }) => {
      const product = await findProduct({
        queryFilter: { id: productId },
        include: { category: true },
      });

      return {
        statusCode: 200,
        message: `Successfully retrieved data product`,
        data: product,
      };
    },
  },
};
