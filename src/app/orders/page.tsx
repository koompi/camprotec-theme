"use client";

import React from "react";
import OrderCard from "./components/OrderCard";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "@/graphql/orders";
import { Skeleton } from "@nextui-org/react";
import { OrdersType } from "@/types/checkout";

const OrderPage = () => {
  const { data, loading, refetch } = useQuery(GET_ORDERS, {
    variables: {
      filter: {
        limit: 10,
        skip: 0,
        sort: -1,
      },
    },
  });

  if (loading || !data) {
    return "loading ...";
  }

  return (
    <section className="container max-w-full sm:max-w-full lg:max-w-5xl py-9 px-3 sm:px-3 lg:px-6 mx-auto">
      <div className="my-6">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="text-base font-light">
          View your order history and check the delivery status for items.
        </p>
      </div>
      <div className="flex flex-col gap-6 items-center">
        {data.storeOrders?.map((res: OrdersType, idx: number) => {
          return (
            <OrderCard
              key={idx}
              carts={res?.carts}
              code={res?.code}
              createdAt={res?.createdAt}
              id={res?.id}
              ownerId={res?.ownerId}
              status={res?.status}
              tax={res?.tax}
              totalDiscount={res?.totalDiscount}
              totalPrice={res?.totalPrice}
            />
          );
        })}
      </div>
    </section>
  );
};

export default OrderPage;
