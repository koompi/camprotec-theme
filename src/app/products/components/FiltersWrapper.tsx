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
import { Category, SubCategory } from "@/types/category";
import { useSearchParams } from "next/navigation";

export type FiltersWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  items: Filter[];
  categories: Category[];
  title?: string;
  showTitle?: boolean;
  showActions?: boolean;
  className?: string;
  scrollShadowClassName?: string;
};

const FiltersWrapper = React.forwardRef<HTMLDivElement, FiltersWrapperProps>(
  ({ title = "Filters", showTitle = true, className, categories }, ref) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || null;
    const sub = searchParams.get("sub_category") || null;
    const sortParam = searchParams.get("sort") || null;
    const min = searchParams.get("min_price") || null;
    const max = searchParams.get("max_price") || null;

    const [selected, setSelected] = useState(sub);

    return (
      <div
        ref={ref}
        className={cn(
          "h-full w-full max-w-sm rounded-medium bg-content1 p-6 pb-16 ",
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
            defaultValue: [min ? parseInt(min as string) : 0, max ? parseInt(max as string) : 5000],
            max: 5000,
            step: 100,
          }}
        />

        {/* Categories */}
        {categories && (
          <>
            <h3 className="text-medium font-medium leading-8 text-default-600">
              Categories
            </h3>
            <Accordion>
              {categories?.map((cat: Category) => {
                return (
                  <AccordionItem
                    key={cat?.id}
                    aria-label={cat?.title?.en}
                    title={
                      <span className="text-sm">
                        {cat?.title?.en} {`(${cat?.children?.length})`}
                      </span>
                    }
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
