"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import "@theme-toggles/react/css/Lightbulb.css";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut } from "@/api/repositories/auth.repository";
import { useRouter } from "next/navigation";
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
    const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
    // const { scrollYProgress } = useScroll();
    const router = useRouter();

    // const [visible, setVisible] = useState(isLoggedIn);

    // const changeTheme = (dark: boolean) => {
    //     setTheme(!dark);
    //     console.log(theme);
    // };

    // useMotionValueEvent(scrollYProgress, "change", (current) => {
    //     // Check if current is not undefined and is a number
    //     if (typeof current === "number") {
    //         let direction = current! - scrollYProgress.getPrevious()!;

    //         // if (scrollYProgress.get() < 0.05) {
    //         //     setVisible(false);
    //         // } else {
    //         if (direction < 0) {
    //             setVisible(true);
    //         } else {
    //             setVisible(false);
    //         }
    //         // }
    //     }
    // });
    const logOut = async () => {
        await signOut();
        setIsLoggedIn(false);
        router.replace("/auth/sign-in");
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: isLoggedIn ? 0 : -100,
                    opacity: isLoggedIn ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit sticky top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-6 pl-8 py-2  items-center justify-center space-x-4",
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
                {isLoggedIn ? (
                    <button
                        className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
                        onClick={logOut}
                    >
                        <span>Sign Out</span>
                        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-purple-600 to-transparent  h-px" />
                    </button>
                ) : (
                    <Link
                        className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
                        href={signInLink}
                    >
                        <span>Sign in</span>
                        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-purple-600 to-transparent  h-px" />
                    </Link>
                )}
            </motion.div>
        </AnimatePresence>
    );
};
