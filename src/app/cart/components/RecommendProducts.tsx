"use client";

import React, { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Image } from "@nextui-org/react";
import { ItemProduct, ProductType } from "@/types/product";
import { useQuery } from "@apollo/client";
import { GLOBAL_PRODUCT_FILTERING } from "@/graphql/product";
import { formatToUSD } from "@/utils/usd";
import { useCart } from "@/context/useCart";
import { CartItem } from "@/types/global";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FilterProduct from "./CheckoutComponent";

const RecommendProducts = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="h-[80dvh] sticky top-28 hidden sm:hidden lg:block">
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectCreative]}
        className="mySwiper3 rounded-xl"
        loop={true}
      >
        {products?.slice(0, 10)?.map((res: ProductType, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <RecommendCard props={res} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default RecommendProducts;

const RecommendCard: FC<{ props: ProductType }> = ({ props }) => {
  const { addToCart, addCarts } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();

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
    <>
      <div
        className="col-span-1 h-full relative hidden w-full overflow-hidden rounded-xl shadow-small lg:block"
        onClick={() => router.push(`/products/${props.slug}`)}
      >
        {/* Top Shadow */}
        <div className="absolute top-0 z-10 h-32 w-full rounded-xl bg-gradient-to-b from-black/80 to-transparent" />
        {/* Bottom Shadow */}
        <div className="absolute bottom-0 z-10 h-32 w-full rounded-xl bg-gradient-to-b from-transparent to-black/80" />

        {/* Content */}
        <div className="absolute top-10 z-10 flex w-full items-start justify-between px-10">
          <h2 className="text-2xl font-medium text-white/70 [text-shadow:_0_2px_10px_rgb(0_0_0_/_20%)]">
            {props.brand}
          </h2>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1">
              {Array.from({ length: props?.rating }).map((_, i) => (
                <Icon
                  key={i}
                  className="text-white/80"
                  icon="solar:star-bold"
                  width={16}
                />
              ))}
            </div>
          </div>
        </div>
        <Image
          removeWrapper
          alt={props.title}
          className="absolute inset-0 z-0 h-full w-full rounded-lg object-contain bg-white"
          height="100%"
          src={`${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${props?.thumbnail}`}
        />
        <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-medium bg-background/10 p-8 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50 ">
          <div className="flex flex-col gap-1">
            <h2 className="left-10 z-10 text-2xl font-medium text-white/90 line-clamp-1">
              {props.title}
            </h2>
            <p className="left-10 z-10 text-white/80">
              {formatToUSD(props.price)}
            </p>
          </div>
          <Button
            className="border-white/40 pl-3 text-white"
            startContent={<Icon icon="lucide:plus" width={24} />}
            variant="bordered"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const p: ItemProduct = {
                id: props?.id,
                variantId: null,
                name: props?.title,
                price: props?.price,
                currency: props?.currency,
                preview: props?.thumbnail,
              };

              props?.variants.length > 0
                ? (addCarts(items), setItems([]))
                : handleAddToCart(p);
              toast.success("The product is added into the cart!");
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </>
  );
};
