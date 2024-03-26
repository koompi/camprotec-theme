import { ESTIMATE_PRICE } from "@/graphql/delivery";
import { getClient } from "@/libs/client";

export async function estimate_price(lat: number, lng: number) {
  const client = getClient();

  const { data } = await client.query({
    query: ESTIMATE_PRICE,
    variables: {
      lat: lat,
      lng: lng,
    },
  });

  return {
    props: {
      estimate_price: data?.estimatePrice?.data,
    },
  };
}
