"use client";

import Link from "next/link";
import { useTheme } from "@/context/useTheme";
import { Image } from "@nextui-org/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const { value } = useTheme();

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Link
            href="/products"
            className=" border border-primary/30 rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out [font-size:_clamp(0.1em,2vw,0.9em)]"
          >
            {value?.banner?.message
              ? value?.banner?.message
              : " The most popular products is available in"}{" "}
            <span className="font-semibold text-primary">
              {value?.globals?.officialName
                ? value?.globals?.officialName
                : value?.globals?.name}
            </span>
          </Link>
          <div className="text-center mx-auto font-display font-bold tracking-normal text-slate-900 [font-size:_clamp(1.25em,3vw,4em)]">
            {value?.banner?.title
              ? value?.banner?.title
              : "Deep Savings on Your Favorite Items!"}
            <br />
            <span className="relative text-primary break-words">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-primary/80"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative break-all">
                {value?.globals?.officialName
                  ? value?.globals?.officialName
                  : value?.globals?.name}
              </span>
            </span>
          </div>

          <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
            {value?.banner?.desc
              ? value?.banner?.desc
              : "It's time to indulge! Dive into a sea of savings on all your favorite items. Snag incredible deals you won't believe (...your eyes ). Don't miss out, this sale's hotter than sunshine! ☀️"}
          </p>

          <div className="mt-10 relative max-w-5xl mx-auto">
            {value?.banner?.promotes?.length > 0 && <Swiper
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
              modules={[Autoplay, EffectCreative]}
              centeredSlides={true}
              className="mySwiper3 rounded-xl bg-base-100 max-h-[28dvh] sm:max-h-[28dvh] lg:max-h-[50dvh]"
            >

              {value?.banner?.promotes?.map((item: string, idx: number) => (
                <SwiperSlide key={idx}>
                  <Image
                    alt=""
                    src={`${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${item}`}
                    className="w-full "
                  />
                </SwiperSlide>
              ))}
            </Swiper>}


            <div className="absolute bottom-12 -start-20 -z-[1] size-48 bg-gradient-to-b from-primary to-white p-px rounded-lg ">
              <div className="bg-white size-48 rounded-lg 0"></div>
            </div>

            <div className="absolute -top-12 -end-20 -z-[1] size-48 bg-gradient-to-t from-secondary to-secondary/60 p-px rounded-full">
              <div className="bg-white size-48 rounded-full "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
