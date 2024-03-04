"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Image,
  Link,
  Progress,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

import { VisaIcon, MasterCardIcon, PayPalIcon } from "./components/Providers";

import ShippingForm from "./components/ShippingForm";
import OrderSummary from "./components/OrderSummary";
import PaymentForm from "./components/PaymentForm";
import PaymentMethodRadio from "./components/PaymentMethodRadio";
import { useCart } from "@/context/useCart";

const CheckoutPage = () => {
  const { cartItems, loading } = useCart();

  const [[page, direction], setPage] = React.useState([0, 0]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    if (page + newDirection < 0 || page + newDirection > 2) return;

    setPage([page + newDirection, newDirection]);
  };

  const ctaLabel = React.useMemo(() => {
    switch (page) {
      case 0:
        return "Continue to shipping";
      case 1:
        return "Continue to payment";
      case 2:
        return "Place order";
      default:
        return "Continue to shipping";
    }
  }, [page]);

  const stepTitle = React.useMemo(() => {
    switch (page) {
      case 0:
        return "Review your order";
      case 1:
        return "Where should we send your order?";
      case 2:
        return "How would you like to pay?";
      default:
        return "Review your order";
    }
  }, [page]);

  const stepsContent = React.useMemo(() => {
    const paymentRadioClasses = {
      wrapper: "group-data-[selected=true]:border-foreground",
      base: "data-[selected=true]:border-foreground",
      control: "bg-foreground",
    };

    switch (page) {
      case 0:
        return <OrderSummary hideTitle />;
      case 1:
        return (
          <div className="mt-4 flex flex-col gap-6">
            <ShippingForm hideTitle variant="bordered" />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Accordion
                keepContentMounted
                aria-label="Select or add payment method"
                defaultExpandedKeys={["select_existing_payment"]}
                itemClasses={{
                  title: "text-medium text-foreground-500",
                  indicator: "text-foreground",
                }}
                selectionMode="multiple"
                showDivider={false}
              >
                <AccordionItem
                  key="select_existing_payment"
                  title="Select existing payment method"
                >
                  <RadioGroup
                    aria-label="Select existing payment method"
                    classNames={{ wrapper: "gap-3" }}
                    defaultValue="4229"
                  >
                    <PaymentMethodRadio
                      isRecommended
                      classNames={paymentRadioClasses}
                      description="Expires on 12/2024"
                      icon={<VisaIcon height={30} width={30} />}
                      label="Visa ending in 4229"
                      value="4229"
                    />
                    <PaymentMethodRadio
                      classNames={paymentRadioClasses}
                      description="Expires on 02/2025"
                      icon={<MasterCardIcon height={30} width={30} />}
                      label="MasterCard ending in 8888"
                      value="8888"
                    />
                    <PaymentMethodRadio
                      classNames={paymentRadioClasses}
                      description="Select this option to pay with PayPal"
                      icon={<PayPalIcon height={30} width={30} />}
                      label="PayPal"
                      value="paypal"
                    />
                  </RadioGroup>
                </AccordionItem>
                <AccordionItem
                  key="add_new_payment"
                  title="Add a new payment method"
                >
                  <PaymentForm variant="bordered" />
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [page]);

  if (loading) {
    return (
      <section className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <Spinner label="Loading..." color="primary" />
      </section>
    );
  }
  if (cartItems.length <= 0) {
    return (
      <section className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <Image
              isBlurred
              radius="none"
              alt="Empty"
              src="/images/empty-cart.svg"
              className="h-32 sm:h-32 lg:h-60"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Whoops! Your cart is currently empty.
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Browse our amazing selection of products and fill your cart with
            goodies!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              variant="shadow"
              color="primary"
              as={Link}
              href="/"
              className="text-base-100"
            >
              Go back home
            </Button>

            <Button
              variant="light"
              color="primary"
              as={Link}
              href="/products"
              endContent={<span aria-hidden="true">&rarr;</span>}
            >
              Products
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-9 flex min-h-[calc(100vh_-_60px)]  w-full gap-8">
      {/* Left */}
      <div className="w-full flex-none py-4 lg:w-[44%]">
        <div className="flex h-full flex-1 flex-col p-4">
          <div>
            <Button
              className="-ml-2 text-default-700"
              isDisabled={page === 0}
              radius="full"
              variant="flat"
              onPress={() => paginate(-1)}
            >
              <Icon icon="solar:arrow-left-outline" width={20} />
              Go back
            </Button>
          </div>

          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.form
              key={page}
              animate="center"
              className="mt-8 flex flex-col gap-3"
              custom={direction}
              exit="exit"
              initial="enter"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              variants={variants}
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="text-2xl font-medium">{stepTitle}</h1>
              {stepsContent}
              <Button
                fullWidth
                className="mt-8 bg-foreground text-background"
                size="lg"
                onPress={() => paginate(1)}
              >
                {ctaLabel}
              </Button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-auto flex w-full justify-between gap-8 pb-8 pt-4">
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium">Review</p>
              <Progress
                classNames={{
                  indicator: "!bg-foreground",
                }}
                value={page >= 0 ? 100 : 0}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium">Delivery</p>
              <Progress
                classNames={{
                  indicator: "!bg-foreground",
                }}
                value={page >= 1 ? 100 : 0}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium">Payment</p>
              <Progress
                classNames={{
                  indicator: "!bg-foreground",
                }}
                value={page >= 2 ? 100 : 0}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="relative hidden w-full overflow-hidden rounded-medium shadow-small lg:block">
        {/* Top Shadow */}
        <div className="absolute top-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-black/80 to-transparent" />
        {/* Bottom Shadow */}
        <div className="absolute bottom-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-transparent to-black/80" />

        {/* Content */}
        <div className="absolute top-10 flex w-full items-start justify-between px-10">
          <h2 className="text-2xl font-medium text-white/70 [text-shadow:_0_2px_10px_rgb(0_0_0_/_20%)]">
            The future of footwear is here.
          </h2>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  className="text-white/80"
                  icon="solar:star-bold"
                  width={16}
                />
              ))}
            </div>
            <Link
              className="text-white/60"
              href="#"
              size="sm"
              underline="always"
            >
              120 reviews
            </Link>
          </div>
        </div>
        <Image
          removeWrapper
          alt="Nike Adapt BB 2.0"
          className="absolute inset-0 z-0 h-full w-full rounded-none object-cover"
          height="100%"
          src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes.jpg"
        />
        <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-medium bg-background/10 p-8 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50 ">
          <div className="flex flex-col gap-1">
            <h2 className="left-10 z-10 text-2xl font-medium text-white/90">
              Nike Adapt BB 2.0
            </h2>
            <p className="left-10 z-10 text-white/80">$399.99</p>
          </div>
          <Button
            className="border-white/40 pl-3 text-white"
            startContent={<Icon icon="lucide:plus" width={24} />}
            variant="bordered"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
