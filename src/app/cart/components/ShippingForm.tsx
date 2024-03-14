"use client";

import type { InputProps } from "@nextui-org/react";

import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Input,
} from "@nextui-org/react";

import { cn } from "@/utils/cn";
import countries from "@/utils/countries";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
};

const ShippingForm = React.forwardRef<HTMLDivElement, ShippingFormProps>(
  ({ variant = "flat", className, hideTitle }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)}>
        {!hideTitle && (
          <span className="relative text-foreground-500">
            Shipping Information
          </span>
        )}
        <Input
          isRequired
          label="Email address"
          labelPlacement="outside"
          placeholder="Enter your email"
          type="email"
          variant={variant}
        />
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <Input
            isRequired
            label="First name"
            labelPlacement="outside"
            placeholder="Enter your first name"
            variant={variant}
          />
          <Input
            isRequired
            label="Last name"
            labelPlacement="outside"
            placeholder="Enter your last name"
            variant={variant}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <Input
            isRequired
            label="Phone number"
            labelPlacement="outside"
            placeholder="## ### ###"
            variant={variant}
          />
        </div>
      </div>
    );
  }
);

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
