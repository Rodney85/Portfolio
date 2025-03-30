
import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation = ({ 
  src, 
  className = "", 
  loop = true, 
  autoplay = true 
}: LottieAnimationProps) => {
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
