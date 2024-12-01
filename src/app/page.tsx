"use client";

import { refreshIdToken } from "@/api/repositories/auth.repository";
import { auth } from "@/config/firebase";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { isLoading, isLoggedIn } = useGlobalContext();

    useEffect(() => {
        console.log("sad");
        const checkSession = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    await refreshIdToken();
                } catch (error) {
                    console.log("Session expired. Redirecting to login.");
                    router.replace("/auth/sign-in");
                }
            } else {
                router.replace("/auth/sign-in");
            }
        };

        checkSession();
        if (!isLoading && !isLoggedIn) {
            router.replace("/auth/sign-in");
        }
    }, [isLoggedIn]);

    return <div className="w-full">Solve</div>;
}
