"use client";

import { useTheme } from "@/context/useTheme";
import { Button, Link, Image } from "@nextui-org/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";

import "swiper/css/pagination";

const BannerThree = () => {
  const { value } = useTheme();

  return (
    <section className="h-full container mx-auto px-6 py-9">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 items-center justify-between place-content-center my-auto gap-9 sm:gap-9 lg:gap-24">
        <div className="relative col-span-1 sm:col-span-1 lg:col-span-2 pt-6 sm:pt-6 lg:pt-0">
          <h3 className="text-2xl sm:text-2xl lg:text-6xl font-semibold">
            {value?.banner?.title ? value?.banner?.title : "Title"}
          </h3>
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6 text-justify sm:text-justify lg:text-start">
            {value?.banner?.desc
              ? value?.banner?.desc
              : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in error repellat voluptatibus ad."}
          </p>
          <Button
            size="lg"
            variant="shadow"
            color="primary"
            radius="full"
            className="text-background"
            as={Link}
            href="/products"
          >
            Find Products
          </Button>
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-3 h-full w-full py-0 sm:py-0 lg:py-20 mx-auto">
          <div>
            {value?.banner?.promotes?.length > 0 && (
              <Swiper
                grabCursor={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination, Autoplay]}
                centeredSlides={true}
              >
                {value?.banner?.promotes?.map((item: string, idx: number) => (
                  <SwiperSlide key={idx}>
                    <Image
                      alt=""
                      src={
                        item
                          ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${item}`
                          : "images/testing-product2.png"
                      }
                      className="w-screen h-full object-cover "
                      isBlurred
                      radius="lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerThree;
