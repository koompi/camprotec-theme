"use client";

import Banner from "./components/Banner";
import LatestProducts from "./components/LatestProducts";
import Categories from "./components/Categories";
import About from "./components/About";
// import { Toaster } from "sonner";

export default function Home() {
  return (
    <main>
      <section className="bg-gradient-to-r from-primary/10">
        <Banner />
      </section>
      <section id="products" className="pt-8">
        <LatestProducts />
      </section>
      <section id="categories" className="pt-8">
        <Categories />
      </section>
      <section id="about" className="pt-8">
        <About />
      </section>
    </main>
  );
}
