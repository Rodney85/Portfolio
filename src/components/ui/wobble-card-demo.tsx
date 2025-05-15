"use client";

import React from "react";
import { WobbleCard } from "./wobble-card";
import LottieAnimation from "@/components/ui/lottie-animation";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-4 sm:px-6">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-orange-900 min-h-[400px] lg:min-h-[300px]"
      >
        <div className="w-full max-w-[90%] sm:max-w-xs">
          <h2 className="text-left text-balance text-xl font-semibold tracking-[-0.015em] text-white lg:text-3xl">
            Custom Web Applications That Solve Real Problems
          </h2>
          <p className="mt-4 text-left text-sm/6 sm:text-base/6 text-neutral-200">
            With experience in developing enterprise-level solutions, we build web applications that streamline your business operations.
          </p>
        </div>
        <div className="absolute -right-4 lg:-right-[40%] -bottom-10 w-[300px] h-[300px] opacity-70 hidden sm:block">
          {/* Replaced with a div to fix Lottie errors */}
          <div className="w-full h-full bg-orange-500/20 rounded-full animate-pulse"></div>
        </div>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-neutral-900">
        <div className="w-full max-w-[90%] sm:max-w-80">
          <h2 className="text-left text-balance text-xl font-semibold tracking-[-0.015em] text-white lg:text-3xl">
            Mobile apps for iOS and Android
          </h2>
          <p className="mt-4 text-left text-sm/6 sm:text-base/6 text-neutral-200">
            Reach your customers wherever they are with native and cross-platform mobile applications.
          </p>
        </div>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[400px] lg:min-h-[300px]">
        <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-lg">
          <div className="flex items-center gap-2">
            <h2 className="text-left text-balance text-xl font-semibold tracking-[-0.015em] text-white lg:text-3xl">
              AI-powered tools that take your business to the next level
            </h2>
            <span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">Coming Soon</span>
          </div>
          <p className="mt-4 text-left text-sm/6 sm:text-base/6 text-neutral-200">
            Leverage the power of artificial intelligence to automate tasks, gain insights, and make data-driven decisions.
          </p>
        </div>
        <div className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 w-[300px] h-[300px] opacity-70 hidden sm:block">
          {/* Replaced with a div to fix Lottie errors */}
          <div className="w-full h-full bg-blue-500/20 rounded-full animate-pulse"></div>
        </div>
      </WobbleCard>
    </div>
  );
}
