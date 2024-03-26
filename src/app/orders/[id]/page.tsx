"use client";
import { Button, Spinner, Image, Link, Divider } from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { ORDER_BY_ID } from "@/graphql/order";
import { useParams } from "next/navigation";
import Steps from "@uiw/react-steps";
import dayjs from "dayjs";
import { formatToUSD } from "@/utils/usd";
import { CheckoutCartType } from "@/types/checkout";

const OrderSinglePage = () => {
  const router = useRouter();
  const params = useParams();

  const { data, loading, refetch } = useQuery(ORDER_BY_ID, {
    variables: {
      filter: {
        limit: 100,
        skip: 0,
        sort: -1,
      },
      storeOrderId: params.id,
    },
  });

  if (loading || !data)
    return (
      <section className="container max-w-full grid place-items-center h-screen">
        <Spinner label="Loading..." />
      </section>
    );

  return (
    <section className="container max-w-full sm:max-w-full lg:max-w-5xl py-9 px-3 sm:px-3 lg:px-6 mx-auto">
      <Button
        size="lg"
        variant="flat"
        radius="full"
        startContent={<Icon icon="solar:arrow-left-linear" fontSize={24} />}
        onPress={() => router.back()}
      >
        Order
      </Button>
      <div className="my-3">
        <h1 className="text-2xl font-semibold">
          Orders Details #{data?.storeOrder.code}
        </h1>
        <p className="text-base font-light">
          View your order history and check the delivery status for items.
        </p>
      </div>
      <div className="my-6">
        <Steps
          current={
            data?.storeOrder?.status === "START"
              ? 0
              : data?.storeOrder?.status === "PROCESS"
              ? 1
              : data?.storeOrder?.status === "DELIVERY"
              ? 2
              : 3
          }
          direction="horizontal"
        >
          <Steps.Step
            title="Ordered"
            description={`Place on ${dayjs(
              data?.storeOrder.createdAt.split(" ")[0]
            ).format("DD-MMM-YYYY")}`}
          />
          <Steps.Step
            title="Confirmed"
            description="The store confirmed your order"
          />
          <Steps.Step
            title="Out for delivery"
            description="Shipping with L192"
          />
          <Steps.Step title="Delivered" description="Items are delivered" />
        </Steps>
      </div>
      <div className="rounded-xl bg-gradient-to-r from-primary/10 px-6 py-3">
        <h1 className="text-md font-medium">Order Items</h1>
        <div className="my-3 flex flex-col gap-3">
          {data?.storeOrder?.carts?.map(
            (res: CheckoutCartType, idx: number) => {
              console.log("res", res);

              return (
                <div key={idx}>
                  <div className="flex justify-between items-center gap-x-6">
                    <div className="flex items-center gap-3">
                      <Image
                        alt={res?.product?.title}
                        src={`${process.env.NEXT_PUBLIC_IPFS ?? "https://ipfs.backnd.riverbase.org"}/api/ipfs?hash=${res?.product?.thumbnail}`}
                        isBlurred
                        className=" border-2 h-16 w-16 object-cover object-center"
                      />
                      <div className="flex flex-col gap-1">
                        <Link
                          href={`/products/${res?.product?.slug}`}
                          underline="hover"
                          className=" text-medium line-clamp-1 text-content1-foreground"
                        >
                          {res?.product?.title}
                        </Link>
                        <p className="text-sm font-light">
                          Brand: {res?.product?.brand}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-12">
                      <p className="text-sm font-light">{res?.qty}x</p>
                      <p className="text-sm font-light">
                        {formatToUSD(
                          parseFloat(
                            res?.unitPrice.toString()
                              ? res?.unitPrice.toString()
                              : "0"
                          )
                        )}
                      </p>
                    </div>
                  </div>
                  <Divider className="my-3" />
                </div>
              );
            }
          )}
          <div className="flex justify-end">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-6">
                <p>Price</p>
                <p>
                  {formatToUSD(
                    parseFloat(
                      data?.storeOrder?.totalPrice.toString()
                        ? data?.storeOrder?.totalPrice.toString()
                        : "0"
                    )
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between gap-6">
                <p>Tax</p>
                <p>
                  {formatToUSD(
                    parseFloat(
                      data?.storeOrder?.tax ? data?.storeOrder?.tax : "0"
                    )
                  )}
                </p>
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between gap-6 font-bold text-lg text-primary">
                <p>Total Price</p>
                <p>
                  {formatToUSD(
                    parseFloat(
                      data?.storeOrder?.totalPrice.toString()
                        ? data?.storeOrder?.totalPrice.toString()
                        : "0"
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSinglePage;
