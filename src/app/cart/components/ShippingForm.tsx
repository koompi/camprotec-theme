"use client";

import type { InputProps } from "@nextui-org/react";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Image,
  Input,
  Link,
  RadioGroup,
  ScrollShadow,
} from "@nextui-org/react";

import { cn } from "@/utils/cn";
import countries from "@/utils/countries";
import PaymentMethodRadio from "./PaymentMethodRadio";
import { VisaIcon, MasterCardIcon, PayPalIcon } from "./Providers";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
};

const ShippingForm = React.forwardRef<HTMLDivElement, ShippingFormProps>(
  ({ variant = "flat", className, hideTitle }, ref) => {
    const deliveryRadioClasses = {
      wrapper: "group-data-[selected=true]:border-foreground",
      base: "data-[selected=true]:border-foreground",
      control: "bg-foreground",
    };

    return (
      // <Accordion>
      //   <AccordionItem
      //     key="1"
      //     aria-label="Add new delivery location"
      //     title="Add new delivery location"
      //   >
      //     <div ref={ref} className={cn("flex flex-col gap-4", className)}>
      //       {!hideTitle && (
      //         <span className="relative text-foreground-500">
      //           Shipping Information
      //         </span>
      //       )}
      //       <Input
      //         isRequired
      //         label="Email address"
      //         labelPlacement="outside"
      //         placeholder="Enter your email"
      //         type="email"
      //         variant={variant}
      //       />
      //       <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
      //         <Input
      //           isRequired
      //           label="First name"
      //           labelPlacement="outside"
      //           placeholder="Enter your first name"
      //           variant={variant}
      //         />
      //         <Input
      //           isRequired
      //           label="Last name"
      //           labelPlacement="outside"
      //           placeholder="Enter your last name"
      //           variant={variant}
      //         />
      //       </div>
      //       <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
      //         <Input
      //           isRequired
      //           label="Phone number"
      //           labelPlacement="outside"
      //           placeholder="## ### ###"
      //           variant={variant}
      //         />
      //       </div>
      //     </div>
      //   </AccordionItem>
      // </Accordion>
      <>
        <Accordion
          defaultExpandedKeys={["1", "2"]}
          selectionMode="multiple"
          showDivider={false}
        >
          <AccordionItem key="1" aria-label="Delivery" title="Delivery">
            <ScrollShadow className="w-full max-h-[400px] hide-scroll-bar">
              <RadioGroup
                aria-label="Select existing payment method"
                classNames={{ wrapper: "gap-3" }}
                defaultValue="4229"
              >
                <PaymentMethodRadio
                  classNames={deliveryRadioClasses}
                  description="$2.00 In Phnom Penh"
                  icon={
                    <Image
                      alt="shop"
                      src="/images/shop.png"
                      radius="none"
                      className="w-12"
                    />
                  }
                  label="Shop Delivery"
                  value="shop"
                />
                <PaymentMethodRadio
                  isRecommended
                  classNames={deliveryRadioClasses}
                  description="Price is base on current location"
                  icon={
                    <Image
                      alt="shop"
                      src="/images/l192.png"
                      radius="none"
                      className="w-12"
                    />
                  }
                  label="L192 Delivery"
                  value="l192"
                />
              </RadioGroup>
            </ScrollShadow>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Delivery to address"
            title="Delivery to address"
          >
            <ScrollShadow className="w-full max-h-[400px] hide-scroll-bar">
              <RadioGroup
                aria-label="Select existing payment method"
                classNames={{ wrapper: "gap-3" }}
                defaultValue="4229"
              >
                <PaymentMethodRadio
                  isRecommended
                  classNames={deliveryRadioClasses}
                  description="soklay van, 0961234567"
                  icon={
                    <Image
                      alt="shop"
                      src="/images/shop.png"
                      radius="none"
                      className="w-12"
                    />
                  }
                  label="Phum Ou Baek K`om, Sangkat Ou Baek K`am, Khan Sen Sok, Phnom Penh, 120805, Cambodia"
                  value="home"
                />
                <PaymentMethodRadio
                  classNames={deliveryRadioClasses}
                  description="soklay van, 0961234567"
                  icon={
                    <Image
                      alt="shop"
                      src="/images/shop.png"
                      radius="none"
                      className="w-12"
                    />
                  }
                  label="Phum Ou Baek K`om, Sangkat Ou Baek K`am, Khan Sen Sok, Phnom Penh, 120805, Cambodia"
                  value="school"
                />
                <PaymentMethodRadio
                  classNames={deliveryRadioClasses}
                  description="soklay van, 0961234567"
                  icon={
                    <Image
                      alt="shop"
                      src="/images/shop.png"
                      radius="none"
                      className="w-12"
                    />
                  }
                  label="Phum Ou Baek K`om, Sangkat Ou Baek K`am, Khan Sen Sok, Phnom Penh, 120805, Cambodia"
                  value="office"
                />
                <PaymentMethodRadio
                  classNames={deliveryRadioClasses}
                  description="soklay van, 0961234567"
                  icon={
                    <Image
                      alt="shop"
                      src="/images/shop.png"
                      radius="none"
                      className="w-12"
                    />
                  }
                  label="Phum Ou Baek K`om, Sangkat Ou Baek K`am, Khan Sen Sok, Phnom Penh, 120805, Cambodia"
                  value="others"
                />
              </RadioGroup>
            </ScrollShadow>
          </AccordionItem>
        </Accordion>
        <Link href="/locations/create" underline="always">
          Add new delivery location?
        </Link>
      </>
    );
  }
);

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
