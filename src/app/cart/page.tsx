import { filterProducts } from "../api/product";
import CheckoutComponent from "./components/CheckoutComponent";
import { Toaster } from "sonner";

export default async function CartPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { props } = await filterProducts(searchParams);

  return (
    <>
      <Toaster position="top-right" closeButton />{" "}
      <CheckoutComponent products={props.products} />
    </>
  );
}
