"use client";

import React from "react";
import { useTheme } from "@/context/useTheme";
import { Image } from "@nextui-org/react";
import Link from "next/link";

const Logo = () => {
  const { value } = useTheme();

  return (
    <Link href="/">
      {value?.header?.logo ? (
        <Image
          width={100}
          alt={value?.name}
          src={value?.header?.logo}
          fallbackSrc={value?.name}
          radius="none"
        />
      ) : (
        <h1 className="font-bold text-md sm:text-md lg:text-xl">
          {value?.name}
        </h1>
      )}
    </Link>
  );
};

export default Logo;
