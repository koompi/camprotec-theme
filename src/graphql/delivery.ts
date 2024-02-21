import { gql } from "@apollo/client";

export const CREATE_DELIVERY = gql`
  mutation ($input: InputDelivery!) {
    storeCreateDelivery(input: $input)
  }
`;

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
