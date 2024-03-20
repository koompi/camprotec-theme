import { filterProducts } from "../api/product";
import CheckoutComponet from "./components/CheckoutComponent";

export default async function CheckoutPage() {
  const { props } = await filterProducts();
  return <CheckoutComponet products={props.products} />;
}
