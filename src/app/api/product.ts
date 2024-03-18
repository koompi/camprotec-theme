import { GET_ALL_PRODUCTS } from "@/graphql/product";
import { getClient } from "@/libs/client";

const client = getClient();

export async function getLatestProducts() {
  const { data } = await client.query({
    query: GET_ALL_PRODUCTS,
    variables: {
      filter: {
        limit: 11,
        skip: 0,
        sort: -1,
      },
    },
  });

  return {
    props: {
      products: data.storeProducts,
    },
  };
}
