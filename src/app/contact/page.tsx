"use client";

import React from "react";
import { useTheme } from "@/context/useTheme";

const ContactPage = () => {
  const { value } = useTheme();

  return (
    <section className="w-full mx-auto p py-12 sm:py-12 lg:py-9 px-3">
      <div className="flex flex-col text-center w-full">
        <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">
          Contact Us
        </h1>
      </div>
      <div className="h-[60dvh] sm:h-[60dvh] lg:h-[80dvh] grayscale-1 rounded-xl overflow-hidden p-2 sm:p-2 lg:p-10  flex items-end justify-start relative">
        <iframe
          width="100%"
          height="100%"
          className="absolute inset-0"
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.942543720852!2d104.86611821173156!3d11.555976744281761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513223a19f75%3A0xb642eeae5a98c92b!2sCAM%20PROFESSIONAL%20TECHNOLOGY%20CO.%2C%20LTD.!5e0!3m2!1sen!2skh!4v1714327559939!5m2!1sen!2skh"
          style={{
            filter: "grayscale(1)",
          }}
        ></iframe>

        <div className="grid place-items-center w-full">
          <div className="bg-gradient-to-r from-primary/10 to-blue-50 relative flex flex-wrap py-6 rounded-xl backdrop-blur-md shadow-md ">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">{value?.footer?.contact?.address}</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-indigo-500 leading-relaxed">
                {value?.footer?.contact?.email}
              </a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">{value?.footer?.contact?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
