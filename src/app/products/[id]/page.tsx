"use client";

import { useParams } from "next/navigation";
import ProductViewInfo from "./components/ProductViewItem";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_PRODUCT } from "@/graphql/product";

export default function ProductPage() {
  const param = useParams();
  
  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: {
      slug: param.id
    }
  })
  if(loading){
    return <div>loading...</div>
  }
  return (
    <section className="container mx-auto px-6 py-3 sm:py-3 lg:py-16">
      <ProductViewInfo {...data?.storeProduct} />
    </section>
  );
}

