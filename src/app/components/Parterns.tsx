"use client";

import React from "react";
import { Spacer, Image } from "@nextui-org/react";
import ScrollingBanner from "./ScrollLogoPartners";

const Parterns = () => {
  return (
    <section>
      <div className="text-center flex flex-col gap-2 py-16">
        <span>Service With A Smile</span>
        <h1 className="text-primary font-extrabold text-lg sm:text-lg lg:text-4xl">
          Our Clients Believe In Us
        </h1>
      </div>
      <section className="mx-auto w-full container px-6 lg:px-8">
        <ScrollingBanner shouldPauseOnHover duration={60} gap="30px">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_res, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-center text-foreground"
            >
              <Image
                alt="logo"
                src="/images/riverbase-2.png"
                isBlurred
                className="w-full"
              />
            </div>
          ))}
        </ScrollingBanner>
        <Spacer y={12} />
        <ScrollingBanner isReverse shouldPauseOnHover duration={60} gap="30px">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_res, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-center text-foreground"
            >
              <Image
                alt="logo"
                src="/images/riverbase-2.png"
                isBlurred
                className="w-full"
              />
            </div>
          ))}
        </ScrollingBanner>
      </section>
    </section>
  );
};

export default Parterns;
