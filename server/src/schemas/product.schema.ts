import { findProduct, findProducts } from "@/models/product.model";
import { ResponseType } from "@/types/response.types";
import { Product } from "@prisma/client";

export const productTypeDefs = `#graphql
  type Product {
    id: ID
    name: String
    description: String
    slug: String
    imgUrl: String
    price: Int
    stock: Int
    rate: Float
    gender: ProductGenderEnum
    sourceUrl: String
    categoryId: String
    category: Category
    documents: [ProductDoc]
  }

  type ProductDoc {
    url: String
    type: ProductDocTypeEnum
  }

  enum ProductDocTypeEnum {
    VIDEO
    IMAGE
  }

  enum ProductGenderEnum {
    MALE
    FEMALE
    UNISEX
  }

  type Query {
    getProducts(categoryId: String): ResponseProducts
    getProduct(productId: String!): ResponseProduct
  }
`;

export const productResolvers = {
  Query: {
    getProducts: async (
      _,
      { categoryId }
    ): Promise<ResponseType<Product[]>> => {
      const products = await findProducts(categoryId ? { categoryId } : {});

      return {
        statusCode: 200,
        message: `Successfully retrieved data products`,
        data: products,
      };
    },
    getProduct: async (_, { productId }): Promise<ResponseType<Product>> => {
      const product = await findProduct({ id: productId });

      return {
        statusCode: 200,
        message: `Successfully retrieved data product`,
        data: product,
      };
    },
  },
};
