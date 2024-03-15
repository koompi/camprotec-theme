import { CUSTOMER_ADDRESS } from "@/graphql/delivery";
import { getClient } from "@/libs/client";

export const Address = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: CUSTOMER_ADDRESS,
    context: {
      headers: {
        Authorization: `Bearer 122323`,
      },
    },
  });

  console.log("data", data);

  return <div>Hello</div>;
};
