import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($payload: RegisterInput) {
    register(payload: $payload) {
      data {
        token
        user {
          id
          email
          username
          fullName
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      data {
        token
        user {
          id
          fullName
          username
          email
        }
      }
    }
  }
`;
