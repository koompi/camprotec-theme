"use client";

import Banner from "./components/Banner";
import LatestProducts from "./components/LatestProducts";
import Categories from "./components/Categories";
import About from "./components/About";
import { GET_ALL_PRODUCTS } from "@/graphql/product";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ShuffleHero from "./components/BannerTwo";
import BannerThree from "./components/BannerThree";
import FAQs from "./components/FAQs";

export default function Home() {
  const { data: products, loading: loadingProduct } = useQuery(
    GET_ALL_PRODUCTS,
    {
      variables: {
        filter: {
          limit: 10,
          skip: 0,
          sort: -1,
        },
      },
    }
  );

  return (
    <main>
      <section className="bg-gradient-to-r from-primary/10 via-white to-primary/10 background-animate">
        <BannerThree />
      </section>
      <section id="categories" className="pt-8">
        <Categories />
      </section>
      <section id="products" className="pt-8 ">
        <LatestProducts
          products={products?.storeProducts}
          loading={loadingProduct}
        />
      </section>
      <section
        id="about"
        className="py-12 sm:py-12 lg:py-32 max-w-3xl mx-auto px-3 sm:px-3 lg:px-6"
      >
        <FAQs />
      </section>
    </main>
  );
}
