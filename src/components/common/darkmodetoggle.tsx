'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'
import { darkModeAtom } from '@/store'

const MotionSunIcon = motion(SunIcon)
const MotionMoonIcon = motion(MoonIcon)

const SunVariants = {
    visible: {
        y: 0,
        rotate: 0
    },
    hidden: {
        y: 60,
        rotate: '-360deg'
    }
}
const MoonVariants = {
    visible: {
        y: 0,
        rotate: 0
    },
    hidden: {
        y: 60,
        rotate: '-90deg'
    }
}

export default function DarkmodeToggle() {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <button
            className="m-2 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-none bg-transparent p-3 text-black outline-none duration-300 hover:bg-black/10 focus-visible:shadow-focus-ring"
            onClick={() => setDarkMode(!darkMode)}
        >
            <AnimatePresence mode="wait">
                {darkMode ? (
                    <MotionSunIcon
                        key="lightModeButton"
                        width={30}
                        initial="hidden"
                        animate="visible"
                        variants={SunVariants}
                        transition={{ type: 'linear', duration: 0.3 }}
                        exit="hidden"
                    />
                ) : (
                    <MotionMoonIcon
                        key="darkModeButton"
                        width={30}
                        initial="hidden"
                        animate="visible"
                        variants={MoonVariants}
                        transition={{ type: 'linear', duration: 0.3 }}
                        exit="hidden"
                    />
                )}
            </AnimatePresence>
        </button>
    )
}
