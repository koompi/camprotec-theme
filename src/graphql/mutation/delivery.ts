import { gql } from "@apollo/client";

export const CREATE_CUSTOMER_LOCATION = gql`
  mutation ($input: InputDelivery!) {
    storeCreateAddress(input: $input)
  }
`;
