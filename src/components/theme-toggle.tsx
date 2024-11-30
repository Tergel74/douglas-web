"use client";

import React, { useEffect, useState } from "react";
import { Lightbulb } from "@theme-toggles/react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<string>();

    useEffect(() => {
        let storageTheme = localStorage.getItem("theme") || "light";
        document.documentElement.classList.toggle(
            "dark",
            storageTheme === "dark"
        );
        setTheme(storageTheme as string);
    }, [theme]);
    return (
        <div className="absolute top-4 right-6 rounded-full w-12 h-12 bg-white dark:bg-black border border-transparent dark:border-white/[0.2] flex justify-center items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-400">
            <Lightbulb
                duration={750}
                className="scale-[1.8]"
                toggled={theme == "dark" ? true : false}
                onToggle={(toggled: boolean) => {
                    localStorage.setItem("theme", toggled ? "dark" : "light");
                    setTheme(toggled ? "dark" : "light");
                }}
            />
        </div>
    );
}
