"use client";

import { Button, Card, CardBody, Divider, Image } from "@nextui-org/react";
import React, { FC } from "react";
import { Icon } from "@iconify/react";
import Steps from "@uiw/react-steps";
import { OrdersType } from "@/types/checkout";
import dayjs from "dayjs";
import { formatToUSD } from "@/utils/usd";

const OrderCard: FC<OrdersType> = (props) => {
  return (
    <Card
      className="w-full border-2 border-spacing-1 border-dashed bg-none"
      shadow="none"
    >
      <CardBody>
        <div className="flex justify-between items-center">
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
            >
              View order details
            </Button>
            <Button
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
            </Button>
          </div>
        </div>
        <Divider className="my-3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Image
              alt="product img"
              src="/images/banner.avif"
              isBlurred
              className="h-12 sm:h-12 lg:h-36 object-contain object-center"
            />
            <div className="flex flex-col gap-1">
              <p className="font-medium text-medium">Printer SONY</p>
              <p className="text-sm font-light">SONY</p>
              <p className="text-sm font-light">Variants</p>
              <p className="text-sm font-light">Qty: 5</p>
              <p className="text-sm font-light">
                {formatToUSD(parseFloat(props?.totalPrice.toString()))}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <Steps
              current={
                props?.status === "START"
                  ? 0
                  : props?.status === "CLOSE"
                  ? 3
                  : 1
              }
              direction="vertical"
              progressDot
              // status="process"
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
