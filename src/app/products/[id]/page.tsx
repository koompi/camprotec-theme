"use client";

import React from "react";
import ProductViewInfo from "./components/ProductViewItem";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "@/graphql/product";
import { useParams } from "next/navigation";
import { Skeleton } from "@nextui-org/react";

const ProductViewPage = () => {
  const params = useParams();
  const { data, loading, refetch } = useQuery(GET_PRODUCT, {
    variables: { slug: params.id },
  });

  if (loading || !data) {
    return (
      <section className="container mx-auto px-6 py-3 sm:py-3 lg:py-16">
        <div className="w-full flex justify-between items-center gap-3">
          <Skeleton className="flex rounded-md w-full sm:w-full lg:w-[36vw] h-56 sm:h-56 lg:h-[45dvh]" />
          <div className="w-1/2 hidden sm:hidden lg:flex flex-col gap-6">
            <Skeleton className="h-3 w-1/4 rounded-lg " />
            <Skeleton className="h-3 w-full rounded-lg" />
            <Skeleton className="h-3 w-3/4 rounded-lg mb-9" />
            <Skeleton className="h-3 w-full rounded-lg" />
            <Skeleton className="h-3 w-2/4 rounded-lg" />
            <Skeleton className="h-3 w-1/3 rounded-lg" />
            <Skeleton className="h-3 w-full rounded-lg" />
            <Skeleton className="h-3 w-3/4 rounded-lg" />
            <Skeleton className="h-3 w-full rounded-lg" />
          </div>
        </div>
        <div className="flex gap-3 mt-3">
          <Skeleton className="flex rounded-md w-24 h-24" />
          <Skeleton className="flex rounded-md w-24 h-24" />
          <Skeleton className="flex rounded-md w-24 h-24" />
        </div>
        <div className="w-full flex sm:flex lg:hidden flex-col gap-4 py-6">
          <Skeleton className="h-3 w-1/4 rounded-lg " />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-3/4 rounded-lg mb-9" />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-2/4 rounded-lg" />
          <Skeleton className="h-3 w-1/3 rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-3/4 rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-3 sm:py-3 lg:py-16">
      <ProductViewInfo {...data?.storeProduct} loading={loading} />
    </section>
  );
};

export default ProductViewPage;
