import { gql } from "@apollo/client";

export const CHECKOUT = gql`
  mutation (
    $locationId: String!
    $deliveryType: DeliveryType!
    $payment: PaymentType!
    $body: BodyOrder!
  ) {
    storeCreateCheckout(
      locationId: $locationId
      deliveryType: $deliveryType
      payment: $payment
      body: $body
    )
  }
`;
