
import React from 'react';
import Lottie from 'lottie-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  isDotLottie?: boolean;
  speed?: number;
}

const LottieAnimation = ({ 
  src, 
  className = "", 
  loop = true, 
  autoplay = true,
  isDotLottie = false,
  speed = 0.5
}: LottieAnimationProps) => {
  if (isDotLottie) {
    return (
      <DotLottieReact 
        src={src} 
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        className={className}
      />
    );
  }
  
  return (
    <Lottie 
      animationData={src} 
      loop={loop}
      autoplay={autoplay}
      className={className}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice'
      }}
    />
  );
};

export default LottieAnimation;
