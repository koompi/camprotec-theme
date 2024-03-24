import Banner from "./components/Banner";
import LatestProducts from "./components/LatestProducts";
import Categories from "./components/Categories";
import About from "./components/About";
import { getLatestProducts } from "./api/product";

export default async function Home() {
  const { props } = await getLatestProducts();
  
  return (  
    <main>
      <section className="bg-gradient-to-r from-primary/10">
        <Banner />
      </section>
      <section id="products" className="pt-8">
        <LatestProducts products={props.products} />
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
