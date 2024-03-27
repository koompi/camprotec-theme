"use server"

import { CATEGORIES } from "@/graphql/category";
import { getClient } from "@/libs/client";

export async function categories(limit?: number) {
  const client = getClient();

  const { data } = await client.query({
    query: CATEGORIES,
    variables: {
      filter: limit ? {
        limit: limit ? limit : 10,
        skip: 0,
        sort: -1,
      } : null,
    },
  });

  return {
    props: {
      categories: data?.storeOwnerCategories,
    },
  };
}
