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
          province
          provinceId
          city
          cityId
          subDistrict
          subDistrictId
          zipCode
          latitude
          longitude
          benchmark
          contactName
          contactPhoneNumber
          tag
          isMainAddress
        }
      }
    }
  }
`;

export const GET_MY_LIST_ADDRESS = gql`
  query GetMyListAddress {
    getMyListAddress {
      statusCode
      message
      error
      data {
        address
        province
        provinceId
        city
        cityId
        subDistrict
        subDistrictId
        zipCode
        latitude
        longitude
        benchmark
        contactName
        contactPhoneNumber
        tag
        isMainAddress
      }
    }
  }
`;

export const ADD_MY_ADDRESS = gql`
  mutation AddMyAddress($payload: AdressInput) {
    addMyAddress(payload: $payload) {
      statusCode
      message
      error
      data {
        id
        username
        email
        addresses {
          address
          province
          provinceId
          city
          cityId
          subDistrict
          subDistrictId
          zipCode
          latitude
          longitude
          benchmark
          contactName
          contactPhoneNumber
          tag
          isMainAddress
        }
      }
    }
  }
`;
