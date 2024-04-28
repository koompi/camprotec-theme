"use client";

import { Spacer } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Icon, IconProps } from "@iconify/react";
import Logo from "../Logo";
import { useTheme } from "@/context/useTheme";
import { Social } from "@/types/global";

type SocialIconProps = Omit<IconProps, "icon">;

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "About",
    href: "/about",
  },
];

const socialItems = [
  {
    name: "Facebook",
    href: "#",
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:facebook" />
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:instagram" />
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:twitter" />
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:youtube-play" />
    ),
  },
  {
    name: "Telegram",
    href: "#",
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:telegram" />
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (props: SocialIconProps) => <Icon {...props} icon="bi:tiktok" />,
  },
];

const Footer = () => {
  const { value } = useTheme();

  return (
    <footer className="flex w-full flex-col bg-gradient-to-l from-primary/10 pb-12 sm:pb-12 lg:pb-0">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        {value?.footer?.contact && (
          <div>
            <Spacer y={6} />
            <div className="flex items-center justify-center gap-3 font-bold text-primary text-xl">
              <span>{value?.footer?.contact?.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span>{value?.footer?.contact?.email}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span>{value?.footer?.contact?.address}</span>
            </div>
          </div>
        )}
        <Spacer y={6} />
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {navLinks.map((item) => (
            <Link key={item.name} className="text-default-500" href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
        <Spacer y={6} />

        <div className="flex justify-center gap-x-4">
          {value?.footer?.socials &&
            value?.footer?.socials
              ?.filter((s: Social) => s.enable)
              .map((social: Social, idx: number) => {
                return (
                  <Link
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="norerfer"
                  >
                    {social.name === "youtube" && (
                      <Icon
                        className="text-primary hover:text-primary/70"
                        icon="fontisto:youtube-play"
                      />
                    )}
                    {social.name === "facebook" && (
                      <Icon
                        className="text-primary hover:text-primary/70"
                        icon="fontisto:facebook"
                      />
                    )}
                    {social.name === "telegram" && (
                      <Icon
                        className="text-primary hover:text-primary/70"
                        icon="fontisto:telegram"
                      />
                    )}
                    {social.name === "twitter" && (
                      <Icon
                        className="text-primary hover:text-primary/70"
                        icon="fontisto:twitter"
                      />
                    )}
                    {social.name === "instagram" && (
                      <Icon
                        className="text-primary hover:text-primary/70"
                        icon="fontisto:instagram"
                      />
                    )}
                    {social.name === "tiktok" && (
                      <Icon
                        className="text-primary hover:text-primary/70"
                        icon="bi:tiktok"
                      />
                    )}
                  </Link>
                );
              })}
        </div>
        <Spacer y={4} />
        <p className="mt-1 text-center text-small text-default-400">
          &copy; 2024 {value?.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
