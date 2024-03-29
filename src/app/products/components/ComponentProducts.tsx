"use client";

import { Category } from "@/types/category";
import ecommerceItems from "./EcommerceItems";
import FiltersWrapper from "./FiltersWrapper";
import SidebarDrawer from "./SidebarDrawer";
import { useDisclosure, Image } from "@nextui-org/react";
import MenuBar from "./MenuBar";
import ProductCard from "@/app/components/ProductCard";
import { ProductType } from "@/types/product";
import { PaginationProduct } from "@/app/components/Pagination";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductSkeleton from "@/app/components/ProductSkeleton";

export default function ComponentProducts({
  categories,
  products,
  total,
  pages,
  loading,
}: {
  categories: Category[];
  products: ProductType[];
  total: number;
  pages: number;
  loading: boolean;
}) {
  const searchParams = useSearchParams();

  const offset = searchParams.get("page") ?? "1";
  const limit = searchParams.get("size") ?? "4";
  const query_search = searchParams.get("search") ?? null;
  const cat = searchParams.get("category") || null;
  const sub = searchParams.get("sub_category") || null;
  const minPrice = (searchParams.get("min_price") as string) || null;
  const maxPrice = (searchParams.get("max_price") as string) || null;
  const sort = searchParams.get("sort") ?? null;

  const [page, setPage] = useState(parseInt(offset));

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
    if (sort === "most_popular") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {mostPopularSort().map((res: ProductType, idx: number) => {
            return <ProductCard key={idx} product={res} loading={false} />;
          })}
        </div>
      );
    }
    if (sort === "newest") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {newestSort().map((res: ProductType, idx: number) => {
            return <ProductCard key={idx} product={res} loading={false} />;
          })}
        </div>
      );
    }
    if (sort === "top_rated") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {topRated().map((res: ProductType, idx: number) => {
            return <ProductCard key={idx} product={res} loading={false} />;
          })}
        </div>
      );
    }
    if (sort === "price_low_to_high" || sort === "price_high_to_low") {
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

  let totalPages = Math.ceil(total / parseInt(limit as string)) ?? 1;

  const pageFilter =
    !query_search && !cat && !sub && !sort
      ? maxPrice && minPrice
        ? totalPages
        : pages
      : totalPages;

  if (loading) {
    return <ProductSkeleton />;
  }

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
          total={total}
        />
      </SidebarDrawer>
      <div className="w-full flex-1 flex-col">
        <MenuBar onOpen={onOpen} />
        <main className="mt-4 h-full w-full overflow-visible px-1">
          {products ? (
            <div className="text-center">
              <div className="flex justify-center items-center">
                <Image
                  isBlurred
                  radius="none"
                  alt="Empty"
                  src="/images/empty-cart.svg"
                  className="h-32 sm:h-32 lg:h-60"
                />
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Whoops! No products.
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Browse our amazing selection of products and fill your cart with
                goodies!
              </p>
            </div>
          ) : (
            <ProductSortComponent />
          )}
          <div className="w-full flex justify-end mt-8 space-x-2">
            {loading ? null : (
              <PaginationProduct
                page={page}
                total={pageFilter == 0 ? 1 : pageFilter}
                rowsPerPage={parseInt(limit as string)}
                setPage={setPage}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
