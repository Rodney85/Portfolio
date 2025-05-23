'use client'

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Gitlab } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, useScroll } from 'framer-motion'
import { ThemeToggle } from '../theme/ThemeToggle'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Us', path: '/about', description: 'Learn more about our team and mission' },
    { name: 'Contact', path: '/contact' },
]

export function HeroHeader() {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const location = useLocation()

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            // Activate blur effect on any scroll (> 0)
            setScrolled(latest > 0)
        })
        return () => unsubscribe()
    }, [scrollYProgress])
    
    const isActive = (path: string) => {
        return location.pathname === path
    }

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn('group fixed z-20 w-full border-b transition-all duration-150', scrolled && 'bg-background/40 backdrop-blur-md')}>
                <div className="mx-auto max-w-5xl px-4 sm:px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-4 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-6 md:gap-12 lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <span className="font-bold text-lg sm:text-xl md:text-2xl flex items-center gap-1.5">
                                    <span 
                                        className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent" 
                                        style={{ fontFamily: "'Playpen Sans Arabic', cursive", fontWeight: 700 }}
                                    >
                                        Dexor
                                    </span> 
                                    <motion.div
                                        animate={{ 
                                            rotate: [0, 0, 0, 0, 10, -10, 0],
                                            scale: [1, 1, 1, 1.1, 1.1, 1]
                                        }}
                                        transition={{ 
                                            duration: 2.5, 
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatDelay: 3
                                        }}
                                    >
                                        <Gitlab className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                                    </motion.div>
                                </span>
                            </Link>

                            <div className="flex items-center gap-4">
                                {/* Mobile-only theme toggle */}
                                <div className="lg:hidden z-20 mr-1">
                                    <ThemeToggle />
                                </div>
                                
                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {navLinks.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.path}
                                                className={isActive(item.path) 
                                                    ? "text-orange-500 relative font-medium after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-orange-500 after:-bottom-1 after:left-0" 
                                                    : "text-muted-foreground hover:text-accent-foreground block duration-150"}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-6 rounded-3xl border p-4 sm:p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {navLinks.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.path}
                                                className={isActive(item.path) 
                                                    ? "text-orange-500 font-medium" 
                                                    : "text-muted-foreground hover:text-accent-foreground block duration-150"}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit items-center">
                                {/* Desktop-only theme toggle */}
                                <div className="hidden lg:block">
                                    <ThemeToggle />
                                </div>
                                <Button
                                    asChild
                                    className="bg-orange-500 hover:bg-orange-600"
                                    size="sm">
                                    <Link to="/contact">
                                        <span>Let's Talk</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
