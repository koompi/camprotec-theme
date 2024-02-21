"use client";

import { FC, ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface TemplateProp {
  children: ReactNode;
}

const Template: FC<TemplateProp> = ({ children }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return <div>{children}</div>;
};

export default Template;
