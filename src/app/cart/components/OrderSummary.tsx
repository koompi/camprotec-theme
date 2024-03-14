"use client";

import React, { useState, useEffect } from "react";
import { Divider } from "@nextui-org/react";
import OrderSummaryItem from "./OrderSummaryItem";
import { useCart } from "@/context/useCart";
import { Toaster } from "sonner";
import { formatToUSD } from "@/utils/usd";

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
};

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({ hideTitle, ...props }, ref) => {
    const { cartItems } = useCart();
    const [price, setPrice] = useState(0);

    useEffect(() => {
      const subtotal: number[] = [];
      cartItems.map((product: any) =>
        subtotal.push(product.quantity * product.product.price)
      );
      const Subtotal: any = subtotal.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      setPrice(Subtotal);
    }, [cartItems]);

    return (
      <div ref={ref} {...props}>
        <Toaster position="bottom-right" closeButton />
        {!hideTitle && (
          <>
            <h2 className="font-medium text-default-500">Your Order</h2>
            <Divider className="mt-4" />
          </>
        )}
        <h3 className="sr-only">Items in your cart</h3>
        <ul>
          {cartItems?.map((item) => (
            <OrderSummaryItem key={item.product?.id} {...item} />
          ))}
        </ul>
        {/* <div>
          <dl className="flex flex-col gap-4 py-4">
            <div className="flex justify-between">
              <dt className="text-small text-default-500">Subtotal</dt>
              <dd className="text-small font-semibold text-default-700">
                {formatToUSD(price)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-small text-default-500">Delivery</dt>
              <dd className="text-small font-semibold text-default-700">
                $0.00
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-small text-default-500">Tax</dt>
              <dd className="text-small font-semibold text-default-700">
                $0.00
              </dd>
            </div>

            <Divider />
            <div className="flex justify-between">
              <dt className="text-small font-semibold text-default-500">
                Total
              </dt>
              <dd className="font-semibold text-primary text-xl">
                {formatToUSD(price)}
              </dd>
            </div>
          </dl>
        </div> */}
      </div>
    );
  }
);

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
