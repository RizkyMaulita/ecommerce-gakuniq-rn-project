import { gql } from "@apollo/client";

export const UPSERT_ORDER = gql`
  mutation UpsertOrder($payload: CreateOrderInput!) {
    upsertOrder(payload: $payload) {
      statusCode
      message
      error
      data {
        id
        userId
        totalPrice
        status
      }
    }
  }
`;
