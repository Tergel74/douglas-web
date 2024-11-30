import type { Metadata } from "next";
import "./globals.css";
import { FloatingNav } from "../components/ui/floating-navbar";
import { initializeApp } from "firebase/app";
import GlobalProvider from "@/context/GlobalProvider";
import ThemeToggle from "@/components/theme-toggle";

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
        },
        {
            name: "History",
            link: "/history",
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
            <GlobalProvider>
                <body className="bg-background">
                    <FloatingNav
                        navItems={navItems}
                        signInLink="/auth/sign-in"
                    />
                    <ThemeToggle />
                    {/* <AnimatedSidebar links={links} /> */}
                    {children}
                </body>
            </GlobalProvider>
        </html>
    );
}
