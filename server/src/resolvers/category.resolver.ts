import { Resolvers } from "@/graphql/generated.resolver";
import { findCategories } from "@/models/category.model";

export const categoryResolvers: Resolvers = {
  Query: {
    getCategories: async () => {
      const categories = await findCategories({});

      return {
        statusCode: 200,
        message: `Successfully retrieved data categories`,
        data: categories,
      };
    },
  },
};
