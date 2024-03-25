import { Button, Navbar } from "@nextui-org/react";

import { ProductType } from "@/types/product";
import { Category } from "@/types/category";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { filterProducts } from "../api/product";
import { categories } from "../api/categories";
import { Search } from "./components/Search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { props: products } = await filterProducts(searchParams);
  const { props: mycategories } = await categories(10);

  return (
    <section className="container mx-auto px-2 sm:px-2 lg:px-6 py-2">
      <Navbar shouldHideOnScroll classNames={{ wrapper: "px-0" }}>
        <Search />
      </Navbar>
      {mycategories.categories?.length > 0 && (
        <div className="my-auto flex max-w-lg flex-col gap-2">
          <h3 className="text-lg font-bold leading-8 mt-3">Popular Search</h3>
          <div className="flex flex-wrap items-center gap-2">
            {mycategories.categories?.map((cat: Category, idx: number) => {
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

      {products.products?.length > 0 && (
        <div className="my-auto flex max-w-lg flex-col gap-2 pb-9">
          <h3 className="text-lg font-bold leading-8 mt-3">Trending Now</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2 border border-base-100">
            {products.products
              ?.slice(0, 10)
              ?.sort((a: ProductType, b: ProductType) =>
                a?.sell > b?.sell ? -1 : 1
              )
              ?.map((res: ProductType, idx: number) => {
                return (
                  <div key={idx}>
                    <ProductCard product={res} loading={false} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
}
