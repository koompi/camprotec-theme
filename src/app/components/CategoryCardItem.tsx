"use client";

import { Category } from "@/types/category";
import { Card, CardHeader, Image } from "@nextui-org/react";
import React, { FC } from "react";

const CategoryCardItem: FC<Category> = (props) => {
  return (
    <Card className="w-full h-full" isPressable isBlurred>
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <h4 className="text-background font-medium text-xl">
          {props?.title?.en}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        isZoomed
        alt="Card background"
        className="z-0 w-full h-full brightness-75 object-cover"
        src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backnd.riverbase.org"}/api/drive?hash=${props?.logo}`}
      />
    </Card>
  );
};

export default CategoryCardItem;
