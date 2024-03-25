import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query ($filter: OrderBy) {
    storeOrders(filter: $filter) {
      carts {
        productId
        qty
        unitPrice
        product {
          brand
          previews
          price
          slug
          title
          rating
          thumbnail
        }
      }
      code
      createdAt
      id
      ownerId
      status
      tax
      totalDiscount
      totalPrice
    }
  }
`;
