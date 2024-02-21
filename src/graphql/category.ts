import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query ($filter: OrderBy) {
    storeOwnerCategories(filter: $filter) {
      children {
        id
        logo
        title {
          en
        }
      }
      createdAt
      id
      logo
      title {
        en
      }
      updatedAt
    }
  }
`;

export const SUB_CATEGORY_BY_ID = gql`
  query ($parentId: String!) {
    storeOwnerSubcategories(parentId: $parentId) {
      id
      logo
      title {
        en
      }
    }
  }
`;
