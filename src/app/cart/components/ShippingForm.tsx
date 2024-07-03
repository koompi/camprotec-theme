"use client";

import type { InputProps } from "@nextui-org/react";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Card,
  Divider,
  Image,
  Link,
  RadioGroup,
} from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { CUSTOMER_ADDRESS, DELIVERIES } from "@/graphql/delivery";
import { CustomerAddressType, DeliveryType } from "@/types/checkout";
import CustomRadio from "./CustomRadio";
import { Icon } from "@iconify/react";
import { useTheme } from "@/context/useTheme";
import { GET_ALL_LOCATIONS } from "@/graphql/location";
import { LocationType } from "@/types/location";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
  delivery: "PERSIONAL" | "L192" | "CP";
  setDelivery: Function;
  location: string | null;
  setLocation: Function;
};

const ShippingForm = React.forwardRef<HTMLDivElement, ShippingFormProps>(
  ({ delivery, setDelivery, location, setLocation, className }, ref) => {
    const deliveryRadioClasses = {
      wrapper: "group-data-[selected=true]:border-foreground",
      base: "data-[selected=true]:border-foreground",
      control: "bg-foreground",
    };
    const { value } = useTheme();

    const { data, loading } = useQuery(DELIVERIES);
    const { data: locations, loading: loadingAddress } =
      useQuery(GET_ALL_LOCATIONS);

    if (loading || loadingAddress) {
      return "Loading...";
    }

    return (
      <div>
        <h1 className="font-semibold text-xl pb-4">Delivery address</h1>
        <Card shadow="sm" className="p-8">
          {locations?.storeLocations?.map((location: LocationType) => {
            return (
              <div className="space-y-1 pb-4 leading-normal">
                <div className="text-xl font-semibold">
                  {location?.firstName} {location?.lastName}
                </div>
                <div className="leading-snug">
                  <div>{location?.email}</div>
                  <div>{location?.phoneNumber}</div>
                </div>
              </div>
            );
          })}
          <Divider />
          <div className="mt-6 flex space-x-4">
            {delivery === "CP" && (
              <>
                <Image src="/images/logo_v1.png" className="h-12" />
                <div>
                  <div className="font-semibold">Delivery: 1.2$</div>
                  <div>Cambodia POS</div>
                </div>
              </>
            )}
            {delivery === "L192" && (
              <>
                <Image src="/images/l192.png" className="h-12" />
                <div>
                  <div className="font-semibold">Delivery: 1.2$</div>
                  <div>L912 Delivery</div>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
      // <>
      //   <Accordion
      //     defaultExpandedKeys={["1", "2"]}
      //     selectionMode="multiple"
      //     showDivider={false}
      //   >
      //     <AccordionItem key="1" aria-label="Delivery" title="Delivery Option">
      //       <RadioGroup
      //         aria-label="Select existing payment method"
      //         classNames={{ wrapper: "gap-3" }}
      //         onValueChange={(value) => {
      //           setShip(value);
      //         }}
      //       >
      //         {JSON.stringify(locations)}
      //         {/* {data?.storeDeliveries?.map((del: DeliveryType, idx: number) => {
      //           return (
      //             <CustomRadio
      //               key={idx}
      //               classNames={deliveryRadioClasses}
      //               description={del?.instruction}
      //               icon={
      //                 <Image
      //                   alt="delivery logo"
      //                   // src={del?.logo ? del?.logo : "/images/shop.png"}
      //                   src="/images/l192.svg"
      //                   radius="none"
      //                   className="h-12"
      //                 />
      //               }
      //               label={
      //                 del?.express === "PERSONAL"
      //                   ? "Shop Delivery"
      //                   : "L192 Delivery"
      //               }
      //               value={del?.id}
      //             />
      //           );
      //         })} */}
      //         <CustomRadio
      //           key={2}
      //           classNames={deliveryRadioClasses}
      //           isRecommended
      //           description=""
      //           icon={
      //             <Image
      //               alt="delivery logo"
      //               src={
      //                 !value?.header?.logo
      //                   ? "/images/shop.png"
      //                   : value?.header?.logo
      //               }
      //               radius="none"
      //               className="w-24"
      //             />
      //           }
      //           label="Shop Delivery"
      //           value="PERSONAL"
      //         />
      //       </RadioGroup>
      //     </AccordionItem>
      //     <AccordionItem
      //       key="2"
      //       aria-label="Delivery to address"
      //       title="Delivery to address"
      //     >
      //       <RadioGroup
      //         aria-label="Select existing payment method"
      //         classNames={{ wrapper: "gap-3" }}
      //         defaultValue={toDelivery as any}
      //         onValueChange={async (value) => {
      //           setToDelivery(value as unknown as CustomerAddressType);
      //         }}
      //       >
      //         {/* {address?.storeAddress?.map(
      //           (ad: CustomerAddressType, idx: number) => {
      //             return (
      //               <CustomRadio
      //                 key={idx}
      //                 classNames={deliveryRadioClasses}
      //                 description={`${ad.firstName} ${ad.lastName}, ${ad.phoneNumber}`}
      //                 chip={ad.label}
      //                 icon={
      //                   <Image
      //                     alt="shop"
      //                     src={
      //                       ad.photos.length > 0
      //                         ? ad.photos[0]
      //                         : "/images/shop.png"
      //                     }
      //                     radius="none"
      //                     className="w-12"
      //                   />
      //                 }
      //                 label={ad.addressName}
      //                 value={ad as any}
      //               />
      //             );
      //           }
      //         )} */}
      //       </RadioGroup>
      //     </AccordionItem>
      //   </Accordion>
      //   <Link
      //     href="/locations/create"
      //     className="w-full h-28 border border-dashed rounded-xl items-center justify-center "
      //     underline="hover"
      //   >
      //     <div className="flex gap-3">
      //       <Icon icon="solar:map-point-add-linear" fontSize={24} />
      //       Add Location
      //     </div>
      //   </Link>
      // </>
    );
  }
);

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
