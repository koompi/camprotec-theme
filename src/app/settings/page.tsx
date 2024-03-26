"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Badge,
  Input,
  CardFooter,
  Radio,
  RadioGroup,
  Chip,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/useAuth";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutation/user";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { validateNumber } from "@/utils/phone";

interface FormUpdateUserProfile {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  phoneNumber?: string;
  username?: string;
}

const initialNewPhone = {
  phoneNumber: "",
  isInternal: false,
  isVerified: false,
  isActived: false,
  isBanned: false,
};

export default function Component() {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<FormUpdateUserProfile>();
  const [value, setValue] = useState<string>("");
  const [newPhone, setNewPhone] = useState(initialNewPhone);
  const [operator, setOperator] = useState("");
  const [color, setColor] = useState<"warning" | "success" | "danger" | null>(
    null
  );
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const [updateUser, { loading }] = useMutation(UPDATE_USER);

  const onSubmit = async (data: FormUpdateUserProfile) => {
    const input = {
      ...data,
      gender: value,
    };

    console.log("input", input);

    // updateUser({ variables: { input } })
    //   .then(() => {
    //     toast.success("User has been updated!");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // phone validator
  useEffect(() => {
    if (operator.toLocaleLowerCase() === "cellcard") {
      setColor("warning");
    }
    if (operator.toLocaleLowerCase() === "smart") {
      setColor("success");
    }
    if (operator.toLocaleLowerCase() === "metfone") {
      setColor("danger");
    }
  }, [operator]);

  useEffect(() => {
    if (newPhone.phoneNumber !== "") {
      try {
        const valid = validateNumber({ phoneNumber: newPhone.phoneNumber });
        if (valid.name) {
          setIsValid(true);
          setValidationMessage("");
          setOperator(valid.name);
        }
      } catch (error: any) {
        if (error) {
          setIsValid(false);
          setValidationMessage(error.detail.message);
          setOperator("");
        }
      }
    }
  }, [newPhone.phoneNumber]);

  function handleNewPhoneChange(e: any) {
    const { name, value } = e.target;
    const object = {
      ...newPhone,
      [name]: value,
    };
    setNewPhone(() => object);
  }

  return (
    <>
      <Toaster position="top-right" closeButton />
      <div className="flex items-center justify-center py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container mx-auto max-w-5xl px-3 sm:px-3 lg:px-12 py-6"
        >
          <Card shadow="none">
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
                  <span className="text-small text-default-500">
                    {user?.email}
                  </span>
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
                defaultValue={user?.email}
                isDisabled
              />

              {/* Phone Number */}
              <Input
                variant="bordered"
                label="Phone number"
                labelPlacement="outside"
                size="lg"
                placeholder="0xx xx xxx"
                {...register("phoneNumber")}
                defaultValue={newPhone.phoneNumber}
                value={newPhone.phoneNumber}
                onChange={handleNewPhoneChange}
                type="number"
                endContent={
                  operator !== "" && (
                    <Chip size="sm" color={color as any}>
                      {operator}
                    </Chip>
                  )
                }
                isInvalid={!isValid}
                errorMessage={validationMessage}
              />
              {/* <Input
                label="Phone Number"
                labelPlacement="outside"
                placeholder="Enter phone number"
                {...register("phoneNumber")}
              /> */}
              {/* username */}
              <Input
                label="Username"
                labelPlacement="outside"
                placeholder="Enter username"
                {...register("username")}
              />

              {/* Phone Number */}
              <RadioGroup
                label="Select your gender"
                orientation="horizontal"
                // {...register("gender")}
                value={value}
                onValueChange={(value) => {
                  setValue(value);
                }}
              >
                <Radio value="MALE">Male</Radio>
                <Radio value="FEMALE">Female</Radio>
              </RadioGroup>
              {/* First Name */}
              <Input
                label="First Name"
                labelPlacement="outside"
                placeholder="Enter first name"
                defaultValue={user?.first_name}
                {...register("firstName")}
              />
              {/* Last Name */}
              <Input
                label="Last Name"
                labelPlacement="outside"
                placeholder="Enter last name"
                defaultValue={user?.last_name}
                {...register("lastName")}
              />
            </CardBody>

            <CardFooter className="mt-4 justify-end gap-2">
              <Button radius="full" variant="bordered">
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                radius="full"
                className="text-base-100"
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
