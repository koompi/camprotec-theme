import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query ($slug: String!) {
    storeProduct(slug: $slug) {
      id
      ownerId
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
      stocks {
        amount
        status
      }
      category {
        id
        title {
          en
        }
        children {
          id
          title {
            en
          }
        }
      }
      subcategories {
        id
        title {
          en
        }
      }
      variants {
        id
        default
        attributes {
          type
          option
        }
        label
        previews
        price
      }
      createdAt
      updatedAt
      currencyPrice {
        khr
        usd
      }
      store {
        name
      }
      promotion {
        isMemershipCart
        normalPromotion {
          promotionType
          promotionStatus
          promotionPrice
          discountType
          discountPercentage
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query ($filter: OrderBy) {
    storeProducts(filter: $filter) {
      membershipCard {
        id
        label
        discountType
        discountPrice
        discountPercentage
        status
        membershipType
        description
      }
      products {
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
        stocks {
          amount
          status
        }
        variants {
          id
          default
          price
          previews
          attributes {
            type
            option
          }
          label
        }
      currencyPrice {
          khr
          usd
        }
        promotion {
          isMemershipCart
          promotion {
            promotionType
            promotionStatus
            promotionPrice
            discountType
            discountPercentage
          }
        }
        createdAt
        updatedAt
      }
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
      stocks {
        amount
        status
      }
      variants {
        id
        default
        price
        previews
        attributes {
          type
          option
        }
        label
      }
      currencyPrice {
        khr
        usd
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
      products {
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
        status
        stocks {
          amount
          status
        }
        variants {
          default
          id
          label
          price
          attributes {
            type
            option
          }
          previews 
        }
        currencyPrice {
          khr
          usd
        }
        \
      }
      total
      pages
      membershipCard {
        id
        discountType
        discountPrice
        discountPercentage
        promotionPrice
      }
    }
  }
`;
