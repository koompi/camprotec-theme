"use client";

import React from "react";
import { Button, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useTheme } from "@/context/useTheme";

export default function MessageBanner() {
  const { value } = useTheme();

  return (
    <div className="flex w-full justify-center items-center gap-x-3 border-b-1 border-divider bg-gradient-to-r from-primary/30 via-white to-secondary/10 px-6 py-1 sm:px-3.5 ">
      <p className="text-small text-foreground">
        <Link
          className="inline-flex md:ml-1 animate-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          href="/products"
        >
          {value?.banner?.message ? (
            <span>
              {value?.globals?.officialNameProducts
                ? value?.globals?.officialName
                : value?.globals?.name}
              , {value?.banner?.message}
            </span>
          ) : (
            <span>
              {value?.globals?.officialNameProducts
                ? value?.globals?.officialName
                : value?.globals?.name}{" "}
              , a trusted supplier of essential products
            </span>
          )}
        </Link>
      </p>
      <Button
        as={Link}
        className="group relative overflow-hidden bg-transparent text-small font-normal px-6 sm:px-6 lg:px-3"
        color="default"
        radius="full"
        endContent={
          <Icon
            className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
            icon="solar:arrow-right-linear"
            width={16}
          />
        }
        href="/products"
        style={{
          border: "solid 1.5px transparent",
          backgroundImage: `linear-gradient(hsl(var(--nextui-danger-50)), hsl(var(--nextui-danger-50))), linear-gradient(to right, #F871A0, #9353D3)`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        variant="bordered"
        size="sm"
      >
        Explore
      </Button>
    </div>
  );
}
