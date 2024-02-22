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
