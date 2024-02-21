"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT ||
  `${process.env.NEXT_PUBLIC_RVB_BACKEND}/graphql/public?store_id=${process.env.NEXT_PUBLIC_ID_STORE}`;

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  //   operation.setContext(({ headers = {} }) => ({
  //     headers: {
  //       ...headers,
  //       authorization:
  //         `Bearer ${
  //           typeof window !== "undefined" && localStorage.getItem("access_token")
  //         }` || null,
  //     },
  //   }));

  return forward(operation);
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
});
