import prisma from "@/models";

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
    getProducts: async (_, { categoryId }) => {
      const products = await prisma.product.findMany({
        where: categoryId ? { categoryId } : {},
        include: { category: true },
      });

      return {
        statusCode: 200,
        message: `Successfully retrieved data products`,
        data: products,
      };
    },
    getProduct: async (_, { productId }) => {
      const product = await prisma.product.findFirst({
        where: { id: productId },
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
