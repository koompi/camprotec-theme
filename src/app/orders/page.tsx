"use client";

import React from "react";
import OrderCard from "./components/OrderCard";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "@/graphql/orders";
import { OrdersType } from "@/types/checkout";
import {
  PaginationItemType,
  PaginationItemRenderProps,
  Pagination,
  Skeleton,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { cn } from "@/utils/cn";

const OrderPage = () => {
  const { data, loading, refetch } = useQuery(GET_ORDERS, {
    variables: {
      filter: {
        limit: 100,
        skip: 0,
        sort: -1,
      },
    },
  });

  // const newestSort = (): OrdersType[] => {
  //   if (!data?.storeOrders) {
  //     return [];
  //   }
  //   return [...data?.storeOrders].sort((a: OrdersType, b: OrdersType) =>
  //     a.createdAt > b.createdAt ? -1 : 1
  //   );
  // };

  //  custom pagination
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={onNext}
        >
          <Icon icon="solar:alt-arrow-right-bold-duotone" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={onPrevious}
        >
          <Icon icon="solar:alt-arrow-left-bold-duotone" />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        key={key}
        className={cn(
          className,
          isActive &&
            "text-white bg-gradient-to-br from-gray-900 to-base-100 font-bold"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  if (loading) {
    return (
      <section className="container max-w-full sm:max-w-full lg:max-w-5xl py-9 px-3 sm:px-3 lg:px-6 mx-auto">
        <div className="flex flex-col gap-3 items-center">
          <div className="w-full min-h-36">
            <Skeleton className="rounded-lg">
              <div className="h-36 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="w-full min-h-36">
            <Skeleton className="rounded-lg">
              <div className="h-36 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="w-full min-h-36">
            <Skeleton className="rounded-lg">
              <div className="h-36 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </section>
    );
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
        {data?.storeOrders?.map((res: OrdersType, idx: number) => {
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
      <Pagination
        disableCursorAnimation
        showControls
        total={10}
        initialPage={1}
        className="gap-2 mt-9 mx-auto w-full flex items-center text-center justify-center"
        radius="full"
        renderItem={renderItem}
        variant="light"
      />
    </section>
  );
};

export default OrderPage;
