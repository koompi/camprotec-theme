"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Badge,
  Input,
  CardFooter,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/useAuth";

export default function Component() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center py-12">
      <Card
        className="container mx-auto max-w-5xl px-3 sm:px-3 lg:px-12 py-6"
        shadow="none"
      >
        <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
          <p className="text-large">Account Details</p>
          <div className="flex gap-4 py-4">
            <Badge
              classNames={{
                badge: "w-5 h-5",
              }}
              color="primary"
              content={
                <Button
                  isIconOnly
                  className="p-0 text-base-100"
                  radius="full"
                  size="sm"
                  variant="light"
                >
                  <Icon icon="solar:pen-2-linear" />
                </Button>
              }
              placement="bottom-right"
              shape="circle"
            >
              <Avatar
                className="h-14 w-14"
                isBordered
                src={user?.avatar}
                alt={user?.fullname}
              />
            </Badge>
            <div className="flex flex-col items-start justify-center">
              <p className="font-medium">{user?.fullname}</p>
              <span className="text-small text-default-500">{user?.email}</span>
            </div>
          </div>
          <p className="text-small text-default-400">
            The photo will be used for your profile, and will be visible to
            other users of the platform.
          </p>
        </CardHeader>
        <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Email */}
          <Input
            label="Email"
            labelPlacement="outside"
            placeholder="Enter email"
          />
          {/* Phone Number */}
          <Input
            label="Phone Number"
            labelPlacement="outside"
            placeholder="Enter phone number"
          />
          {/* First Name */}
          <Input
            label="First Name"
            labelPlacement="outside"
            placeholder="Enter first name"
          />
          {/* Last Name */}
          <Input
            label="Last Name"
            labelPlacement="outside"
            placeholder="Enter last name"
          />
        </CardBody>

        <CardFooter className="mt-4 justify-end gap-2">
          <Button radius="full" variant="bordered">
            Cancel
          </Button>
          <Button color="primary" radius="full" className="text-base-100">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
