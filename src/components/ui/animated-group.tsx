'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AnimatedGroupProps {
  children: React.ReactNode
  variants?: any
  className?: string
  initial?: string
  animate?: string
  exit?: string
  transition?: any
}

export function AnimatedGroup({
  children,
  variants,
  className,
  initial = 'hidden',
  animate = 'visible',
  exit = 'hidden',
  transition,
}: AnimatedGroupProps) {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={initial}
        animate={animate}
        exit={exit}
        variants={variants?.container}
        transition={transition}
      >
        {React.Children.map(children, (child, i) => {
          return (
            <motion.div
              key={i}
              variants={variants?.item}
              transition={
                transition ?? {
                  type: 'spring',
                  bounce: 0.3,
                  duration: 1.5,
                }
              }
            >
              {child}
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
