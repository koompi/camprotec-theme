"use client";
import React from "react";
import MyLocation from "./components/MyLocation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Link } from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { CUSTOMER_ADDRESS } from "@/graphql/delivery";

const PageLocations = () => {
  const { loading, data, refetch } = useQuery(CUSTOMER_ADDRESS);

  console.log("data", data);

  if (loading) {
    return "loading";
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-xl font-medium">My Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
        <MyLocation />
        <MyLocation />
        <MyLocation />
        <MyLocation />
        <Link
          href="/locations/create"
          className="w-full border border-dashed rounded-xl items-center justify-center hidden sm:hidden lg:flex"
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
            className="text-base-100"
            as={Link}
            href="/locations/create"
          >
            Add New Location
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PageLocations;
