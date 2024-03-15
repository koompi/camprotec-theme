"use server";

const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT ||
  `${process.env.NEXT_PUBLIC_BACKEND}/graphql/public?store_id=${process.env.NEXT_PUBLIC_ID_STORE}`;

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    }),
  });
});
