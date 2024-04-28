"use client";

import React from "react";
import TextParallaxContent from "./components/TextParallaxContent";
import TextSupportContent from "./components/TextSupportContent";
import About from "../components/About";

const AboutPage = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Behind"
        heading="CAM Professional Technology"
      >
        <TextSupportContent title="We Are CAM Professional Technology">
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            We are trying our best service for you with the best quality and
            trust. Finding the best solutions, fixing and solve issues with all
            our ability.
          </p>
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            We choose the best parts of consumables to make the whole toner
            cartridge.
          </p>
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            We test each toner cartridge before delivery to make sure quality.
          </p>
        </TextSupportContent>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading=""
        heading="We Believe In Hard Work "
      >
        <TextSupportContent title="Vision">
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            Becoming a perfect company in supplying products and technology
            services.
          </p>
        </TextSupportContent>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1532186773960-85649e5cb70b?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading=""
        heading="And Commitment"
      >
        <TextSupportContent title="Mission">
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            Make customers peaceful and prosperous with the company’s use of
            service products.
          </p>
        </TextSupportContent>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1553605292-f32d804b2743?q=80&w=3499&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading=""
        heading="Policies"
      >
        <TextSupportContent title="Our Policies">
          <ul className="list-disc text-xl text-neutral-600 md:text-2xl">
            <li className="mb-8 ">
              All company employees and professionals are the number one
              property, then customers.
            </li>
            <li className="mb-8 ">
              Serve customers to be the most perfect and sincere.
            </li>
            <li className="mb-8 ">
              End the problem by finding the central and best solutions.
            </li>
            <li className="mb-8 ">
              Self-respect, respect others is the foundation of the company’s
              morality.
            </li>
            <li className="mb-8 ">
              Help thinking about every method, enabling the company to grow, we
              will grow the same.
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
