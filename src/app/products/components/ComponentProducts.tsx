"use client";

import { Category } from "@/types/category";
import ecommerceItems from "./EcommerceItems";
import FiltersWrapper from "./FiltersWrapper";
import SidebarDrawer from "./SidebarDrawer";
import { useDisclosure } from "@nextui-org/react";
import MenuBar from "./MenuBar";
import ProductCard from "@/app/components/ProductCard";
import { ProductType } from "@/types/product";
import { PaginationProduct } from "@/app/components/Pagination";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ComponentProducts({
  categories,
  products,
  searchParams,
  total,
  pages
}: {
  categories: Category[];
  products: ProductType[];
  searchParams?: { [key: string]: string | string[] | undefined };
  total: number;
  pages: number;
}) {
  const offset = useSearchParams().get("page") ?? "1";
  const limit = useSearchParams().get("size") ?? "20";
  const query_search = useSearchParams().get("search") ?? null;

  const [page, setPage] = useState(parseInt(offset));
  const [rowsPerPage, setRowsPerPage] = useState(parseInt(limit));

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const mostPopularSort = (): ProductType[] => {
    if (!products) {
      return [];
    }

    return [...products].sort((a: ProductType, b: ProductType) =>
      a.sell > b.sell ? -1 : 1
    );
  };

  const brandSort = (): ProductType[] => {
    if (!products) {
      return [];
    }
    return [...products].sort((a: ProductType, b: ProductType) =>
      a.brand > b.brand ? -1 : 1
    );
  };

  const topRated = (): ProductType[] => {
    if (!products) {
      return [];
    }
    return [...products].sort((a: ProductType, b: ProductType) =>
      a.rating > b.rating ? -1 : 1
    );
  };

  const newestSort = (): ProductType[] => {
    if (!products) {
      return [];
    }
    return [...products].sort((a: ProductType, b: ProductType) =>
      a.createdAt > b.createdAt ? -1 : 1
    );
  };

  const ProductSortComponent = () => {
    if (searchParams?.sortParam === "most_popular") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {mostPopularSort().map((res: ProductType, idx: number) => {
            return <ProductCard key={idx} product={res} loading={false} />;
          })}
        </div>
      );
    }
    if (searchParams?.sortParam === "newest") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {newestSort().map((res: ProductType, idx: number) => {
            return <ProductCard key={idx} product={res} loading={false} />;
          })}
        </div>
      );
    }
    if (searchParams?.sortParam === "top_rated") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {topRated().map((res: ProductType, idx: number) => {
            return <ProductCard key={idx} product={res} loading={false} />;
          })}
        </div>
      );
    }
    if (
      searchParams?.sort === "price_low_to_high" ||
      searchParams?.sort === "price_high_to_low"
    ) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {products.map((res: ProductType, idx: number) => {
            return <ProductCard key={idx} product={res} loading={false} />;
          })}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {brandSort().map((res: ProductType, idx: number) => {
            return <ProductCard key={idx} product={res} loading={false} />;
          })}
        </div>
      );
    }
  };
  return (
    <>
      <SidebarDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <FiltersWrapper
          className="bg-default-50 hide-scroll-bar"
          items={ecommerceItems}
          categories={categories}
          scrollShadowClassName="pb-12"
          showActions={false}
          title="Filter by"
        />
      </SidebarDrawer>
      <div className="w-full flex-1 flex-col">
        <MenuBar searchParams={searchParams} onOpen={onOpen} />
        <main className="mt-4 h-full w-full overflow-visible px-1">
          <ProductSortComponent />
          <div className="w-full flex justify-end mt-8 space-x-2">
            <PaginationProduct page={page} total={!query_search ? 1 : pages} rowsPerPage={rowsPerPage} setPage={setPage}  />
          </div>
        </main>
      </div>
    </>
  );
}
