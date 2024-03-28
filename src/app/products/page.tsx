"use client";

// import { useSearchParams } from "next/navigation";
// import { filterProducts } from "../api/product";
// import { categories } from "../api/categories";
import ComponentProducts from "./components/ComponentProducts";
import { GLOBAL_PRODUCT_FILTERING } from "@/graphql/product"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CATEGORIES } from "@/graphql/category";

// import React, { useState } from "react";
// import { useQuery } from "@apollo/client";
// import ProductCard from "../components/ProductCard";
// import { ProductType } from "@/types/product";
// import { useSearchParams } from "next/navigation";
// import { GLOBAL_PRODUCT_FILTERING } from "@/graphql/product";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { Button, Select, SelectItem, useDisclosure } from "@nextui-org/react";

// import FiltersWrapper from "./components/FiltersWrapper";
// import SidebarDrawer from "./components/SidebarDrawer";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { SearchProduct } from "./components/Search";

// interface Range {
//   end: number;
//   start: number;
// }

// interface Sort {
//   sort: number;
// }
// interface ProductFilter {
//   id?: string[] | null;
//   keyword?: string | null;
//   status?: string | null;
//   filter?: Sort | null;
//   range?: Range | null;
// }

// interface FormSearch {
//   search: string;
// }

// const ProductsPage = () => {
// const searchParams = useSearchParams();
// const search = searchParams.get("search") || null;
// const cat = searchParams.get("category") || null;
// const sub = searchParams.get("sub_category") || null;
// const page = searchParams.get("page") || null;
// const size = searchParams.get("size") || null;
// const sortParam = searchParams.get("sort") || null;
//   const router = useRouter();
//   useForm<FormSearch>();
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   const [pageSize, setPageSize] = useState<{ skip: number; size: number }>({
//     skip: 0,
//     size: 16,
//   });

//   const [filtering, setFiltering] = useState<ProductFilter>({
//     id: null,
//     keyword: null,
//     status: null,
//     filter: null,
//     range: null,
//   });

//   const { data, loading } = useQuery(GLOBAL_PRODUCT_FILTERING, {
//     variables: {
// tagId: cat ? (sub ? [sub] : [cat]) : search ? [] : null,
// keyword: search ? search : filtering?.keyword,
// status: filtering?.status === "price" ? "price" : null,
// range: filtering?.range,
// filter: {
//   skip: page
//     ? parseInt(page) > 1
//       ? parseInt(page) * parseInt(size as string)
//       : 0
//     : pageSize.skip,
//   limit: size ? parseInt(size) : pageSize.size,
//   sort: filtering?.filter?.sort,
// },
//     },
//   });

// const mostPopularSort = (): ProductType[] => {
//   if (!data?.storeGlobalFilterProducts) {
//     return [];
//   }

//   return [...data.storeGlobalFilterProducts].sort(
//     (a: ProductType, b: ProductType) => (a.sell > b.sell ? -1 : 1)
//   );
// };

// const brandSort = (): ProductType[] => {
//   if (!data?.storeGlobalFilterProducts) {
//     return [];
//   }
//   return [...data.storeGlobalFilterProducts].sort(
//     (a: ProductType, b: ProductType) => (a.brand > b.brand ? -1 : 1)
//   );
// };

// const topRated = (): ProductType[] => {
//   if (!data?.storeGlobalFilterProducts) {
//     return [];
//   }
//   return [...data.storeGlobalFilterProducts].sort(
//     (a: ProductType, b: ProductType) => (a.rating > b.rating ? -1 : 1)
//   );
// };

// const newestSort = (): ProductType[] => {
//   if (!data?.storeGlobalFilterProducts) {
//     return [];
//   }
//   return [...data.storeGlobalFilterProducts].sort(
//     (a: ProductType, b: ProductType) => (a.createdAt > b.createdAt ? -1 : 1)
//   );
// };

// const ProductSortCompoent = () => {
//   if (sortParam === "most_popular") {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
//         {mostPopularSort().map((res: ProductType, idx: number) => {
//           return <ProductCard key={idx} product={res} loading={loading} />;
//         })}
//       </div>
//     );
//   }
//   if (sortParam === "newest") {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
//         {newestSort().map((res: ProductType, idx: number) => {
//           return <ProductCard key={idx} product={res} loading={false} />;
//         })}
//       </div>
//     );
//   }
//   if (sortParam === "top_rated") {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
//         {topRated().map((res: ProductType, idx: number) => {
//           return <ProductCard key={idx} product={res} loading={false} />;
//         })}
//       </div>
//     );
//   }
//   if (
//     sortParam === "price_low_to_high" ||
//     sortParam === "price_high_to_low"
//   ) {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
//         {data?.storeGlobalFilterProducts?.map(
//           (res: ProductType, idx: number) => {
//             return <ProductCard key={idx} product={res} loading={false} />;
//           }
//         )}
//       </div>
//     );
//   } else {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
//         {brandSort().map((res: ProductType, idx: number) => {
//           return <ProductCard key={idx} product={res} loading={false} />;
//         })}
//       </div>
//     );
//   }
// };

//   return (
// <section className="container mx-auto px-3 sm:px-3 lg:px-6 py-3 sm:py-3 lg:py-9">
//   <div className="flex gap-x-6">
//     <SidebarDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
//       <FiltersWrapper
//         className="bg-default-50 hide-scroll-bar"
//         items={ecommerceItems}
//         scrollShadowClassName="pb-12"
//         showActions={false}
//         title="Filter by"
//       />
//     </SidebarDrawer>

// <div className="w-full flex-1 flex-col">
//   <header className="relative z-20 flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3">
//     <div className="flex items-center gap-1 md:hidden md:gap-2">
//       <h2 className="text-large font-medium">Find your products</h2>
//     </div>
//     <div className="flex items-center justify-between gap-2 ">
//       <div className="flex flex-row gap-2">
//         <Button
//           className="flex border-default-200 sm:hidden"
//           startContent={
//             <Icon
//               className="text-default-500"
//               height={16}
//               icon="solar:filter-linear"
//               width={16}
//             />
//           }
//           variant="bordered"
//           onClick={onOpen}
//         >
//           Filters
//         </Button>
//         <div className="hidden items-center gap-1 md:flex">
//           <SearchProduct
//             routeBack={`?search=&category=${
//               cat ? cat : ""
//             }&sub_category=${sub ? sub : ""}&sort=${
//               sortParam ? sortParam : ""
//             }`}
//           />
//         </div>
//       </div>
//       <Select
//         selectionMode="single"
//         aria-label="Sort by"
//         classNames={{
//           base: "items-center justify-end",
//           label:
//             "hidden lg:block text-tiny whitespace-nowrap md:text-small text-default-400",
//           mainWrapper: "max-w-xs",
//         }}
//         label="Sort by"
//         labelPlacement="outside-left"
//         placeholder="Select an option"
//         variant="bordered"
//         selectedKeys={[sortParam as string]}
//         onChange={(e) => {
//           router.push(
//             `?search=${search ? search : ""}&category=${
//               cat ? cat : ""
//             }&sub_category=${sub ? sub : ""}&sort=${
//               e.target.value ? e.target.value : ""
//             }`
//           );

//           if (e.target.value === "price_low_to_high") {
//             setFiltering({
//               ...filtering,
//               status: "price",
//               filter: { sort: 1 },
//             });
//           }
//           if (e.target.value === "price_high_to_low") {
//             setFiltering({
//               ...filtering,
//               status: "price",
//               filter: { sort: -1 },
//             });
//           }
//         }}
//       >
//         <SelectItem key="brand" value="brand">
//           Brand
//         </SelectItem>
//         <SelectItem key="newest" value="newest">
//           Newest
//         </SelectItem>
//         <SelectItem key="price_low_to_high" value="price_low_to_high">
//           Price: Low to High
//         </SelectItem>
//         <SelectItem key="price_high_to_low" value="price_high_to_low">
//           Price: High to Low
//         </SelectItem>
//         <SelectItem key="top_rated" value="top_rated">
//           Top Rated
//         </SelectItem>
//         <SelectItem key="most_popular" value="most_popular">
//           Most Popular
//         </SelectItem>
//       </Select>
//     </div>
//   </header>
// <main className="mt-4 h-full w-full overflow-visible px-1">
//   <ProductSortCompoent />
// </main>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductsPage;

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams?.search || null;
  const cat = searchParams?.category || null;
  const sub = searchParams?.sub_category || null;
  const page = (searchParams?.page as string) || null;
  const size = (searchParams?.size as string) || null;
  const minPice = (searchParams?.min_price as string) || null;
  const maxPice = (searchParams?.max_price as string) || null;
  const sortParam = (searchParams?.sort as string) || null;
  const price =
    ["price_low_to_high", "price_high_to_low"].includes(sortParam as string) ||
    null;

  const { data: products, loading: loadingProduct } = useQuery(GLOBAL_PRODUCT_FILTERING, {
    variables: {
      tagId: cat ? (sub ? [sub] : [cat]) : search ? [] : null,
      keyword: search ? search : search,
      status: price ? "price" : null,
      range: minPice
        ? {
          start: parseInt(minPice as string),
          end: parseInt(maxPice as string),
        }
        : null,
      filter: {
        skip: page
          ? parseInt(page) > 1
            ? parseInt(page) * parseInt(size as string)
            : 0
          : 0,
        limit: size ? parseInt(size) : 32,
        sort: price ? (sortParam == "price_low_to_high" ? 1 : -1) : -1,
      },
    },
  });

  const { data: categories } = useQuery(CATEGORIES, {
    variables: {
      filter:  null,
    },
  })

  // 

  return (
    <section className="container mx-auto px-3 sm:px-3 lg:px-6 py-3 sm:py-3 lg:py-9">
      <div className="flex gap-x-6">
        <ComponentProducts categories={categories?.storeOwnerCategories} {...products?.storeGlobalFilterProducts} searchParams={searchParams} loading={loadingProduct}/>
      </div>
    </section>
  );
}
