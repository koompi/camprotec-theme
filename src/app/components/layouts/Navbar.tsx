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
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
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

  if (loading) return null;

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

        <NavbarItem>
          {user ? (
            <Dropdown placement="bottom-end">
              {loading ? (
                <Skeleton className="flex rounded-full w-12 h-12" />
              ) : (
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={user?.avatar}
                  />
                </DropdownTrigger>
              )}
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  href="/settings"
                  startContent={
                    <Icon icon="solar:settings-outline" fontSize={21} />
                  }
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  href="/locations"
                  startContent={
                    <Icon icon="solar:streets-map-point-broken" fontSize={21} />
                  }
                >
                  My Location
                </DropdownItem>
                <DropdownItem
                  key="orders"
                  startContent={
                    <Icon
                      icon="solar:cart-large-minimalistic-linear"
                      fontSize={21}
                    />
                  }
                >
                  Orders
                </DropdownItem>
                <DropdownItem
                  key="wallet"
                  startContent={
                    <Icon icon="solar:wallet-linear" fontSize={21} />
                  }
                >
                  Wallet
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => logout()}
                  startContent={
                    <Icon icon="solar:logout-outline" fontSize={21} />
                  }
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              color="primary"
              href={`https://backend.riverbase.org/sso/store`}
              variant="flat"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarLayout;
