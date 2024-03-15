"use client";

import {
  Card,
  CardBody,
  Button,
  Image,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const MyLocation = () => {

  
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-full"
      shadow="sm"
    >
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            variant="flat"
            size="sm"
            className="absolute right-1 top-1 z-10"
          >
            <Icon icon="solar:menu-dots-bold" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="edit"
            startContent={<Icon icon="solar:pen-bold" />}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<Icon icon="solar:trash-bin-minimalistic-2-bold" />}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <CardBody className="px-4">
        <div className="grid grid-cols-4 space-x-6 items-center justify-center">
          <div className="relative col-span-1">
            <Image
              alt="Album cover"
              className="object-cover w-full h-full"
              shadow="none"
              src="/images/empty-cart.svg"
            />
          </div>
          <div className="flex flex-col col-span-3">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <Chip color="primary" variant="flat" size="sm">
                  Home
                </Chip>
                <h3 className="font-semibold text-foreground/90 mt-2 line-clamp-3">
                  Phum Ou Baek K`om, Sangkat Ou Baek K`am, Khan Sen Sok, Phnom
                  Penh, 120805, Cambodia
                </h3>
                <div className="flex gap-3 mt-2">
                  <p className=" text-sm font-light">Van soklay</p>
                  <p className=" text-sm font-light">096124365</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MyLocation;
