"use server";

const ENDPOINT =
  process.env.NEXT_PUBLIC_BACKEND ?? "https/backend.riverbase.org";

const GRAPHQL_ENDPOINT = `${ENDPOINT}/graphql/public?store_id=${
  process.env.NEXT_PUBLIC_ID_STORE ?? "65a4a66033b9eda51233220c"
}`;

import {
  ApolloClient,
  from,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { onError } from "@apollo/client/link/error";

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path, nodes }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([httpLink]),
  });
});
