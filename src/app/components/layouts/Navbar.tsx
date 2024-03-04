"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Badge,
  Skeleton,
  Avatar,
} from "@nextui-org/react";
import Logo from "../Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/context/useAuth";
import { usePathname } from "next/navigation";

const NavbarLayout = () => {
  const { cartItems, logout } = useCart();
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (pathname === "/search") {
    return null;
  }

  return (
    <Navbar shouldHideOnScroll maxWidth="2xl">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent
        className="hidden h-11 gap-6 rounded-full border-small border-default-200/20 bg-background/60 px-4 shadow-sm backdrop-blur-md backdrop-saturate-150 md:flex"
        justify="center"
      >
        <NavbarItem>
          <Link className="text-default-500 font-semibold" href="#" size="sm">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-default-500 font-semibold"
            href="#products"
            size="sm"
          >
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-default-500 font-semibold"
            href="#categories"
            size="sm"
          >
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-default-500 font-semibold"
            href="#about"
            size="sm"
          >
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-9">
        <NavbarItem className="hidden lg:flex">
          <Link href="/cart" color="foreground">
            <Badge
              color="danger"
              content={cartItems?.length}
              shape="circle"
              size="md"
              variant="shadow"
            >
              <Icon icon="uil:cart" fontSize={30} />
            </Badge>
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href=
            variant="flat"
          >
            Login
          </Button>
        </NavbarItem> */}
        <NavbarItem className="hidden sm:block">
          {loading ? (
            <Skeleton className="flex rounded-full w-10 h-10" />
          ) : user ? (
            <Avatar size="md" />
          ) : (
            <Link as={Link} href={`https://backend.riverbase.org/sso/store`}>
              Login
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarLayout;
