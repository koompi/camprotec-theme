"use client";

import type { InputProps } from "@nextui-org/react";
import React from "react";
import {
  Accordion,
  AccordionItem,
  Image,
  Link,
  RadioGroup,
} from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { CUSTOMER_ADDRESS, DELIVERIES } from "@/graphql/delivery";
import { CustomerAdressType, DeliveryType } from "@/types/checkout";
import CustomRadio from "./CustomRadio";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
  ship: string;
  setShip: Function;
  toDelivery: CustomerAdressType | null;
  setToDelivery: Function;
};

const ShippingForm = React.forwardRef<HTMLDivElement, ShippingFormProps>(
  ({ ship, setShip, toDelivery, setToDelivery, className }, ref) => {
    const deliveryRadioClasses = {
      wrapper: "group-data-[selected=true]:border-foreground",
      base: "data-[selected=true]:border-foreground",
      control: "bg-foreground",
    };

    const { data, loading } = useQuery(DELIVERIES);
    const { data: address, loading: loadingAddress } =
      useQuery(CUSTOMER_ADDRESS);

    if (loading || !data || !address || loadingAddress) {
      return null;
    }

    return (
      <>
        <Accordion
          defaultExpandedKeys={["1", "2"]}
          selectionMode="multiple"
          showDivider={false}
        >
          <AccordionItem key="1" aria-label="Delivery" title="Delivery">
            <RadioGroup
              aria-label="Select existing payment method"
              classNames={{ wrapper: "gap-3" }}
              defaultValue={ship}
              onValueChange={(value) => {
                setShip(value);
              }}
            >
              {data?.storeDeliveries?.map((del: DeliveryType, idx: number) => {
                return (
                  <CustomRadio
                    key={idx}
                    isRecommended={del?.express !== "PERSONAL"}
                    classNames={deliveryRadioClasses}
                    description={del?.instruction}
                    icon={
                      <Image
                        alt="delivery logo"
                        src={
                          del?.logo
                            ? `${process.env.NEXT_PUBLIC_IPFS}/api/ipfs?hash=${del?.logo}`
                            : "/images/shop.png"
                        }
                        radius="none"
                        className="w-12"
                      />
                    }
                    label={
                      del?.express === "PERSONAL"
                        ? "Shop Delivery"
                        : "L192 Delivery"
                    }
                    value={del?.id}
                  />
                );
              })}
            </RadioGroup>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Delivery to address"
            title="Delivery to address"
          >
            <RadioGroup
              aria-label="Select existing payment method"
              classNames={{ wrapper: "gap-3" }}
              defaultValue={toDelivery as any}
              onValueChange={async (value) => {
                setToDelivery(value as unknown as CustomerAdressType);
              }}
            >
              {address?.storeAddress?.map(
                (ad: CustomerAdressType, idx: number) => {
                  return (
                    <CustomRadio
                      key={idx}
                      classNames={deliveryRadioClasses}
                      description={`${ad.firstName} ${ad.lastName}, ${ad.phoneNumber}`}
                      chip={ad.label}
                      icon={
                        <Image
                          alt="shop"
                          src={
                            ad.photos.length > 0
                              ? ad.photos[0]
                              : "/images/shop.png"
                          }
                          radius="none"
                          className="w-12"
                        />
                      }
                      label={ad.addressName}
                      value={ad as any}
                    />
                  );
                }
              )}
            </RadioGroup>
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
