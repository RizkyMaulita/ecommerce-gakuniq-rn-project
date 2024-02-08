import { findCarts, upsertCart } from "@/models/cart.model";
import { ResponseType } from "@/types/response.types";
import { ServerContext } from "@/types/server.types";
import { Cart } from "@prisma/client";

export const cartTypeDefs = `#graphql
  type Cart {
    id: ID
    productId: ID 
    userId: ID
    quantity: Int
    isActive: Boolean
    product: Product
    user: User
    createdAt: String
    updatedAt: String
  }

  type Query {
    getCarts: ResponseCarts
  }

  type Mutation {
    addProductToCart(productId: ID!): ResponseCart
  }
`;

export const cartResolvers = {
  Query: {
    getCarts: async (
      _,
      _args,
      { authN }: ServerContext
    ): Promise<ResponseType<Cart[]>> => {
      const userLogin = await authN();

      const carts = await findCarts(userLogin.id);

      return {
        statusCode: 200,
        message: `Successfully retrieved data carts`,
        data: carts,
      };
    },
  },
  Mutation: {
    addProductToCart: async (
      _,
      { productId },
      { authN }: ServerContext
    ): Promise<ResponseType<Cart>> => {
      const userLogin = await authN();

      const cart = await upsertCart({ productId, userId: userLogin.id });

      return {
        statusCode: 201,
        message: `Successfully add product to cart`,
        data: cart,
      };
    },
  },
};
