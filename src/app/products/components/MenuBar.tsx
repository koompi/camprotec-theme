"use client";

import { Button, Select, SelectItem } from "@nextui-org/react";
import { SearchProduct } from "./Search";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useSearchParams } from "next/navigation";

const MenuBar = ({ onOpen }: { onOpen: () => void }) => {
  const router = useRouter();
  const search = useSearchParams();
  const sort = search.get("sort") as string;
  const selected = sort?.length > 0 ? sort : "all" ;
  return (
    <>
      <header className="relative z-20 flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3">
        <div className="flex items-center gap-1 md:hidden md:gap-2">
          <h2 className="text-large font-medium">Find your products</h2>
        </div>
        <div className="flex items-center justify-between gap-2 ">
          <div className="flex flex-row gap-2">
            <Button
              className="flex border-default-200 sm:hidden"
              startContent={
                <Icon
                  className="text-default-500"
                  height={16}
                  icon="solar:filter-linear"
                  width={16}
                />
              }
              variant="bordered"
              onClick={onOpen}
            >
              Filters
            </Button>
            <div className="hidden items-center gap-1 md:flex">
              <SearchProduct
                routeBack={`?search=&category=${
                  search.get("category") ? search.get("category") : ""
                }&sub_category=${
                  search.get("sub_category") ? search.get("sub_category") : ""
                }&sort=${search.get("sort") ? search.get("sort") : ""}`}
              />
            </div>
          </div>
          <Select
            selectionMode="single"
            aria-label="Sort by"
            classNames={{
              base: "items-center justify-end",
              label:
                "hidden lg:block text-tiny whitespace-nowrap md:text-small text-default-400",
              mainWrapper: "max-w-xs",
            }}
            label="Sort by"
            labelPlacement="outside-left"
            placeholder="Select an option"
            variant="bordered"
            selectedKeys={[selected]}
            onChange={(e) => {
              if(e.target.value == "all") {
                return router.push("/products")
              }
              router.push(
                `?search=${
                  search.get("search") ? search.get("search") : ""
                }&category=${
                  search.get("category") ? search.get("category") : ""
                }&sub_category=${
                  search.get("sub_category") ? search.get("sub_category") : ""
                }&sort=${e.target.value ? e.target.value : ""}`
              );
            }}
          >
            <SelectItem key="all">
              All Product
            </SelectItem>
            <SelectItem key="brand" value="brand">
              Brand
            </SelectItem>
            <SelectItem key="newest" value="newest">
              Newest
            </SelectItem>
            <SelectItem key="price_low_to_high" value="price_low_to_high">
              Price: Low to High
            </SelectItem>
            <SelectItem key="price_high_to_low" value="price_high_to_low">
              Price: High to Low
            </SelectItem>
            <SelectItem key="top_rated" value="top_rated">
              Top Rated
            </SelectItem>
            <SelectItem key="most_popular" value="most_popular">
              Most Popular
            </SelectItem>
          </Select>
        </div>
      </header>
    </>
  );
};

export default MenuBar;
