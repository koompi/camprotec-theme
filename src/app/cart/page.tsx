"use client";

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import CheckoutComponent from "./components/CheckoutComponent";
import { Toaster } from "sonner";
import { GET_ALL_PRODUCTS } from "@/graphql/product";

export default function CartPage() {
  const { data: products } = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      filter: {
        limit: 10,
        skip: 0,
        sort: -1,
      },
    },
  });

  return (
    <>
      {/* <Toaster position="top-right" />{" "} */}
      <CheckoutComponent products={products?.storeProducts} />
    </>
  );
}
