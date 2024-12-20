"use client";

import React, { useEffect, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { signIn } from "@/api/repositories/auth.repository";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function SignIn() {
    const router = useRouter();
    const { setIsLoggedIn, setUser } = useGlobalContext();
    const notify = (message: string, icon?: string) => {
        const darkMode = document.documentElement.classList.contains("dark");

        toast(message, {
            icon: icon,
            style: {
                borderRadius: "20px",
                background: darkMode ? "white" : "#7c3aed",
                color: darkMode ? "black" : "white",
            },
        });
    };
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            notify("Please fill in all the fields", "🖋️");
        } else {
            if (form.password.length < 6) {
                notify(
                    "The password must be a string with at least 6 characters",
                    "🔏"
                );
            } else {
                try {
                    const userData = await signIn(form.email, form.password);
                    setForm({
                        email: "",
                        password: "",
                    });
                    localStorage.setItem("user", JSON.stringify(userData));
                    setUser(userData);
                    setIsLoggedIn(true);
                    router.replace("/");
                } catch (error: any) {
                    notify(error.message, "🔏");
                }
            }
        }
    };
    return (
        <div className="w-full h-[94vh] flex items-center -mt-10">
            <div className="relative max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-200 dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome back!
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="douglas@gmail.com"
                            type="email"
                            value={form.email}
                            onChange={(e: any) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={form.password}
                            onChange={(e: any) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                        />
                    </LabelInputContainer>
                    <button
                        className="bg-gradient-to-br relative group/btn from-primary dark:from-zinc-900 dark:to-zinc-900 to-primary block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign in &rarr;
                        <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    <div className="flex flex-col space-y-4">
                        <button
                            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="submit"
                        >
                            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                Google
                            </span>
                            <BottomGradient />
                        </button>
                    </div>
                </form>
                <div className="absolute right-10 bottom-5">
                    <Link
                        href={"/auth/sign-up"}
                        className="text-primary text-base font-semibold dark:text-white"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-primary dark:via-primary to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-[2px] w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 dark:via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
