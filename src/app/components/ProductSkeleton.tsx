"use client";

import { Skeleton, Image, Spacer, Card, CardBody } from "@nextui-org/react";
import React from "react";

const ProductSkeleton = () => {
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2 border border-base-100">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => {
          return (
            <div key={idx}>
              <Card>
                <CardBody>
                  <Image
                    className="aspect-video w-full h-32 sm:h-32 lg:h-48 bg-repeat-round rounded-2xl mx-auto object-contain object-center bg-white"
                    src=""
                    alt="product image"
                    radius="none"
                    isZoomed
                    isLoading={true}
                  />
                </CardBody>
              </Card>
              <Spacer y={2} />
              <div className="my-1 flex flex-col">
                <Skeleton className="mt-3 w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="mt-4 w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                </Skeleton>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSkeleton;
