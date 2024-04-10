import { gql } from "@apollo/client";

export const CONFIRM_ORDER = gql`
  mutation ($orderId: String!) {
    storeConfirmOrder(orderId: $orderId)
  }
`;
