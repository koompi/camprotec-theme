"use server";

const ENDPOINT =
  process.env.NEXT_PUBLIC_BACKEND ?? "https://backend.riverbase.org";

const GRAPHQL_ENDPOINT = `${ENDPOINT}/graphql/public?store_id=${process.env.NEXT_PUBLIC_ID_STORE ?? "65a4a66033b9eda51233220c"}`;

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
});
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { ApolloLink, HttpLink, concat } from "@apollo/client";

const token =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

const link = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  fetch: fetch,
});

export const makePrivateClient = () => {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  console.log("token", token);

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}` || null,
      },
    }));

    return forward(operation);
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            concat(authMiddleware, httpLink),
          ])
        : concat(authMiddleware, httpLink),
  });
};
