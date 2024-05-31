"use client";
import { useCallback, useState } from "react";
import { Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchProduct = ({ routeBack }: { routeBack: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cat = searchParams.get("category") || null;
  const sub = searchParams.get("sub_category") || null;
  const sortParam = searchParams.get("sort") || null;
  const brands = searchParams.get("brands") || null;

  const [filterValue, setFilterValue] = useState("");

  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setFilterValue(value);
      } else {
        router.push(routeBack);
        setFilterValue("");
      }
    },
    [routeBack, router]
  );

  const onClear = useCallback(() => {
    router.push(routeBack);
  }, [routeBack, router]);

  const key = (e: any): void => {
    if (e.key == "Enter") {
      if (filterValue) {
        router.push(
          `?search=${filterValue ? filterValue : ""}&brands=${brands ? brands : ""}&category=${
            cat ? cat : ""
          }&sub_category=${sub ? sub : ""}&sort=${sortParam ? sortParam : ""}`
        );
      }
    }
  };

  return (
    <Input
      isClearable
      variant="faded"
      className="w-[20vw]"
      placeholder={"Find your product here ..."}
      labelPlacement="outside"
      value={filterValue}
      size="lg"
      onClear={() => onClear()}
      onKeyUp={key}
      onValueChange={onSearchChange}
    />
  );
};
