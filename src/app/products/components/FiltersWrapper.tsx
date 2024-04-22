"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { cn } from "@/utils/cn";

// import ColorRadioItem from "./color-radio-item";
import PriceSlider from "./PriceSlider";
import { Filter } from "@/types/filterTypes";
import { Category, SubCategory } from "@/types/category";
import { useSearchParams } from "next/navigation";
import SidebarDrawer from "./SidebarDrawer";

export type FiltersWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  items: Filter[];
  categories: Category[];
  title?: string;
  showTitle?: boolean;
  showActions?: boolean;
  className?: string;
  scrollShadowClassName?: string;
  total: number;
  onCloseBase: () => void;
};

const FiltersWrapper = React.forwardRef<HTMLDivElement, FiltersWrapperProps>(
  (
    {
      title = "Filters",
      showTitle = true,
      className,
      categories,
      total,
      onCloseBase,
    },
    ref
  ) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || null;
    const cat = searchParams.get("category") || null;
    const sub = searchParams.get("sub_category") || null;
    const sortParam = searchParams.get("sort") || null;
    const min = searchParams.get("min_price") || null;
    const max = searchParams.get("max_price") || null;

    const [selected, setSelected] = useState(sub);
    const [subcat, setSubCat] = useState<SubCategory[]>();
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

    return (
      <>
        <div className="block sm:block lg:hidden">
          <SidebarDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
            <div className="px-6 py-3">
              <h3 className="text-medium font-medium leading-8 text-default-600">
                Categories
              </h3>
              <div className="flex flex-col gap-1 items-center container mx-auto py-3">
                {subcat?.map((sub: SubCategory, idx: number) => {
                  return (
                    <Button
                      key={idx}
                      variant="light"
                      size="sm"
                      className="text-start w-full justify-start"
                      onClick={() => {
                        router.push(
                          `?search${search ? search : ""}=&category=${
                            cat ? cat : ""
                          }&sub_category=${sub?.id ? sub?.id : ""}&sort=${
                            sortParam ? sortParam : ""
                          }`
                        );
                        onClose();
                        onCloseBase();
                      }}
                    >
                      <span className="text-sm w-full flex items-center justify-between gap-3">
                        {sub?.title?.en}{" "}
                        {sub?.products > 0 && (
                          <Chip size="sm" color="primary" variant="flat">
                            {sub?.products}
                          </Chip>
                        )}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </SidebarDrawer>
        </div>
        <div
          ref={ref}
          className={cn(
            "h-full w-full max-w-sm rounded-medium bg-content1 p-6 pb-16 ",
            className
          )}
        >
          {showTitle && (
            <>
              <h2 className="text-large font-medium text-foreground">
                {title}
              </h2>
              <Divider className="my-3 bg-default-100" />
            </>
          )}

          {/* Price range */}
          <PriceSlider
            aria-label="Price Range"
            range={{
              min: 0,
              defaultValue: [
                min ? parseInt(min as string) : 0,
                max ? parseInt(max as string) : 5000,
              ],
              max: 5000,
              step: 100,
            }}
          />

          {/* Categories */}

          {categories && (
            <>
              <div className="hidden sm:hidden lg:block">
                <h3 className="text-medium font-medium leading-8 text-default-600">
                  Categories
                </h3>
                <Accordion>
                  {categories?.map((cat: Category) => {
                    return (
                      <AccordionItem
                        key={cat?.id}
                        aria-label={cat?.title?.en}
                        isCompact
                        title={
                          <span className="text-sm">
                            {cat?.title?.en}{" "}
                            <Chip
                              size="sm"
                              color="primary"
                              variant="flat"
                            >{`${cat?.products}`}</Chip>
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
                          {cat?.children?.map(
                            (sub: SubCategory, idx: number) => (
                              <Radio key={idx} value={sub?.id}>
                                {sub?.title?.en}{" "}
                                <Chip size="sm" variant="flat" color="primary">
                                  {sub?.products}
                                </Chip>
                              </Radio>
                            )
                          )}
                        </RadioGroup>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
              <div className="flex sm:flex lg:hidden flex-col gap-1 my-3">
                {categories?.map((cat: Category, idx: number) => {
                  return (
                    <Button
                      key={idx}
                      variant="light"
                      size="sm"
                      className="text-start w-full justify-start"
                      onClick={() => {
                        onOpen();
                        router.push(
                          `?search${search ? search : ""}=&category=${
                            cat?.id ? cat?.id : ""
                          }&sort=${sortParam ? sortParam : ""}`
                        );
                        setSubCat(cat?.children);
                      }}
                    >
                      <span className="text-sm w-full flex items-center justify-between gap-3">
                        {cat?.title?.en}{" "}
                        {cat?.products > 0 && (
                          <Chip size="sm" color="primary" variant="flat">
                            {cat?.products}
                          </Chip>
                        )}
                      </span>
                    </Button>
                  );
                })}
              </div>
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
      </>
    );
  }
);

FiltersWrapper.displayName = "FiltersWrapper";

export default FiltersWrapper;
