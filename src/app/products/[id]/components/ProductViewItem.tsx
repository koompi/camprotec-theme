"use client";

import React, { useState } from "react";
import { Button, Image, RadioGroup, ScrollShadow } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";

import RatingRadioGroup from "./RatingRadioGroup";
import TagGroupRadioItem from "./TagGroupRadioItem";
import { ItemProduct, ProductType, Variants } from "@/types/product";
import { formatToUSD } from "@/utils/usd";
import { LexicalViewer } from "@/editor/LexicalViewer";
import { useCart } from "@/context/useCart";
import { toast } from "sonner";
import { CartItem } from "@/types/global";

export type ProductViewInfoProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> & {
  isPopular?: boolean;
  isLoading?: boolean;
  removeWrapper?: boolean;
  loading?: boolean;
} & ProductType;

const ProductViewInfo = React.forwardRef<HTMLDivElement, ProductViewInfoProps>(
  (
    {
      title,
      previews,
      price,
      desc,
      rating,
      variants,
      detail,
      className,
      loading,
      ...props
    },
    ref
  ) => {
    const [selectedImage, setSelectedImage] = React.useState(previews[0]);
    const { addToCart, addCarts } = useCart();
    const [items, setItems] = useState<CartItem[]>([]);

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
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8",
          className
        )}
        {...props}
      >
        {/* Product Gallery */}
        <div className="relative h-full w-full flex-none">
          {/* Main Image */}

          <div className="aspect-[4/3]">
            <div className="bg-base-100 rounded-lg flex justify-center items-center border px-0">
              <Image
                alt={title}
                className=" object-contain object-center h-[30dvh] sm:h-[30dvh] lg:h-[50dvh] cursor-pointer"
                radius="md"
                src={`${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${selectedImage}`}
                isZoomed
                isLoading={loading}
              />
            </div>
          </div>
          {/* Image Gallery */}
          <ScrollShadow
            className="-mx-2 -mb-4 mt-0 flex w-full max-w-full gap-4 px-2 pb-4 pt-2 hide-scroll-bar"
            orientation="horizontal"
          >
            {previews.map((preview, index) => (
              <button
                key={`${preview}-${index}`}
                className="relative h-24 w-24 flex-none cursor-pointer items-center justify-center rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-primary data-[selected=true]:ring-offset-2 "
                data-selected={preview === selectedImage}
                onClick={() => setSelectedImage(preview)}
              >
                <Image
                  removeWrapper
                  alt={title}
                  classNames={{
                    img: "h-full w-full",
                  }}
                  radius="lg"
                  src={`${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${preview}`}
                />
              </button>
            ))}
          </ScrollShadow>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <h2 className="sr-only">Product information</h2>
          <div className="my-2 flex items-center gap-2">
            <RatingRadioGroup hideStarsText size="sm" value={`${rating}`} />
            <p>Reviews</p>
          </div>
          <p className="text-2xl text-primary font-bold tracking-tight">
            ${price}
          </p>
          <div className="mt-4">
            <p className="sr-only">Product desc</p>
            <p className="line-clamp-3 text-medium text-default-500">{desc}</p>
          </div>

          <div className="mt-6 flex flex-col gap-1">
            <div className="mb-4 flex items-center gap-2 text-default-700">
              <Icon icon="carbon:delivery" width={24} />
              <p className="text-small font-medium">30 days return</p>
            </div>
            {variants.length > 0 && (
              <RadioGroup
                aria-label="Select varaints"
                orientation="horizontal"
                label="Varaints"
                className="gap-3"
              >
                {variants?.map((res: Variants, idx: number) => (
                  <TagGroupRadioItem
                    size="lg"
                    key={idx}
                    value={res?.id}
                    className="flex flex-wrap"
                  >
                    <div className="flex items-center gap-3 p-1">
                      <Image
                        alt="varaints"
                        src={`${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${res?.preview}`}
                        className="h-12"
                        radius="md"
                      />
                      {formatToUSD(parseInt(res?.price.toString()))}
                    </div>
                  </TagGroupRadioItem>
                ))}
              </RadioGroup>
            )}
          </div>

          <div className="mt-12">
            <Button
              fullWidth
              className="text-medium font-medium text-base-100"
              variant="shadow"
              color="primary"
              size="lg"
              startContent={<Icon icon="solar:cart-large-2-bold" width={24} />}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const p: ItemProduct = {
                  id: props?.id,
                  variantId: null,
                  name: title,
                  price: price,
                  currency: props?.currency,
                  preview: props?.thumbnail,
                };

                variants.length > 0
                  ? (addCarts(items), setItems([]))
                  : handleAddToCart(p);
                toast.success("The product is added into the cart!");
              }}
            >
              Add to cart
            </Button>
          </div>
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-3">Details</h2>
            <p className="text-medium text-default-500">
              <LexicalViewer data={detail} />
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ProductViewInfo.displayName = "ProductViewInfo";

export default ProductViewInfo;
