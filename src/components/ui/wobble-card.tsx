"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WobbleCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const WobbleCard = ({
  children,
  className,
  containerClassName,
}: WobbleCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const multiplier = 20; // Adjust for more/less rotation
    const rotateY = ((x - width / 2) / width) * multiplier;
    const rotateX = ((y - height / 2) / height) * multiplier * -1;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-3xl border p-8 bg-gray-900",
        containerClassName
      )}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
        transition: "all 0.1s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cn("relative z-10", className)}>{children}</div>
    </motion.div>
  );
};
