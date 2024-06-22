"use client";

import { ItemProduct, ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";
import React, { useState, FC } from "react";
import { Card, Image, CardBody, Button, Skeleton } from "@nextui-org/react";
// import { formatToUSD } from "@/utils/usd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
// import { CartItem } from "@/types/global";
import { useCart } from "@/context/useCart";
import { toast } from "sonner";

const ProductCard: FC<{
  product: ProductType;
  promotion: PromotionType;
  loading: boolean;
}> = (props) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: ItemProduct) => {
    // let p: ItemProduct = {
    //   id: product?.id,
    //   variantId: null,
    //   name: product?.name,
    //   promotion: {},
    //   price: product?.price,
    //   currency: product?.currency,
    //   preview: product?.preview,
    //   productId: product?.id,
    // };
    addToCart(product);
  };

  console.log("");
  
  return (
    <div className="relative">
      {props.promotion.discount && (
        <div className="absolute -top-2 right-0 bg-danger rounded-lg text-semibold z-50 w-16 h-8 flex items-center justify-center text-white">
          {props.promotion.discount.discountType == "PERCENTAGE"
            ? `${props.promotion.discount.discountPercentage}%`
            : `$${props.promotion.discount.discountPrice}`}
        </div>
      )}
      <Card
        as={Link}
        href={`/products/${props?.product?.slug}`}
        isPressable
        shadow="sm"
        className="p-0 z-40"
      >
        <CardBody className="p-0 flex justify-center items-center mx-auto ">
          <Image
            className="h-36 sm:h-36 lg:h-52 bg-repeat-round rounded-2xl mx-auto object-cover object-center "
            src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backend.riverbase.org"}/api/drive?hash=${props?.product?.thumbnail}`}
            alt="product image"
            radius="lg"
            isZoomed
            isLoading={props.loading}
          />
          {/* <Spacer y={2} /> */}
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
                <h3 className="text-xs font-light text-default-700">
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
                {props.promotion.discount ? (
                  <div>
                    <div>
                      <span className="text-primary lg:text-sm text-sm font-bold line-through">
                        $
                        {parseFloat(
                          props?.product?.currencyPrice?.usd.toString()
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-primary lg:text-xl text-sm font-bold">
                        ${props.promotion.discount.totalDiscount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-primary lg:text-xl text-sm font-bold">
                    $
                    {parseFloat(
                      props?.product?.currencyPrice?.usd.toString()
                    ).toFixed(2)}
                  </span>
                )}

                {props?.product?.stocks?.status !== "OUT-STOCK" && (
                  <Button
                    variant="flat"
                    size="sm"
                    color="primary"
                    radius="full"
                    className="hidden sm:hidden lg:flex"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const product: ItemProduct = {
                        id: props?.product.id,
                        name: props?.product?.title,
                        promotion: props.promotion,
                        variant: {
                          id: null,
                          label: "Default",
                          default: true,
                          previews: props?.product.thumbnail,
                          price: props?.product.price,
                          attributes: [],
                        },
                        price: props?.product.price,
                        currency: "USD",
                        preview: props?.product.thumbnail,
                        productId: props?.product.id,
                        variantId: null,
                      };

                      handleAddToCart(product);
                      toast.success("The product is added into the cart!");
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
