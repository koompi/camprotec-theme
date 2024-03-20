import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query ($slug: String!) {
    storeProduct(slug: $slug) {
      id
      ownerId
      storeId
      title
      thumbnail
      brand
      desc
      price
      slug
      rating
      previews
      status
      detail
      currency
      variants {
        attribute
        id
        label
        option
        previews
        price
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query ($filter: OrderBy) {
    storeProducts(filter: $filter) {
      id
      ownerId
      storeId
      title
      thumbnail
      brand
      desc
      price
      slug
      rating
      previews
      currency
      status
      detail
      variants {
        price
        previews
        option
        label
      }
      createdAt
      updatedAt
    }
  }
`;

export const PRODUCTS = gql`
  query ($keyword: String, $id: [String!], $filter: OrderBy) {
    storeFilterSearchProducts(keyword: $keyword, id: $id, filter: $filter) {
      id
      ownerId
      storeId
      title
      thumbnail
      brand
      desc
      price
      slug
      rating
      previews
      currency
      status
      detail
      variants {
        price
        previews
        option
        label
      }
      createdAt
      updatedAt
    }
  }
`;

export const GLOBAL_PRODUCT_FILTERING = gql`
  query storeGlobalFilterProducts(
    $tagId: [String!]
    $keyword: String
    $status: String
    $range: RangeProduct
    $filter: OrderBy
  ) {
    storeGlobalFilterProducts(
      id: $tagId
      keyword: $keyword
      status: $status
      range: $range
      filter: $filter
    ) {
      id
      createdAt
      thumbnail
      title
      brand
      price
      previews
      slug
      sell
      rating
      variants {
        id
        label
        price
        option
        previews
      }
    }
  }
`;
