"use client";

// import Banner from "./components/Banner";
import LatestProducts from "./components/LatestProducts";
import Categories from "./components/Categories";
// import About from "./components/About";
import { GET_ALL_PRODUCTS } from "@/graphql/product";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
// import ShuffleHero from "./components/BannerTwo";
import BannerThree from "./components/BannerThree";
import FAQs from "./components/FAQs";
import Parterns from "./components/Parterns";

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
  const membershipCard = products?.storeProducts?.membershipCard;
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
          discount={membershipCard ? membershipCard?.discountPercentage : null}
          type={membershipCard ? membershipCard?.discountType : null}
          products={products?.storeProducts?.products}
          loading={loadingProduct}
        />
      </section>
      <section className="py-6 sm:py-6 lg:py-12 container mx-auto px-3 sm:px-3 lg:px-6">
        <Parterns />
      </section>
      <section
        id="about"
        className=" max-w-3xl mx-auto px-3 sm:px-3 lg:px-6 pb-6 sm:pb-6 lg:pb-12"
      >
        <FAQs />
      </section>
    </main>
  );
}
