"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Radio,
  RadioGroup,
  ScrollShadow,
  Switch,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { cn } from "@/utils/cn";

// import ColorRadioItem from "./color-radio-item";
import PriceSlider from "./PriceSlider";
import RatingRadioGroup from "./RatingRadioGroup";
import TagGroupItem from "./TagGroupItem";
import { Filter, FilterTypeEnum } from "@/types/filterTypes";
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
  (
    {
      items,
      title = "Filters",
      showTitle = true,
      showActions = true,
      className,
      scrollShadowClassName,
    },
    ref
  ) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || null;
    const cats = searchParams.get("category") || null;
    const sub = searchParams.get("sub_category") || null;
    const sortParam = searchParams.get("sort") || null;

    const [selected, setSelected] = useState(sub);

    const renderFilter = React.useCallback((filter: Filter) => {
      switch (filter.type) {
        case FilterTypeEnum.Tabs:
          return (
            <Tabs fullWidth aria-label={filter.title}>
              {filter.options?.map((option) => (
                <Tab key={option.value} title={option.title} />
              ))}
            </Tabs>
          );
        case FilterTypeEnum.PriceRange:
          return <PriceSlider aria-label={filter.title} range={filter.range} />;

        case FilterTypeEnum.Rating:
          return <RatingRadioGroup />;

        case FilterTypeEnum.TagGroup:
          return (
            <CheckboxGroup
              aria-label="Select amenities"
              className="gap-1"
              orientation="horizontal"
            >
              {filter.options?.map((option) => (
                <TagGroupItem
                  key={option.value}
                  icon={option.icon}
                  value={option.value}
                >
                  {option.title}
                </TagGroupItem>
              ))}
            </CheckboxGroup>
          );
        case FilterTypeEnum.Toggle:
          return (
            <div className="-mx-4 flex flex-col">
              {filter.options?.map((option) => (
                <Switch
                  key={option.value}
                  classNames={{
                    base: cn(
                      "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                      "justify-between cursor-pointer rounded-lg gap-2 -mr-2 px-4 py-3"
                    ),
                    wrapper: "mr-0",
                  }}
                  value={option.value}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-medium">{option.title}</p>
                    <p className="text-tiny text-default-400">
                      {option.description}
                    </p>
                  </div>
                </Switch>
              ))}
            </div>
          );
        case FilterTypeEnum.CheckboxGroup:
          return (
            <Accordion
              className="px-0"
              defaultExpandedKeys={filter?.defaultOpen ? ["options"] : []}
            >
              <AccordionItem
                key="options"
                classNames={{
                  title: "text-medium font-medium leading-8 text-default-600",
                  trigger: "p-0",
                  content: "px-1",
                }}
                title={filter.title}
              >
                <CheckboxGroup aria-label={filter.title}>
                  {filter.options?.map((option) => (
                    <Checkbox key={option.value} value={option.value}>
                      {option.title}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </AccordionItem>
            </Accordion>
          );
        // case FilterTypeEnum.Color:
        //   return (
        //     <RadioGroup
        //       aria-label={filter.title}
        //       classNames={{
        //         wrapper: "gap-2",
        //       }}
        //       orientation="horizontal"
        //     >
        //       {filter.options?.map((option) => (
        //         <ColorRadioItem
        //           key={option.value}
        //           color={option.color}
        //           tooltip={option.title}
        //           value={option.value}
        //         />
        //       ))}
        //     </RadioGroup>
        //   );
      }
    }, []);

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
        <ScrollShadow
          className={cn(
            "-mx-6 h-full px-6",
            {
              "max-h-[calc(100%_-_220px)]": showActions,
            },
            scrollShadowClassName
          )}
        >
          <div className="flex flex-col gap-6">
            {items.map((filter) => (
              <div key={filter.title} className="flex flex-col gap-3">
                {filter.type !== FilterTypeEnum.CheckboxGroup ? (
                  <div>
                    <h3 className="text-medium font-medium leading-8 text-default-600">
                      {filter.title}
                    </h3>
                    <p className="text-small text-default-400">
                      {filter.description}
                    </p>
                  </div>
                ) : null}
                {renderFilter(filter)}
              </div>
            ))}
          </div>
        </ScrollShadow>

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
