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

export const UPDATE_QTY_PRODUCT_CART = gql`
  mutation UpdateQtyCart($id: ID!, $qty: Int!) {
    updateQtyCart(id: $id, qty: $qty) {
      statusCode
      message
      error
      data {
        id
        quantity
        isActive
        updatedAt
      }
    }
  }
`;

export const DELETE_PRODUCT_CART = gql`
  mutation DeleteCart($id: ID!) {
    deleteCart(id: $id) {
      statusCode
      message
      error
      data {
        id
        productId
        userId
        quantity
        isActive
      }
    }
  }
`;
