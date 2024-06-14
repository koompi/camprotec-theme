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
  discount,
  type,
  loading,
}: {
  products: ProductType[];
  discount?: number,
  type?: string,
  loading: boolean;
}) => {
  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <>
      {products?.length > 0 && (
        <div className="container mx-auto px-4">
          <h1 className="text-primary font-extrabold text-lg sm:text-lg lg:text-4xl text-center md:py-12 py-8">
            CHECK THE CORE PRODUCT
          </h1>
          <div className="grid grid-cols-2 sm:grid lg:flex flex-wrap items-center justify-center gap-3 place-items-center place-content-center">
            {products?.map((p) => (
              <div className="w-full sm:w-full lg:w-72" key={p?.id}>
                <ProductCard product={p} type={type} discount={discount} loading={false} />
              </div>
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
