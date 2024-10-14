import { findCategories } from "@/models/category.model";
import { ResponseType } from "@/types/response.types";
import { Category } from "@prisma/client";

export const categoryTypeDefs = `#graphql
  type Category {
    id: ID
    name: String
    imgUrl: String
    imgUrlActive: String
  }

  type Query {
    getCategories: ResponseCategories
  }
`;

export const categoryResolvers = {
  Query: {
    getCategories: async (): Promise<ResponseType<Category[]>> => {
      const categories = await findCategories({});

      return {
        statusCode: 200,
        message: `Successfully retrieved data categories`,
        data: categories,
      };
    },
  },
};
