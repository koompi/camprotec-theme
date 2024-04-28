"use client";

import { Avatar } from "@nextui-org/react";
import React from "react";
import { useTheme } from "@/context/useTheme";

interface Member {
  name: string;
  position: string;
  photo: string;
}

const About = () => {
  const { value } = useTheme();

  if (value?.about?.members.length <= 0) {
    return null;
  }

  return (
    <div className=" py-6 sm:py-6 lg:py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-lg sm:text-lg lg:text-4xl text-primary font-bold">
          {value?.about?.title ?? "ABOUT US"}
        </h2>
        <p className="text-base-content/80 md:w-2/3 w-full mx-auto">
          {value?.about?.description ?? ""}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid sm:grid-cols-2 lg:flex lg:flex-wrap justify-center gap-16">
        {value?.about?.members.map((mem: Member, idx: number) => (
          <div key={idx} className="flex flex-col items-center">
            <Avatar
              className="h-24 sm:h-24 lg:h-40 w-24 sm:w-24 lg:w-40"
              src={mem?.photo}
            />
            <h3 className="mt-2 font-medium text-lg">{mem?.name}</h3>
            <span className="text-small text-default-500 text-center">
              {mem?.position}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
