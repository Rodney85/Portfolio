import { cn } from "@/lib/utils";
import React from "react";

interface DotBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export default function DotBackground({ className, children }: DotBackgroundProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Dotted background pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Removed the radial gradient mask */}
      
      {/* Render children inside the background */}
      {children}
    </div>
  );
}

// Demo component with example content
export function DotBackgroundDemo() {
  return (
    <DotBackground className="flex h-[50rem] items-center justify-center bg-white dark:bg-black">
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Backgrounds
      </p>
    </DotBackground>
  );
}
