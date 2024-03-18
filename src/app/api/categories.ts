import { CATEGORIES } from "@/graphql/category";
import { getClient } from "@/libs/client";

export async function categories(limit?: number) {
  const client = getClient();

  const { data } = await client.query({
    query: CATEGORIES,
    variables: {
      filter: {
        limit: limit ? limit : 10,
        skip: 0,
        sort: -1,
      },
    },
  });

  return {
    props: {
      categories: data?.storeOwnerCategories,
    },
  };
}
