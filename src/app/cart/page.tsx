import { filterProducts } from "../api/product";
import CheckoutComponet from "./components/CheckoutComponent";
import { Toaster } from "sonner";

export default async function CheckoutPage() {
  const { props } = await filterProducts();

  return (
    <>
      <Toaster position="top-right" closeButton />{" "}
      <CheckoutComponet products={props.products} />
    </>
  );
}
