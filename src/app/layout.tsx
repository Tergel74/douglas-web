import type { Metadata } from "next";
import "./globals.css";
import { FloatingNav } from "../components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser, Icon } from "@tabler/icons-react";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import AnimatedSidebar from "@/components/animated-sidebar";

export const metadata: Metadata = {
    title: "Douglas",
    description: "Study Assistant",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const navItems = [
        {
            name: "Solve",
            link: "/",
            icon: (
                <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
        {
            name: "History",
            link: "/history",
            icon: (
                <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ];
    // const links = [
    //     {
    //         label: "Dashboard",
    //         href: "#",
    //         icon: (
    //             <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    //     {
    //         label: "Profile",
    //         href: "#",
    //         icon: (
    //             <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    //     {
    //         label: "Settings",
    //         href: "#",
    //         icon: (
    //             <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    //     {
    //         label: "Logout",
    //         href: "#",
    //         icon: (
    //             <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    // ];

    return (
        <html lang="en">
            <body className="bg-background">
                <FloatingNav navItems={navItems} signInLink="/auth/sign-in" />
                {/* <AnimatedSidebar links={links} /> */}
                {children}
            </body>
        </html>
    );
}
