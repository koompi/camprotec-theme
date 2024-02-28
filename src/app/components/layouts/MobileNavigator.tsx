"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge, Button, Link } from "@nextui-org/react";
import React from "react";
import { usePathname } from "next/navigation";

interface MobileNavigator {
  active_icon: string;
  name: string;
  url: string;
  icon: string;
  is_badge: boolean;
}

const MobileNavigator = () => {
  const pathname = usePathname();

  const navigator = [
    {
      name: "Home",
      url: "/",
      active_icon: "ph:house-simple-fill",
      icon: "ph:house-simple-bold",
      is_badge: false,
    },
    {
      name: "Search",
      url: "/search",
      active_icon: "ic:outline-search",
      icon: "ic:outline-search",
      is_badge: false,
    },
    {
      name: "Products",
      url: "/products",
      active_icon: "mingcute:shopping-bag-2-fill",
      icon: "mingcute:shopping-bag-2-line",
      is_badge: false,
    },
    {
      name: "Cart",
      url: "/cart",
      active_icon: "ph:shopping-cart-simple-fill",
      icon: "ph:shopping-cart-simple-bold",
      is_badge: true,
    },
  ];

  return (
    <section className="grid grid-cols-4 sm:grid lg:hidden fixed bottom-0 z-30 bg-base-100 w-full min-h-14 container mx-auto px-3">
      {navigator.map((nav: MobileNavigator, idx: number) => {
        return (
          <Link
            key={idx}
            href={nav.url}
            className="flex flex-col justify-center items-center"
          >
            {nav.url === pathname ? (
              <>
                {nav.is_badge ? (
                  <>
                    <Badge
                      content="99+"
                      shape="circle"
                      color="danger"
                      size="sm"
                    >
                      <Button variant="light" isIconOnly color="primary">
                        <Icon icon={nav.active_icon} fontSize={30} />
                      </Button>
                    </Badge>
                    <span className="text-xs relative -mt-1 text-primary">
                      {nav.name}
                    </span>
                  </>
                ) : (
                  <>
                    <Button variant="light" isIconOnly color="primary">
                      <Icon icon={nav.active_icon} fontSize={30} />
                    </Button>
                    <span className="text-xs relative -mt-1 text-primary">
                      {nav.name}
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                {nav.is_badge ? (
                  <>
                    <Badge
                      content="99+"
                      shape="circle"
                      color="danger"
                      size="sm"
                    >
                      <Button variant="light" isIconOnly>
                        <Icon
                          icon={nav.icon}
                          fontSize={30}
                          className="text-gray-600"
                        />
                      </Button>
                    </Badge>
                    <span className="text-xs relative -mt-1 text-gray-600">
                      {nav.name}
                    </span>
                  </>
                ) : (
                  <>
                    <Button variant="light" isIconOnly>
                      <Icon
                        icon={nav.icon}
                        fontSize={30}
                        className="text-gray-600"
                      />
                    </Button>
                    <span className="text-xs relative -mt-1 text-gray-600">
                      {nav.name}
                    </span>
                  </>
                )}
              </>
            )}
          </Link>
        );
      })}
    </section>
  );
};

export default MobileNavigator;
