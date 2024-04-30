"use client";

import React from "react";
import TextParallaxContent from "./components/TextParallaxContent";
import TextSupportContent from "./components/TextSupportContent";
import About from "../components/About";

const AboutPage = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1499540633125-484965b60031?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Behind"
        heading="CAM Professional Technology"
      >
        <TextSupportContent title="We are CAM Professional Technology">
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            Our company strives to deliver high-quality products and build trust
            with clients. Our team resolves issues with expertise. We
            manufacture toner cartridges with selected parts to ensure quality.
            Each toner cartridge undergoes rigorous testing before delivery to
            guarantee its performance and reliability.
          </p>
        </TextSupportContent>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1577580529485-d39b28695fdf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading=""
        heading="We believe in hard work "
      >
        <TextSupportContent title="Vision">
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            Becoming a perfect company in supplying products and technology
            services.
          </p>
        </TextSupportContent>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1510078344547-e481316148ba?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading=""
        heading="Commitment"
      >
        <TextSupportContent title="Mission">
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            Make customers peaceful and prosperous with the company’s use of
            service products.
          </p>
        </TextSupportContent>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1593510987331-18f58133c76d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading=""
        heading="Policies"
      >
        <TextSupportContent title="Our Policies">
          <ul className="list-disc text-xl text-neutral-600 md:text-2xl px-6">
            <li className="mb-8 ">
              The primary asset of a company is its employees and professionals,
              followed by its customers.
            </li>
            <li className="mb-8 ">
              Customers should be served with utmost perfection and sincerity.
            </li>
            <li className="mb-8 ">
              Central and optimal solutions should be sought to resolve
              problems.
            </li>
            <li className="mb-8 ">
              Self-respect and respect for others are the cornerstone of the
              company&apos;s ethics.
            </li>
            <li className="mb-8 ">
              We will grow in tandem with the company by contributing ideas and
              strategies that enable its growth.
            </li>
          </ul>
        </TextSupportContent>
      </TextParallaxContent>
      <div className="container mx-auto px-3 sm:px-3 lg:px-6">
        <About />
      </div>
    </div>
  );
};

export default AboutPage;
