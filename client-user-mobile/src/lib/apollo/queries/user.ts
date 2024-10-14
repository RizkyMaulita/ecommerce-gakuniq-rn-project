import { gql } from "@apollo/client";

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    getMyProfile {
      statusCode
      message
      error
      data {
        id
        username
        email
        password
        fullName
        imgUrl
        phoneNumber
        dob
        statusVerify
        addresses {
          address
          provinceId
          cityId
          subDistrictId
          zipCode
          latitude
          longitude
          benchmark
          contactName
          phoneNumber
          tag
          isMainAddress
        }
        roleId
        createdAt
        updatedAt
      }
    }
  }
`;
