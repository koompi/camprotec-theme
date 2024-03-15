"use client";
import React from "react";
import MyLocation from "./components/MyLocation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Link } from "@nextui-org/react";
// import { useQuery } from "@apollo/client";
// import { CUSTOMER_ADDRESS } from "@/graphql/delivery";
import { Address } from "./components/Address";

const PageLocations = () => {
  // const { loading, data, refetch } = useQuery(CUSTOMER_ADDRESS, {
  //   context: {
  //     headers: {
  //       Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2NWEyYjdiZjM4YmJmY2Y3NWEzZWZjNTUiLCJvaWQiOiI2NWYyNTg4MTcxNjQxYWJlYzFhZDIxNTAiLCJleHAiOjE3MTA1MDExODUsImlhdCI6MTcxMDM4MTE4NSwibmJmIjoxNzEwMzgxMTg1fQ.vAXbokAkASipHgyXDlf-H38PBrnY4u38toHVCIEpbLR9kd7prhigS-goVfJ_zUlK9RVub85tUJ22XosIdTeja_jl33HL_-cT772igtgEpng6AEbPzZ9tTXZVj8rexUN1g6f6_4JEQAe34_XqNpU8QFm9NPGYwFIpYbqea0OaNBDpZLc7xfirMZnSNnBpTL77FBwCWca0Z2y9sCJ4cAdFVpVxikSAn6wt_OhyQTk85rK5eBWvB_gWREOZoUsWu61Ec2sZ8qrAPrSBZflmFoVmwrRaiUzzwRlnQMgN9BdPl50okGTQdRDG0rPp7KccuR3JY8csdBnUoExj9k3Am_5PWJzj8fFGR3mJAig6S22AnJAbxuuM6mnIUgi3hlTOBR6vqjHoHosXL2cJu6lKbC7SPhnt0HiW0L5uB92fPcfzyyC3C10TgilnPNUzdlA5KLPtUerbegXhq0TCWNsrtWR2YN1DKeW4I741n_LEU8uVRqF_6ihdm-lDNk8KBXr-BJF5iewSpUM8jyoFZ3zqW6P7AJo6dGf7N6ULtQEGXQD0thmXCet40Fq15yQEeSNACBxokQYKjGHZ4ydqUSt62kuwvH-6w5qrIi5TZ9521pw7YiqCWjfrPgceBdGtrnCUqI6pnxzCIjjgDQGTeql2nNB3g6GAONrl7jDJPc2igs7ZeKU`,
  //     },
  //   },
  // });

  // console.log("data", data);

  // if (loading) {
  //   return "loading";
  // }

  // const client = getClient();

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-xl font-medium">My Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
        <Address />
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
