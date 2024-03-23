"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Image, RadioGroup, ScrollShadow } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";

import RatingRadioGroup from "./RatingRadioGroup";
import TagGroupRadioItem from "./TagGroupRadioItem";
import { Attribute, ItemProduct, ProductType, Variants } from "@/types/product";
import { formatToUSD } from "@/utils/usd";
import { LexicalViewer } from "@/editor/LexicalViewer";
import { useCart } from "@/context/useCart";
import { toast } from "sonner";
import { CartItem } from "@/types/global";
import { VariantRadio } from "./VariantRadio";
import { useForm } from "react-hook-form";

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
      ...props
    },
    ref
  ) => {
    const [selectedImage, setSelectedImage] = React.useState(previews[0]);
    const { addToCart } = useCart();

    const cartVaraints = [
      {
        id: "1",
        label: "Default",
        default: true,
        previews: previews[0],
        price: price,
        attributes: [],
      },
    ].concat(variants as never[]);

    const defaultValue = cartVaraints.find(
      (item) => item.id == "1" && item
    ) as Variants;

    const [variant, setVariant] = useState<Variants>(defaultValue);
    // const [items, setItems] = useState<CartItem[]>([]);
    // const [selections, setSelections] = useState();

    // const handleAddToCart = (product: ItemProduct) => {
    //   let p: ItemProduct = {
    //     id: product?.id,
    //     variantId: null,
    //     name: product?.name,
    //     price: product?.price,
    //     currency: product?.currency,
    //     preview: product?.preview,
    //   };
    //   addToCart(p, false);
    // };

    // function to group items by date
    // const groupItemsByVariant = useCallback(() => {
    //   const groups = [] as any;
    //   variants?.forEach((item) => {
    //     if (!groups[item.attribute.split(" ")[0]]) {
    //       groups[item.attribute.split(" ")[0]] = [];
    //     }
    //     groups[item.attribute.split(" ")[0]].push(item);
    //   });

    //   return groups;
    // }, [variants]);

    // const groups = useMemo(() => {
    //   return groupItemsByVariant();
    // }, [groupItemsByVariant]);

    // console.log("groups", JSON.stringify(variants, null, 4));
    // const variantObjet = useMemo(() => {
    //   let result = {};
    //   variants.forEach((v) => {
    //     if (typeof result[v.attribute] === "undefined") {
    //       result[v.attribute] = { [v.label]: parseInt(v.price) };
    //     } else {
    //       result[v.attribute] = {
    //         ...result[v.attribute],
    //         [v.label]: parseInt(v.price),
    //       };
    //     }
    //   });

    //   return result;
    // }, [variants]);

    // const totalPrice = useMemo(() => {
    //   if (typeof selections !== "undefined") {
    //     let total = Object.entries<number>(selections)
    //       .map((e: [string, number]) => e[1])
    //       .reduce((a, b) => a + b);

    //     return total;
    //   }

    //   return 0;
    // }, [selections]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8",
          className
        )}
        {...props}
      >
        {/* Product Gallery */}
        <div className="relative col-span-2 h-full w-full flex-none">
          {/* Main Image */}
          <div className="aspect-3/4">
            <div className="bg-base-100 rounded-lg flex justify-center items-center border px-0">
              <Image
                alt={title}
                radius="md"
                src={`${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${selectedImage}`}
                isZoomed
                className="object-contain object-center h-[30dvh] sm:h-[30dvh] lg:h-[50dvh] cursor-pointer"
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
                  className="object-contain object-center"
                />
              </button>
            ))}
          </ScrollShadow>

          <div className="mt-16 hidden sm:hidden lg:block">
            <h2 className="text-xl font-semibold mb-3">Details</h2>
            <p className="text-medium text-default-500">
              <LexicalViewer data={detail} />
            </p>
          </div>
        </div>

        {/* Product Info */}
        <div className="sticky top-28 col-span-1 flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <h2 className="sr-only">Product information</h2>
          <div className="my-2 flex items-center gap-2">
            <RatingRadioGroup hideStarsText size="sm" value={`${rating}`} />
            <p>Reviews</p>
          </div>
          <p className="text-2xl text-primary font-bold tracking-tight">
            {formatToUSD(parseInt(variant.price.toString()))}
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
            {/* <>
              {
                variants.length > 0 &&
                  variants.map((item: any, idx: number) => {
                    return (
                      <RadioGroup
                        aria-label="Select varaints"
                        orientation="horizontal"
                        label={`Variants`}
                        key={idx}
                        className="mt-3 grid-cols-2"
                      >
                        <TagGroupRadioItem
                          size="lg"
                          key={idx}
                          value={item?.id}
                          className="col-span-1"
                        >
                          <div className="flex items-center gap-3 p-3">
                            <Image
                              alt="varaints"
                              src={`${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${item?.previews}`}
                              className="h-12"
                              radius="md"
                            />
                            <div>
                              <p className="line-clamp-2">{item.label}</p>
                              {item.attributes.map(
                                (atb: Attribute, idx: number) => {
                                  return <p key={idx}>{atb.option}</p>;
                                }
                              )}
                              <p className="text-base font-medium text-primary">
                                {formatToUSD(parseInt(item?.price.toString()))}
                              </p>
                            </div>
                          </div>
                        </TagGroupRadioItem>
                      </RadioGroup>
                    );
                  })
                // Object.keys(groups).map((item: string, idx: number) => {
                //   return (
                // <RadioGroup
                //   aria-label="Select varaints"
                //   orientation="horizontal"
                //   label={`Variants: (${item})`}
                //   key={idx}
                //   className="mt-3 grid-cols-2"
                // >
                // {groups[item]?.map((res: Variants, idx: number) => {
                //   return (
                //     <TagGroupRadioItem
                //       size="lg"
                //       key={idx}
                //       value={res?.id}
                //       className="col-span-1"
                //     >
                //       <div className="flex items-center gap-3 p-3">
                // <Image
                //   alt="varaints"
                //   src={`${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${res?.previews}`}
                //   className="h-12"
                //   radius="md"
                // />
                //         <div>
                //           <p className="line-clamp-2">{res.label}</p>
                // <p className="text-base font-medium text-primary">
                //   {formatToUSD(parseInt(res?.price.toString()))}
                // </p>
                //         </div>
                //       </div>
                //     </TagGroupRadioItem>
                //     );
                //   })}
                // </RadioGroup>
                //   );
                // }
              }
            </> */}

            <RadioGroup label="Variants" defaultValue="1">
              <div className="grid grid-cols-2 gap-2">
                {variants.length > 0 &&
                  cartVaraints.map((item: Variants, idx: number) => {
                    return (
                      <VariantRadio
                        key={idx}
                        value={item?.id}
                        onChange={(_) => setVariant(item)}
                      >
                        <div className="flex items-center space-x-4">
                          <Image
                            alt="variants"
                            src={`${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${item?.previews}`}
                            className="h-12"
                            radius="md"
                          />
                          <div>
                            <span className="text-md font-bold">
                              {item.label}
                            </span>
                            <p className="text-base font-medium font-bold text-primary">
                              {formatToUSD(parseInt(item?.price.toString()))}
                            </p>
                            {item.attributes.map(
                              (item: Attribute, idx: number) => (
                                <div key={idx} className="text-xs flex">
                                  {/* <span>{item.type}: </span> */}
                                  <span>{item.option}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </VariantRadio>
                    );
                  })}
              </div>
            </RadioGroup>
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
                const product: ItemProduct = {
                  id: props?.id,
                  name: title,
                  variant: variant,
                  price: variant ? variant.price : price,
                  currency: "USD",
                  preview: variant ? variant.previews : props?.thumbnail,
                };

                addToCart(product, variant.id != "1" ? true : false);
              }}
            >
              Add to cart
            </Button>
          </div>
          <div className="mt-16 block sm:block lg:hidden">
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
