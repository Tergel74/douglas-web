"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { isLoading, isLoggedIn } = useGlobalContext();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.replace("/auth/sign-in");
        }
    }, [isLoggedIn]);

    return <div className="w-full">Solve</div>;
}
