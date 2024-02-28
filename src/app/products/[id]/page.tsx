"use client";

import React from "react";
import ProductViewInfo from "./components/ProductViewItem";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "@/graphql/product";
import { useParams } from "next/navigation";

const ProductViewPage = () => {
  const params = useParams();
  const { data, loading, refetch } = useQuery(GET_PRODUCT, {
    variables: { slug: params.id },
  });

  if (loading || !data) {
    return "loading ...";
  }

  console.log("para", data?.storeProduct);

  return (
    <section className="container mx-auto px-6 py-3 sm:py-3 lg:py-16">
      <ProductViewInfo {...data?.storeProduct} loading={loading} />
    </section>
  );
};

export default ProductViewPage;
