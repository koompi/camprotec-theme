"use client";

import React from "react";
import { Link, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import MyLocation from "./components/MyLocation";
import { CUSTOMER_ADDRESS } from "@/graphql/delivery";
import { useQuery } from "@apollo/client";
import { CustomerAddressType } from "@/types/checkout";

export default function Page() {
  const { data, loading } = useQuery(CUSTOMER_ADDRESS);

  if (loading) {
    return null;
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-xl font-medium">My Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
        {data?.storeAddress?.map((ad: CustomerAddressType, idx: number) => {
          return (
            <MyLocation
              key={idx}
              id={ad?.id}
              lat={ad?.lat}
              lng={ad.lng}
              firstName={ad.firstName}
              lastName={ad.lastName}
              addressName={ad.addressName}
              phoneNumber={ad.phoneNumber}
              photos={ad.photos}
              storeId={ad.storeId}
              label={ad.label}
            />
          );
        })}
        <Link
          href="/locations/create"
          className="w-full h-40 border border-dashed rounded-xl items-center justify-center hidden sm:hidden lg:flex"
          underline="hover"
        >
          <div className="flex gap-3">
            <Icon icon="solar:map-point-add-linear" fontSize={24} />
            Add New Location
          </div>
        </Link>
      </div>
      <div className="fixed sm:fixed lg:hidden bottom-0 right-0 z-40 flex items-center justify-center bg-base-100 w-full h-16">
        <div className="container mx-auto px-3 ">
          <Button
            size="lg"
            fullWidth
            color="primary"
            className="text-background"
            as={Link}
            href="/locations/create"
          >
            Add New Location
          </Button>
        </div>
      </div>
    </section>
  );
}
