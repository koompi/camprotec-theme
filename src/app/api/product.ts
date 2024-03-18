import { GET_ALL_PRODUCTS } from "@/graphql/product";
import { getClient } from "@/libs/client";
import { ProductType } from "@/types/product";

export async function getLatestProducts() {
  const client = getClient();
  const { data } = await client.query({
    query: GET_ALL_PRODUCTS,
    variables: {
      filter: {
        limit: 10,
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
