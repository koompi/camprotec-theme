"use server";

import React, { FC } from "react";
import Link from "next/link";
import { Category } from "@/types/category";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { categories } from "../api/categories";
import ScrollingCategories from "./ScrollCategories";

const Categories: FC = async () => {
  const { props } = await categories();

  if (!props) {
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
      {props.categories.length > 0 && (
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
            {props.categories?.map((cat: Category, idx: number) => {
              return (
                <Link key={idx} href={`/products?search=&category=${cat.id}`}>
                  <Card
                    className="bg-primary/10 px-1 py-3 font-bold w-full min-w-72 h-full "
                    isHoverable
                    isPressable
                    shadow="none"
                  >
                    <CardBody className="text-center font-normal">
                      {cat.title.en}
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
            {props.categories?.map((cat: Category, idx: number) => {
              return (
                <Link key={idx} href={`/products?search=&category=${cat.id}`}>
                  <Card
                    className="bg-primary/10 px-1 py-3 font-bold w-full min-w-72 h-full "
                    isHoverable
                    isPressable
                    shadow="none"
                  >
                    <CardBody className="text-center font-normal">
                      {cat.title.en}
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
