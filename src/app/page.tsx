"use client";

import { refreshIdToken } from "@/api/repositories/auth.repository";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { auth } from "@/config/firebase";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { isLoading, isLoggedIn, setIsLoggedIn } = useGlobalContext();

    useEffect(() => {
        const checkSession = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    await refreshIdToken();
                } catch (error) {
                    console.log("Session expired. Redirecting to login.");
                    setIsLoggedIn(false);
                    router.replace("/auth/sign-in");
                }
            } else {
                setIsLoggedIn(false);
                router.replace("/auth/sign-in");
            }
        };

        checkSession();
        // if (!isLoading && !isLoggedIn) {
        //     router.replace("/auth/sign-in");
        // }
    }, [isLoggedIn]);

    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };
    return (
        <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
            <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
                Ask Douglas Anything
            </h2>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}
