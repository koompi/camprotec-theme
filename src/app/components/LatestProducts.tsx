"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "@/types/product";
import ProductSkeleton from "./ProductSkeleton";
import { Button } from "@nextui-org/react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import Link from "next/link";

const LatestProducts = ({
  products,
  loading,
}: {
  products: ProductType[];
  loading: boolean;
}) => {
  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <>
      {products?.length > 0 && (
        <div className="container mx-auto">
          <h1 className="text-primary font-extrabold text-lg sm:text-lg lg:text-4xl text-center md:py-12 py-8">
            CHECK THE CORE PRODUCT
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2">
            {products?.map((p) => (
              <ProductCard key={p?.id} product={p} loading={false} />
            ))}
          </div>
          {products?.length >= 10 && (
            <Button
              variant="light"
              size="lg"
              as={Link}
              href="/products"
              color="primary"
              className="flex justify-center items-center mx-auto mt-12 max-w-56"
              endContent={
                <HiOutlineArrowLongRight
                  size={24}
                  className="group-hover:translate-x-2 duration-150"
                />
              }
            >
              More Products
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default LatestProducts;
