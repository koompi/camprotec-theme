"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/types/category";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import ScrollingCategories from "./ScrollCategories";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CATEGORIES } from "@/graphql/category";

const Categories = () => {
  const { data: categories, loading: loadingCategory } = useQuery(CATEGORIES, {
    variables: {
      filter: {
        limit: 8,
        skip: 0,
        sort: -1,
      },
    }
  });

  if (loadingCategory) {
    return (
      <div className="flex flex-wrap gap-3 mt-3">
        <Skeleton className="flex rounded-md w-full h-full" />
        <Skeleton className="flex rounded-md w-full h-full" />
        <Skeleton className="flex rounded-md w-full h-full" />
      </div>
    );
  }


  return (
    <div className="container mx-auto">
      {categories?.storeOwnerCategories.length > 0 && (
        <>
          <div className="font-extrabold md:text-3xl text-center md:py-12 pb-4 mt-2 lg:mt-20">
            <div className="text-primary text-lg sm:text-lg lg:text-4xl">
              CHOOSE CATEGORY
            </div>
          </div>
          <ScrollingCategories
            shouldPauseOnHover
            gap="9px"
            className="hidden sm:hidden lg:flex"
          >
            {categories?.storeOwnerCategories?.map((cat: Category, idx: number) => {
              return (
                <Link key={idx} href={`/products?search=&category=${cat?.id}`}>
                  <Card
                    className="bg-primary/10 px-1 py-3 font-bold w-full min-w-72 h-full "
                    isHoverable
                    isPressable
                    shadow="none"
                  >
                    <CardBody className="text-center font-normal">
                      {cat?.title?.en}
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </ScrollingCategories>
          <ScrollingCategories
            shouldPauseOnHover
            gap="9px"
            className="flex sm:flex lg:hidden mx-auto items-center justify-center place-items-center"
            isVertical
          >
            {categories?.storeOwnerCategories?.map((cat: Category, idx: number) => {
              return (
                <Link key={idx} href={`/products?search=&category=${cat?.id}`}>
                  <Card
                    className="bg-primary/10 px-1 py-3 font-bold w-full min-w-72 h-full "
                    isHoverable
                    isPressable
                    shadow="none"
                  >
                    <CardBody className="text-center font-normal">
                      {cat?.title?.en}
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </ScrollingCategories>
        </>
      )}
    </div>
  );
};

export default Categories;
