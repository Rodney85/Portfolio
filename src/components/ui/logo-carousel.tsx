"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoCarouselProps {
  className?: string;
  logos: { src: string; alt: string }[];
}

export function LogoCarousel({ className, logos }: LogoCarouselProps) {
  const [duplicatedLogos, setDuplicatedLogos] = React.useState<typeof logos>([]);

  React.useEffect(() => {
    // Duplicate logos multiple times to create seamless loop
    setDuplicatedLogos([...logos, ...logos, ...logos, ...logos]);
  }, [logos]);

  return (
    <div className={cn("w-full overflow-hidden bg-[#1C1F37] rounded-xl py-8", className)}>
      <motion.div
        className="flex gap-16"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          width: `${(duplicatedLogos.length / 2) * 100}%`,
        }}
      >
        {duplicatedLogos.map((logo, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: "120px" }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-16 h-16 object-contain hover:scale-110 transition-transform"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
