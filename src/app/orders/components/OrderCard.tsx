"use client";

import { Button, Card, CardBody, Divider, Image } from "@nextui-org/react";
import React, { FC } from "react";
import { Icon } from "@iconify/react";
import Steps from "@uiw/react-steps";
import { OrdersType } from "@/types/checkout";
import dayjs from "dayjs";
import { formatToUSD } from "@/utils/usd";
import Link from "next/link";

const OrderCard: FC<OrdersType> = (props) => {
  return (
    <Card
      className="w-full border-2 border-spacing-1 border-dashed bg-none"
      shadow="none"
    >
      <CardBody>
        <div className="flex justify-between items-center gap-6">
          <div>
            <p className="font-medium text-md uppercase">#{props.code}</p>
            <span className="text-sm font-light">
              Place on{" "}
              {dayjs(props.createdAt.split(" ")[0]).format("DD-MMM-YYYY")}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-0 sm:gap-0 lg:gap-3">
            <Button
              color="primary"
              variant="light"
              startContent={
                <Icon icon="solar:eye-line-duotone" fontSize={21} />
              }
              as={Link}
              href={`/orders/${props.id}`}
            >
              View order details
            </Button>
            {/* <Button
              color="primary"
              variant="light"
              startContent={
                <Icon
                  icon="solar:archive-down-minimlistic-line-duotone"
                  fontSize={21}
                />
              }
            >
              Save your invoice
            </Button> */}
          </div>
        </div>
        <Divider className="my-3" />
        <div className="flex items-center justify-between">
          {props.carts.length <= 1 ? (
            <div className="flex flex-wrap items-center gap-6">
              <Image
                alt={props.carts[0]?.product?.title}
                src={`${process.env.NEXT_PUBLIC_IPFS ?? "https://ipfs.backnd.riverbase.org"}/api/ipfs?hash=${props?.carts[0]?.product?.thumbnail}`}
                isBlurred
                className=" border-2 h-16 w-16 sm:h-16 sm:w-16 lg:h-36 lg:w-36 object-cover object-center"
              />
              <div className="flex flex-col gap-1">
                <p className="font-medium text-medium line-clamp-1">
                  {props.carts[0]?.product?.title}
                </p>
                <p className="text-sm font-light">
                  Brand: {props.carts[0]?.product?.brand}
                </p>
                <p className="text-sm font-light">Qty: {props.carts[0]?.qty}</p>
                <p className="text-sm font-light">
                  {formatToUSD(parseFloat(props?.totalPrice.toString()))}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {props.carts.map((res, idx: number) => (
                <Image
                  key={idx}
                  alt={props.carts[0]?.product?.title}
                  src={`${process.env.NEXT_PUBLIC_IPFS ?? "https://ipfs.backnd.riverbase.org"}/api/ipfs?hash=${res?.product?.thumbnail}`}
                  isBlurred
                  className="border-2 col-span-1 h-16 w-16 sm:h-16 sm:w-16 lg:h-24 lg:w-24 object-cover bg-white object-center"
                />
              ))}
            </div>
          )}
          <div className="mt-3">
            <Steps
              current={
                props?.status === "START"
                  ? 0
                  : props?.status === "PROCESS"
                  ? 1
                  : props?.status === "DELIVERY"
                  ? 2
                  : 3
              }
              direction="vertical"
              progressDot
            >
              <Steps.Step title="Ordered" />
              <Steps.Step title="Confirmed" />
              <Steps.Step title="Out for delivery" />
              <Steps.Step title="Delivered" />
            </Steps>
          </div>
        </div>
        {/* <Button size="lg" variant="light" color="primary">
          Expected delivery on Monday 16 Jul 2024
        </Button> */}
      </CardBody>
    </Card>
  );
};

export default OrderCard;
