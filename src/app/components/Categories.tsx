"use client";

import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "@/graphql/category";
import Link from "next/link";
import { Category } from "@/types/category";
import { Card, CardBody, Skeleton } from "@nextui-org/react";

const Categories: FC = () => {
  const { data, loading } = useQuery(CATEGORIES, {
    variables: {
      filter: {
        limit: 8,
        skip: 0,
        sort: -1,
      },
    },
  });

  if (loading || !data) {
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
      {data?.storeOwnerCategories.length > 0 && (
        <>
          <div className="font-extrabold md:text-3xl text-center md:py-12 pb-4 mt-2 lg:mt-20">
            <div className="text-primary text-lg sm:text-lg lg:text-4xl">
              CHOOSE CATEGORY
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
            {data?.storeOwnerCategories?.map((cat: Category, idx: number) => {
              return (
                <Link key={idx} href={`/products?search=&category=${cat.id}`}>
                  <Card
                    className="bg-primary/10 px-8 py-6 font-bold w-full "
                    isHoverable
                    isPressable
                    shadow="none"
                  >
                    <CardBody className="text-center">{cat.title.en}</CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
