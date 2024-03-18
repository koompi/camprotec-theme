
import { ApolloLink, HttpLink, concat } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT ||
  `${process.env.NEXT_PUBLIC_BACKEND}/graphql/private?store_id=${process.env.NEXT_PUBLIC_ID_STORE}`;

const token =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

const privateClient = () => {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // operation.setContext(({ headers = {} }) => ({
    //   headers: {
    //     ...headers,
    //     authorization: `Bearer ${token}` || null,
    //   },
    // }));

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

export default privateClient;
