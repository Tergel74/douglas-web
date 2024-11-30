"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { isLoading, isLoggedIn } = useGlobalContext();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/auth/sign-in");
        }
    });

    return <div className="h-[110vh] w-full">Solve</div>;
}
