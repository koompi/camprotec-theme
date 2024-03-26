import { filterProducts } from "../api/product";
import CheckoutComponent from "./components/CheckoutComponent";
import { Toaster } from "sonner";

export default async function CartPage() {
  const { props } = await filterProducts();

  return (
    <>
      <Toaster position="top-right" closeButton />{" "}
      <CheckoutComponent products={props.products} />
    </>
  );
}
