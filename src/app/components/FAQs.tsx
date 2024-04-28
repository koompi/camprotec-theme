"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const FAQs = () => {
  return (
    <>
      <h1 className="text-primary font-extrabold text-lg sm:text-lg lg:text-4xl text-center md:py-12 py-8">
        FAQs
      </h1>
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Which payments systems"
          title={
            <h1 className="font-semibold text-md sm:text-md lg:text-xl">
              Which payments systems
            </h1>
          }
        >
          <p className="text-gray-400">
            You can use payments systems, as well as bank payment, card payment.
          </p>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Shipping methods"
          title={
            <h1 className="font-semibold text-md sm:text-md lg:text-xl">
              Shipping methods
            </h1>
          }
        >
          <p className="text-gray-400">
            We delivery for you at anytime and anywhere
          </p>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Policy"
          title={
            <h1 className="font-semibold text-md sm:text-md lg:text-xl">
              Policy
            </h1>
          }
        >
          <p className="text-gray-400">
            We will renew for the error product in warranty
          </p>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default FAQs;
