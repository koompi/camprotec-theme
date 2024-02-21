import { gql } from "@apollo/client";

export const ORDER_PRODUCT = gql`
  mutation ($input: InputOrder!) {
    storeCreateOrder(input: $input)
  }
`;
