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
} from "@nextui-org/react";
import Logo from "../Logo";
import { Icon } from "@iconify/react/dist/iconify.js";

const NavbarLayout = () => {
  return (
    <Navbar shouldHideOnScroll maxWidth="2xl">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent
        className="hidden h-11 gap-6 rounded-full border-small border-default-200/20 bg-background/60 px-4 shadow-sm backdrop-blur-md backdrop-saturate-150 md:flex"
        justify="center"
      >
        <NavbarItem isActive>
          <Link color="primary" href="#" size="sm">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#products" size="sm">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#categories" size="sm">
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#about" size="sm">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-9">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" color="foreground">
            <Badge
              color="danger"
              content={19}
              shape="circle"
              size="md"
              variant="shadow"
            >
              <Icon icon="uil:cart" fontSize={30} />
            </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarLayout;
