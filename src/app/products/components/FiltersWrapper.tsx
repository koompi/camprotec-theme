"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { cn } from "@/utils/cn";

// import ColorRadioItem from "./color-radio-item";
import PriceSlider from "./PriceSlider";
import { Filter } from "@/types/filterTypes";
import { CATEGORIES } from "@/graphql/category";
import { useQuery } from "@apollo/client";
import { Category, SubCategory } from "@/types/category";
import { useSearchParams } from "next/navigation";

export type FiltersWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  items: Filter[];
  title?: string;
  showTitle?: boolean;
  showActions?: boolean;
  className?: string;
  scrollShadowClassName?: string;
};

const FiltersWrapper = React.forwardRef<HTMLDivElement, FiltersWrapperProps>(
  ({ title = "Filters", showTitle = true, className }, ref) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || null;
    const sub = searchParams.get("sub_category") || null;
    const sortParam = searchParams.get("sort") || null;
    const min = searchParams.get("min_price") || null;
    const max = searchParams.get("max_price") || null;

    console.log(min, max);

    const [selected, setSelected] = useState(sub);

    const { data, loading } = useQuery(CATEGORIES);

    if (loading) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "h-full w-full max-w-sm rounded-medium bg-content1 p-6",
          className
        )}
      >
        {showTitle && (
          <>
            <h2 className="text-large font-medium text-foreground">{title}</h2>
            <Divider className="my-3 bg-default-100" />
          </>
        )}

        {/* Price range */}
        <PriceSlider
          aria-label="Price Range"
          range={{
            min: 0,
            defaultValue: [min ? parseInt(min) : 0, max ? parseInt(max) : 5000],
            max: 5000,
            step: 100,
          }}
        />

        {/* Categories */}
        {data?.storeOwnerCategories && (
          <>
            <h3 className="text-medium font-medium leading-8 text-default-600">
              Categories
            </h3>
            <Accordion>
              {data?.storeOwnerCategories?.map((cat: Category) => {
                return (
                  <AccordionItem
                    key={cat?.id}
                    aria-label={cat?.title?.en}
                    title={<span className="text-sm">{cat?.title?.en}</span>}
                    onPress={() => {
                      router.push(
                        `?search${search ? search : ""}=&category=${
                          cat?.id ? cat?.id : ""
                        }&sort=${sortParam ? sortParam : ""}`
                      );
                    }}
                  >
                    <RadioGroup
                      aria-label={cat?.title?.en}
                      orientation="vertical"
                      color="primary"
                      value={selected as string}
                      defaultValue={selected as string}
                      onValueChange={(value) => {
                        setSelected(value),
                          router.push(
                            `?search${search ? search : ""}=&category=${
                              cat?.id ? cat?.id : ""
                            }&sub_category=${value ? value : ""}&sort=${
                              sortParam ? sortParam : ""
                            }`
                          );
                      }}
                    >
                      {cat?.children?.map((sub: SubCategory, idx: number) => (
                        <Radio key={idx} value={sub?.id}>
                          {sub?.title?.en}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </>
        )}

        <>
          <Divider className="my-6 bg-default-100" />
          <Button
            className="text-default-500"
            variant="flat"
            fullWidth
            onPress={() => {
              router.push("/products");
            }}
          >
            Clear all filters
          </Button>
        </>
      </div>
    );
  }
);

FiltersWrapper.displayName = "FiltersWrapper";

export default FiltersWrapper;
