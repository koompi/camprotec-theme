"use client";

import Link from "next/link";
import { useTheme } from "@/context/useTheme";
import { Button, Image } from "@nextui-org/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const { value } = useTheme();

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="container mx-auto relative sm:relative lg:absolute z-20 left-0 sm:left-0 lg:left-48 max-w-xl top-9 sm:top-9 lg:top-48 px-6 sm:px-6 lg:px-0 mb-12 sm:mb-12 lg:mb-0">
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
        <div className="relative max-w-full mx-auto">
          {value?.banner?.promotes?.length > 0 && (
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
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[EffectCreative, Autoplay]}
              centeredSlides={true}
              className="mySwiperBanner bg-background min-h-[30vh] sm:min-h-[30vh] lg:min-h-[90vh]"
            >
              {value?.banner?.promotes?.map((item: string, idx: number) => (
                <SwiperSlide key={idx}>
                  <Image
                    alt=""
                    src={
                      item
                        ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${item}`
                        : "images/banner-img-sample.png"
                    }
                    className="w-screen bg-white h-full min-h-[30vh] sm:min-h-[30vh] lg:min-h-[90vh] object-cover"
                    isBlurred
                    radius="none"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
};

export default Banner;
