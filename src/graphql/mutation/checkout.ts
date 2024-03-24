import { gql } from "@apollo/client";

export const CHECKOUT = gql`
  mutation (
    $input: InputOrder!
    $deliveryId: String!
    $addressId: String!
    $payment: PaymentType!
  ) {
    storeCreateCheckouts(
      input: $input
      deliveryId: $deliveryId
      addressId: $addressId
      payment: $payment
    )
  }
`;
