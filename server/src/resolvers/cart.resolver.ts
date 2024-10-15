import { Resolvers, Cart } from "@/graphql/generated.resolver";
import {
  findUserCarts,
  getCountUserCarts,
  updateQtyUserCart,
  upsertUserCart,
} from "@/models/cart.model";

export const cartResolvers: Resolvers = {
  Query: {
    getCarts: async (_, _args, { authN }) => {
      const userLogin = await authN();

      const carts = await findUserCarts(userLogin.id);

      return {
        statusCode: 200,
        message: `Successfully retrieved data carts`,
        data: carts as Cart[],
      };
    },
    getCountCarts: async (_, _args, { authN }) => {
      const userLogin = await authN();

      const count = await getCountUserCarts(userLogin.id);

      return {
        statusCode: 200,
        message: `Successfully count data active carts`,
        data: count,
      };
    },
  },
  Mutation: {
    addProductToCart: async (_, { productId }, { authN }) => {
      const userLogin = await authN();

      const cart = await upsertUserCart({ productId, userId: userLogin.id });

      return {
        statusCode: 201,
        message: `Successfully add product to cart`,
        data: cart as Cart,
      };
    },
    updateQtyCart: async (_, { id, qty }, { authN }) => {
      const userLogin = await authN();

      const cart = await updateQtyUserCart({
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
    deleteCart: async (_, { id }, { authN }) => {
      const userLogin = await authN();

      const cart = await updateQtyUserCart({
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
