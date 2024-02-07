import prisma from "@/models";

export const categoryTypeDefs = `#graphql
  type Category {
    id: ID
    name: String
  }

  type Query {
    getCategories: ResponseCategories
  }
`;

export const categoryResolvers = {
  Query: {
    getCategories: async () => {
      const categories = await prisma.category.findMany();

      return {
        statusCode: 200,
        message: `Successfully retrieved data categories`,
        data: categories,
      };
    },
  },
};
