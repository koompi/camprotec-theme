"use client";

import { ItemProduct, ProductType } from "@/types/product";
import React, { useState, FC } from "react";
import {
  Card,
  Image,
  CardBody,
  Button,
  Spacer,
  Tooltip,
  Skeleton,
} from "@nextui-org/react";
import { formatToUSD } from "@/utils/usd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { CartItem } from "@/types/global";
import { useCart } from "@/context/useCart";

const ProductCard: FC<{ product: ProductType; loading: boolean }> = (props) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { addToCart, addCarts } = useCart();

  const handleAddToCart = (product: ItemProduct) => {
    let p: ItemProduct = {
      id: product?.id,
      variantId: null,
      name: product?.name,
      price: product?.price,
      currency: product?.currency,
      preview: product?.preview,
    };
    addToCart(p, false);
  };

  return (
    <div>
      <Card
        as={Link}
        href={`/products/${props?.product?.slug}`}
        isPressable
        shadow="sm"
      >
        <CardBody className="px-3 pb-1">
          {/* <p>{props.product?.createdAt}</p> */}
          {/* {!props?.loading && (
         <Tooltip
           showArrow
           placement="top-end"
           content="Add to Cart"
           classNames={{
             base: ["before:bg-neutral-400 dark:before:bg-white"],
             content: [
               "py-2 px-4 shadow-xl",
               "text-black bg-gradient-to-br from-white to-neutral-400",
             ],
           }}
         >
           <Button
             isIconOnly
             className="absolute right-3 top-3 z-30 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
             radius="full"
             size="sm"
             variant="flat"
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               const p: ItemProduct = {
                 id: props?.product?.id,
                 variantId: null,
                 name: props?.product?.title,
                 price: props?.product?.price,
                 currency: props?.product?.currency,
                 preview: props?.product?.thumbnail,
               };

               props?.product?.variants.length > 0
                 ? (addCarts(items), setItems([]))
                 : handleAddToCart(p);
               toast.success("The product is added into the cart!");
             }}
           >
             <Icon
               className={cn("text-default-900/50", {
                 "text-primary": isLiked,
               })}
               icon="solar:cart-large-minimalistic-bold"
               width={21}
             />
           </Button>
         </Tooltip>
       )} */}

          <Image
            className="aspect-[4/3] w-full h-full bg-repeat-round rounded-2xl mx-auto object-contain object-center bg-white"
            src={`${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${props?.product?.thumbnail}`}
            alt="product image"
            radius="none"
            isZoomed
            isLoading={props.loading}
          />
          <Spacer y={2} />
        </CardBody>
      </Card>
      <div className="mt-1 flex flex-col gap-2 px-1">
        {props.loading ? (
          <div className="my-1 flex flex-col">
            <Skeleton className="mt-3 w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="mt-4 w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        ) : (
          <>
            <div className="mt-3 px-2">
              <div className="flex items-center justify-between">
                <h3 className="text-small font-medium text-default-700">
                  {props?.product?.brand}
                </h3>

                {props?.product?.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Icon
                      className="text-primary"
                      icon="solar:star-bold"
                      width={16}
                    />
                    <span className="text-small text-default-500">
                      {props?.product?.rating}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-base sm:text-base lg:text-large font-medium line-clamp-1 break-all">
                {props?.product?.title}
              </p>

              <div className="mt-1 flex justify-between items-center">
                <span className="text-primary lg:text-xl text-sm font-bold">
                  {formatToUSD(props.product.price)}
                </span>
                <Button
                  variant="flat"
                  size="sm"
                  color="primary"
                  radius="full"
                  className="hidden sm:hidden lg:flex"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const p: ItemProduct = {
                      id: props?.product?.id,
                      variantId: null,
                      name: props?.product?.title,
                      price: props?.product?.price,
                      currency: props?.product?.currency,
                      preview: props?.product?.thumbnail,
                    };

                    props?.product?.variants.length > 0
                      ? (addCarts(items), setItems([]))
                      : handleAddToCart(p);
                    toast.success("The product is added into the cart!");
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
