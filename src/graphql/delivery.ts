import { gql } from "@apollo/client";

export const DELIVERIES = gql`
  query {
    deliveries {
      id
      firstName
      lastName
      email
      address
      phoneNumber
      createdAt
      updatedAt
      photos
    }
  }
`;

export const DELIVERIES_EXPRESS = gql`
  query {
    storeDeliveriesExpress {
      city
      name
      logo
      id
      price
      shipping
      kilometer
      email
      currency
      express
      phoneNumber
    }
  }
`;

export const CUSTOMER_ADDRESS = gql`
  query {
    storeAddress {
      addressName
      firstName
      id
      lastName
      lat
      lng
      ownerId
      phoneNumber
      photos
    }
  }
`;
