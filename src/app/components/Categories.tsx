"use client";

import React, { useState } from "react";
import { Category } from "@/types/category";
import { Button, Card, CardBody, Link, Skeleton } from "@nextui-org/react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CATEGORIES } from "@/graphql/category";

import CategoryCardItem from "./CategoryCardItem";

const Categories = () => {
  const { data: categories, loading: loadingCategory } = useQuery(CATEGORIES, {
    variables: {
      filter: {
        limit: 8,
        skip: 0,
        sort: -1,
      },
    },
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
    <div className="container mx-auto px-6 sm:px-6 lg:px-0">
      <div className="font-extrabold md:text-3xl text-center md:py-12 pb-4 mt-2 lg:mt-20">
        <div className="text-primary text-lg sm:text-lg lg:text-4xl">
          CHOOSE
        </div>
      </div>
      {categories?.storeOwnerCategories.length > 0 && (
        <>
          {/* <div className="flex overflow-x-scroll">
            <div className="hidden sm:hidden lg:flex flex-nowrap gap-3 container mx-auto justify-center w-full">
              {categories?.storeOwnerCategories?.map(
                (cat: Category, idx: number) => {
                  return (
                    <Link
                      key={idx}
                      href={`/products?search=&category=${cat?.id}`}
                      className="inline-block"
                    >
                      <div className="w-full h-36 sm:h-56 max-w-xs overflow-hidden">
                        <CategoryCardItem {...cat} />
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </div> */}
          <div className="flex flex-col bg-white m-auto p-auto">
            <div className="flex overflow-x-scroll hide-scroll-bar">
              <div className="flex gap-3 flex-nowrap mx-auto">
                {categories?.storeOwnerCategories?.map(
                  (cat: Category, idx: number) => {
                    return (
                      <Link
                        href={`/products?search=&category=${cat?.id}`}
                        key={idx}
                      >
                        {cat?.logo ? (
                          <div className="inline-block">
                            <div className="w-52 sm:w-52 lg:w-72 h-28 sm:h-28 lg:36 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                              <CategoryCardItem {...cat} />
                            </div>
                          </div>
                        ) : (
                          <>
                            <Card
                              className="bg-primary/10 px-1 py-3 font-bold w-full min-w-72 h-full hidden sm:hidden lg:flex"
                              isHoverable
                              isPressable
                              shadow="none"
                            >
                              <CardBody className="text-center font-normal">
                                {cat?.title?.en}
                              </CardBody>
                            </Card>
                            <Button
                              variant="flat"
                              size="md"
                              className="w-auto flex sm:flex lg:hidden"
                              radius="full"
                              as={Link}
                              href={`/products?search=&category=${cat.id}`}
                            >
                              {cat.title.en}
                            </Button>
                          </>
                        )}
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
