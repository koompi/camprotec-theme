import ProductViewInfo from "./components/ProductViewItem";
import { getProduct } from "@/app/api/product";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { props } = await getProduct(params.id);

  return (
    <section className="container mx-auto px-6 py-3 sm:py-3 lg:py-16">
      <ProductViewInfo {...props.product} />
    </section>
  );
}
