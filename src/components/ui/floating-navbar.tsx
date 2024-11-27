"use client";
import React, { useEffect, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import "@theme-toggles/react/css/Lightbulb.css";
import { Lightbulb } from "@theme-toggles/react";
// import useLocalStorage from "@/lib/storage";

export const FloatingNav = ({
    navItems,
    className,
    signInLink,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
    signInLink: string;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(true);
    // const visible = true;

    const [theme, setTheme] = useState<string>();

    // const changeTheme = (dark: boolean) => {
    //     setTheme(!dark);
    //     console.log(theme);
    // };

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            // if (scrollYProgress.get() < 0.05) {
            //     setVisible(false);
            // } else {
            if (direction < 0) {
                setVisible(true);
            } else {
                setVisible(false);
            }
            // }
        }
    });

    useEffect(() => {
        let storageTheme;
        storageTheme = localStorage.getItem("theme") || "light";
        setTheme(storageTheme as string);
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit sticky top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-10 pl-8 py-2  items-center justify-center space-x-4",
                    className
                )}
            >
                {navItems.map((navItem: any, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                        )}
                    >
                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="hidden sm:block text-sm">
                            {navItem.name}
                        </span>
                    </Link>
                ))}
                <Link
                    className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
                    href={signInLink}
                >
                    <span>Login</span>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-purple-600 to-transparent  h-px" />
                </Link>
                <Lightbulb
                    duration={750}
                    className="scale-[1.8] translate-x-2"
                    toggled={theme == "dark" ? true : false}
                    onToggle={(toggled: boolean) => {
                        console.log(toggled);
                        localStorage.setItem(
                            "theme",
                            toggled ? "dark" : "light"
                        );
                        setTheme(toggled ? "dark" : "light");
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
};
