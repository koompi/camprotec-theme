"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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
import Link from "next/link";

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
        className="hidden h-11 gap-12 rounded-full border-small border-default-200/20 bg-background/60 px-12 shadow-sm backdrop-blur-md backdrop-saturate-150 md:flex"
        justify="center"
      >
        <NavbarItem>
          <Link
            className="text-default-500 font-semibold"
            href={pathname == "/" ? "#" : "/"}
          >
            <p className="text-lg">Home</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500 font-semibold" href="/products">
            <p className="text-lg">Products</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-default-500 font-semibold"
            href={pathname == "/" ? "#categories" : "/#categories"}
            // size="sm"
          >
            <p className="text-lg">Categories</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-default-500 font-semibold"
            href={pathname == "/" ? "#about" : "/#about"}
            // size="sm"
          >
            <p className="text-lg">About</p>
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
                  as={Link}
                  key="settings"
                  href="/settings"
                  startContent={
                    <Icon icon="solar:settings-outline" fontSize={21} />
                  }
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  as={Link}
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
                  href="/orders"
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
