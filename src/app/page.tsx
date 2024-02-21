"use client";
import { useQuery } from "@apollo/client";

import { GET_ALL_PRODUCTS } from "@/graphql/product";
import Banner from "./components/Banner";

export default function Home() {
  const { data, loading } = useQuery(GET_ALL_PRODUCTS);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Banner />
    </main>
  );
}
