"use client";

import React from "react";
import { Spacer, Image } from "@nextui-org/react";
import ScrollingBanner from "./ScrollLogoPartners";

interface LogoType {
  name: string;
  src: string;
}

const Parterns = () => {
  const topLogo = [
    {
      name: "ABA",
      src: "aba-bank-logo.avif",
    },
    {
      name: "AMK",
      src: "amk-mfi.avif",
    },
    {
      name: "AMRET",
      src: "amret-logo.avif",
    },
    {
      name: "PENGHOUT",
      src: "borey-peng-huot.avif",
    },
    {
      name: "CAMBODIA BANK",
      src: "cambodia-bank.avif",
    },
    {
      name: "DIA ICHI",
      src: "dai-ichi-life.avif",
    },
    {
      name: "GALAXY",
      src: "galaxy.avif",
    },
    {
      name: "HANUMAN",
      src: "hanuman-logo.avif",
    },
    {
      name: "HGB",
      src: "hgb-group.avif",
    },
    {
      name: "MAYBANK",
      src: "maybank.jpg",
    },
    {
      name: "ORKIDE",
      src: "orkide.avif",
    },
    {
      name: "PRASAC",
      src: "prasac.png",
    },
    {
      name: "PRINCE",
      src: "prince-bank.jpg",
    },
    {
      name: "PSI",
      src: "psi-logo.avif",
    },
    {
      name: "TOYOTA",
      src: "R-2-300x213.avif",
    },
    {
      name: "SATHAPANA",
      src: "sathapana.avif",
    },
    {
      name: "SBI",
      src: "sbi-lyhour.avif",
    },
    {
      name: "T",
      src: "t-logo.avif",
    },
    {
      name: "VATTANAC",
      src: "vattanac-bank.avif",
    },
    {
      name: "WING",
      src: "wing-bank.avif",
    },
    {
      name: "WOORI",
      src: "wooribank.avif",
    },
  ];
  const bottomLogo = [
    {
      name: "ACLEDA",
      src: "acleda-bank.png",
    },
    {
      name: "ALLIANCE",
      src: "alliance-pharma.avif",
    },
    {
      name: "CALMETTE",
      src: "calmette-hospital.png",
    },
    {
      name: "CAMPOST",
      src: "cam-post-bank.avif",
    },
    {
      name: "CDRI",
      src: "cdri-logo.avif",
    },
    {
      name: "FTB",
      src: "ftb-bank.avif",
    },
    {
      name: "J-STRUST",
      src: "j-trust-royal-bank.avif",
    },
    {
      name: "MANULIFE",
      src: "manulife.avif",
    },
    {
      name: "ROSE WOOD",
      src: "rose-wood.avif",
    },
    {
      name: "ZUELING",
      src: "zueling-pharma.avif",
    },
  ];

  return (
    <section>
      <div className="text-center flex flex-col gap-2 py-16">
        <span>Service With A Smile</span>
        <h1 className="text-primary font-extrabold text-lg sm:text-lg lg:text-4xl">
          Our Clients Believe In Us
        </h1>
      </div>
      <section className="mx-auto w-full container px-6 lg:px-8 hidden sm:hidden lg:inline">
        <ScrollingBanner shouldPauseOnHover duration={60} gap="30px">
          {topLogo.map((_res: LogoType, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-center text-foreground"
            >
              <Image
                alt={_res?.name}
                src={`/images/logo-partners/above/${_res?.src}`}
                isBlurred
                className="w-full"
                radius="none"
              />
            </div>
          ))}
        </ScrollingBanner>
        <Spacer y={12} />
        <ScrollingBanner isReverse shouldPauseOnHover duration={60} gap="30px">
          {bottomLogo.map((_res, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-center text-foreground"
            >
              <Image
                alt="logo"
                src={`/images/logo-partners/below/${_res?.src}`}
                isBlurred
                className="w-full"
                radius="none"
              />
            </div>
          ))}
        </ScrollingBanner>
      </section>
      <section className="mx-auto w-full max-w-6xl px-0 grid sm:grid lg:hidden">
        <div className="flex flex-col m-auto p-auto">
          <div className="flex overflow-x-scroll hide-scroll-bar">
            <div className="flex gap-3 items-center flex-nowrap mx-auto max-w-96">
              {topLogo.map((_res: LogoType, idx: number) => (
                <div className="inline-block" key={idx}>
                  <Image
                    alt="logo"
                    src={`/images/logo-partners/above/${_res?.src}`}
                    className="w-20 max-w-xs overflow-hidden "
                    radius="none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col m-auto p-auto">
          <div className="flex overflow-x-scroll hide-scroll-bar">
            <div className="flex gap-3 items-center flex-nowrap mx-auto max-w-96">
              {bottomLogo.map((_res: LogoType, idx: number) => (
                <div className="inline-block" key={idx}>
                  <Image
                    alt="logo"
                    src={`/images/logo-partners/below/${_res?.src}`}
                    className="w-48 max-w-xs overflow-hidden "
                    radius="none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Parterns;
