'use client'

import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import LottieAnimation from '@/components/ui/lottie-animation'
import { HeroHeader } from './HeroHeader'
import DotBackground from '@/components/ui/dot-background-demo'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <section>
                    <div className="relative pt-24">

                        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"></div>
                        {/* Top-right blob */}
                        <motion.div 
                            className="absolute -top-20 -right-20 w-[300px] h-[300px] z-0 opacity-30"
                            animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 2, 0]
                            }}
                            transition={{ 
                                duration: 8, 
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#FF9D5C" opacity="0.5" d="M39.9,-51.3C50.1,-39.9,55.9,-26.2,59.1,-11.7C62.4,2.9,63,18.3,56.6,29.8C50.2,41.3,36.7,48.9,22.7,53.5C8.7,58.1,-5.8,59.6,-20.8,56.6C-35.8,53.7,-51.3,46.2,-58.7,33.9C-66.1,21.6,-65.3,4.5,-60.9,-10.7C-56.5,-25.9,-48.6,-39.2,-37.3,-50.4C-26,-61.6,-11.3,-70.7,1.7,-72.6C14.7,-74.5,29.7,-62.7,39.9,-51.3Z" transform="translate(100 100)" />
                            </svg>
                        </motion.div>
                        <div className="mx-auto max-w-5xl px-6">
                            <div className="sm:mx-auto lg:mr-auto">
                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                >
                                    <h1
                                        className="mt-8 max-w-2xl text-balance text-4xl font-medium md:text-5xl lg:text-6xl lg:mt-16">
                                        Tired of Disorganized Work? Turn It Into Smooth-Running Apps & AI Tools
                                    </h1>
                                    <p
                                        className="mt-6 md:mt-8 max-w-2xl text-pretty text-base md:text-lg">
                                        We create custom web apps, mobile apps, and high-performing landing pages—so you can automate tasks, get more leads, and grow your business.
                                    </p>
                                    <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <div
                                            key={1}
                                            className="w-full sm:w-auto bg-foreground/10 rounded-[14px] border p-0.5">
                                            <Button
                                                asChild
                                                size="lg"
                                                className="w-full sm:w-auto rounded-xl px-5 text-base bg-orange-500 hover:bg-orange-600">
                                                <Link to="/contact">
                                                    <span className="text-nowrap">Get Your Free Tech Checkup</span> <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                        <Button
                                            key={2}
                                            asChild
                                            size="lg"
                                            variant="outline"
                                            className="w-full sm:w-auto h-[42px] rounded-xl px-5 text-base">
                                            <Link to="/projects">
                                                <span className="text-nowrap">See Our Work</span>
                                            </Link>
                                        </Button>
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-16 lg:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    {/* Add dotted background to the animation container */}
                                    <div className="relative w-full aspect-video sm:aspect-[4/3] md:aspect-[16/9] max-w-4xl mx-auto overflow-hidden">
                                        {/* Dotted background with fade at bottom */}
                                        <div className="absolute inset-0 -z-10 overflow-hidden">
                                            <DotBackground className="h-full w-full" />
                                            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
                                        </div>
                                        
                                        <motion.div
                                            animate={{ 
                                                y: [0, -15, 0],
                                            }}
                                            transition={{ 
                                                repeat: Infinity, 
                                                duration: 6,
                                                ease: "easeInOut"
                                            }}
                                            className="w-full h-full flex justify-center items-center relative z-10"
                                        >
                                            <LottieAnimation 
                                                src="https://lottie.host/580a4395-b55d-4d89-aa93-7ce4126015cb/Fpxn7zdf88.lottie" 
                                                className="w-full h-full object-contain"
                                                loop={true}
                                                autoplay={true}
                                                isDotLottie={true}
                                            />
                                        </motion.div>
                                        
                                        {/* Subtle pulse animation behind image */}
                                        <div className="absolute inset-0 rounded-full bg-orange-400 opacity-20 pulse-slow -z-10"></div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                {/* Clients section - hidden for now */}
                <section className="bg-background pb-16 pt-16 md:pb-32 hidden">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <Link
                                to="/clients"
                                className="block text-sm duration-150 hover:opacity-75">
                                <span>Meet Our Clients</span>

                                <ChevronRight className="ml-1 inline-block size-3" />
                            </Link>
                        </div>
                        <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                    alt="Nvidia Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/column.svg"
                                    alt="Column Logo"
                                    height="16"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/github.svg"
                                    alt="GitHub Logo"
                                    height="16"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/nike.svg"
                                    alt="Nike Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                                    alt="Lemon Squeezy Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/laravel.svg"
                                    alt="Laravel Logo"
                                    height="16"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-7 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/lilly.svg"
                                    alt="Lilly Logo"
                                    height="28"
                                    width="auto"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-6 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/openai.svg"
                                    alt="OpenAI Logo"
                                    height="24"
                                    width="auto"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}


