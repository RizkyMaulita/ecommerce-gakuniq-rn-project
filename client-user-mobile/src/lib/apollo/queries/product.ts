import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($categoryId: String) {
    getProducts(categoryId: $categoryId) {
      statusCode
      message
      error
      data {
        id
        name
        category {
          id
          name
        }
        categoryId
        imgUrl
        price
        rate
        slug
        sourceUrl
        stock
        gender
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($productId: String!) {
    getProduct(productId: $productId) {
      statusCode
      message
      error
      data {
        id
        name
        description
        slug
        imgUrl
        price
        stock
        rate
        gender
        sourceUrl
        categoryId
        category {
          id
          name
          imgUrl
          imgUrlActive
        }
        documents {
          url
          type
        }
      }
    }
  }
`;

export const GET_PRODUCT_CART_COUNT = gql`
  query GetCountCarts {
    getCountCarts {
      statusCode
      message
      error
      data
    }
  }
`;

export const GET_PRODUCT_CARTS = gql`
  query GetCarts {
    getCarts {
      statusCode
      message
      error
      data {
        id
        productId
        userId
        quantity
        isActive
        product {
          id
          name
          description
          slug
          imgUrl
          price
          stock
          rate
          gender
          sourceUrl
          categoryId
        }
        createdAt
        updatedAt
      }
    }
  }
`;
