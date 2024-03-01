import { gql } from "@apollo/client";

export const ADD_PRODUCT_CART = gql`
  mutation AddProductToCart($productId: ID!) {
    addProductToCart(productId: $productId) {
      statusCode
      message
      error
      data {
        id
        isActive
        quantity
        product {
          name
          id
        }
      }
    }
  }
`;
