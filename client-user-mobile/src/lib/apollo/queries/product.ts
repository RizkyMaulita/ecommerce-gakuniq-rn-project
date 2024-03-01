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
