import {
  findCarts,
  getCountCarts,
  updateQtyCart,
  upsertCart,
} from "@/models/cart.model";
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
    getCountCarts: ResponseCountCart
  }

  type Mutation {
    addProductToCart(productId: ID!): ResponseCart
    updateQtyCart(id: ID!, qty: Int!): ResponseCart
    deleteCart(id: ID!): ResponseCart
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
    getCountCarts: async (
      _,
      _args,
      { authN }: ServerContext
    ): Promise<ResponseType<number>> => {
      const userLogin = await authN();
      const count = await getCountCarts(userLogin.id);

      return {
        statusCode: 200,
        message: `Successfully count data active carts`,
        data: count,
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
    updateQtyCart: async (
      _,
      { id, qty },
      { authN }: ServerContext
    ): Promise<ResponseType<Cart>> => {
      const userLogin = await authN();

      const cart = await updateQtyCart({
        id,
        userId: userLogin.id,
        qty,
      });

      return {
        statusCode: 200,
        message: `Successfully update quantity cart`,
        data: cart,
      };
    },
    deleteCart: async (
      _,
      { id },
      { authN }: ServerContext
    ): Promise<ResponseType<Cart>> => {
      const userLogin = await authN();

      const cart = await updateQtyCart({
        id,
        userId: userLogin.id,
        qty: 0,
        isDelete: true,
      });

      return {
        statusCode: 200,
        message: `Successfully delete cart`,
        data: cart,
      };
    },
  },
};
