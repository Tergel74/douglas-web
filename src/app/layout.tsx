import type { Metadata } from "next";
import "./globals.css";
import { FloatingNav } from "../components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { useState } from "react";

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

    return (
        <html lang="en">
            <body className="bg-background">
                <FloatingNav navItems={navItems} signInLink="/auth/sign-in" />
                {children}
            </body>
        </html>
    );
}
