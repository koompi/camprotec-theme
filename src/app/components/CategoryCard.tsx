"use client";

import {
  useMotionValue,
  useSpring,
  useMotionTemplate,
  motion,
} from "framer-motion";
import React, { FC, useRef } from "react";
import { Image } from "@nextui-org/react";
import { Category } from "@/types/category";
import { Icon } from "@iconify/react";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const CategoryCard: FC<Category> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-36 sm:h-56 rounded-xl bg-gradient-to-br from-primary to-base-100 "
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-1 sm:inset-1 lg:inset-2 grid place-content-center rounded-lg bg-white shadow-lg"
      >
        {props?.logo ? (
          <Image
            alt=""
            src="/images/testing-product.png"
            style={{
              transform: "translateZ(75px)",
            }}
            className="mx-auto"
            isZoomed
            isBlurred
          />
        ) : (
          <Icon
            icon="solar:tag-bold-duotone"
            fontSize={60}
            className="text-primary mx-auto"
          />
        )}

        <h3
          style={{
            transform: "translateZ(50px)",
          }}
          className="text-sm sm:text-lg font-semibold text-primary text-center"
        >
          {props?.title?.en}
        </h3>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
