"use client";

import React, { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { GLOBAL_PRODUCT_FILTERING } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/graphql/category";
import { ProductType } from "@/types/product";
import { Category } from "@/types/category";
import ProductCard from "../components/ProductCard";
import { useForm, SubmitHandler } from "react-hook-form";

interface Range {
  end: number;
  start: number;
}

interface Sort {
  sort: number;
}
interface ProductFilter {
  id?: string[] | null;
  keyword?: string | null;
  status?: string | null;
  filter?: Sort | null;
  range?: Range | null;
}

interface FormSearch {
  search: string;
}

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || null;
  const cat = searchParams.get("category") || null;
  const sub = searchParams.get("sub_category") || null;

  const { register, handleSubmit } = useForm<FormSearch>();
  const [value, setValue] = useState("");

  const [filtering, setFiltering] = useState<ProductFilter>({
    id: null,
    keyword: null,
    status: null,
    filter: null,
    range: null,
  });

  const { data, loading } = useQuery(CATEGORIES);

  const { data: global, loading: globalLoading } = useQuery(
    GLOBAL_PRODUCT_FILTERING,
    {
      variables: {
        tagId: null,
        keyword: filtering.keyword,
        status: filtering.status === "price" ? "price" : null,
        range: filtering.range,
        filter: {
          skip: 0,
          limit: 10,
          sort: filtering.filter?.sort,
        },
      },
    }
  );

  const limitCats = data?.storeOwnerCategories?.slice(0, 10);

  if (globalLoading || !global || loading || !data) {
    return null;
  }

  const onSubmit: SubmitHandler<FormSearch> = () => {
    router.push(`/products?search=${value ? value : ""}&category=`);
  };

  return (
    <section className="container mx-auto px-2 sm:px-2 lg:px-6 py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 items-center"
      >
        <Input
          color="primary"
          {...(register("search"), { required: true })}
          radius="lg"
          size="lg"
          type="search"
          variant="bordered"
          placeholder="Find your product here ..."
          className="max-w-xl w-full"
          startContent={<Icon icon="fe:search" fontSize={21} />}
          onClear={() => {
            setValue(""), router.push(`?search=&category=`);
          }}
          isClearable
          isRequired
          value={value as string}
          onValueChange={(value) => {
            setValue(value);
          }}
        />
        <Button
          variant="shadow"
          type="submit"
          size="lg"
          color="primary"
          className="text-base-100"
          isIconOnly
        >
          <Icon icon="lucide:search" />
        </Button>
      </form>
      {limitCats?.length > 0 && (
        <div className="my-auto flex max-w-lg flex-col gap-2">
          <h3 className="text-lg font-bold leading-8 mt-3">Popular Search</h3>
          <div className="flex flex-wrap items-center gap-2">
            {limitCats?.map((cat: Category, idx: number) => {
              return (
                <Button
                  key={idx}
                  variant="flat"
                  size="sm"
                  className="w-auto"
                  as={Link}
                  href={`/products?search=&category=${cat.id}`}
                >
                  {cat.title.en}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {global?.storeGlobalFilterProducts?.length > 0 && (
        <div className="my-auto flex max-w-lg flex-col gap-2 pb-9">
          <h3 className="text-lg font-bold leading-8 mt-3">Trending Now</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2 border border-base-100">
            {global?.storeGlobalFilterProducts
              ?.slice(0, 10)
              ?.sort((a: ProductType, b: ProductType) =>
                a?.sell > b?.sell ? -1 : 1
              )
              ?.map((res: ProductType, idx: number) => {
                return (
                  <React.Fragment key={idx}>
                    <ProductCard product={res} loading={loading} />
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
