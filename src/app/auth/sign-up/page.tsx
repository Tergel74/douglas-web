"use client";

import React, { useEffect, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconArrowLeft,
} from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";
import { signUp } from "@/api/repositories/auth.repository";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function SignUp() {
    const router = useRouter();
    const { setUser, setIsLoggedIn } = useGlobalContext();
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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: "",
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !form.firstname ||
            !form.lastname ||
            !form.email ||
            !form.password ||
            !form.repeatPassword
        ) {
            notify("Please fill in all the fields", "🖋️");
        } else {
            if (form.password != form.repeatPassword) {
                notify("Please match two passwords", "🔏");
            } else {
                try {
                    const userData = await signUp(
                        form.firstname,
                        form.lastname,
                        form.email,
                        form.password
                    );
                    setForm({
                        firstname: "",
                        lastname: "",
                        email: "",
                        password: "",
                        repeatPassword: "",
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
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-200 dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to Douglas!
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">First name</Label>
                            <Input
                                id="firstname"
                                placeholder="Tergel"
                                type="text"
                                value={form.firstname}
                                onChange={(e: any) =>
                                    setForm({
                                        ...form,
                                        firstname: e.target.value,
                                    })
                                }
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastname">Last name</Label>
                            <Input
                                id="lastname"
                                placeholder="Bat"
                                type="text"
                                value={form.lastname}
                                onChange={(e: any) =>
                                    setForm({
                                        ...form,
                                        lastname: e.target.value,
                                    })
                                }
                            />
                        </LabelInputContainer>
                    </div>
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
                    <LabelInputContainer className="mb-8">
                        <Label htmlFor="repeatPassword">Repeat Password</Label>
                        <Input
                            id="repeatPassword"
                            placeholder="••••••••"
                            type="password"
                            value={form.repeatPassword}
                            onChange={(e: any) =>
                                setForm({
                                    ...form,
                                    repeatPassword: e.target.value,
                                })
                            }
                        />
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-primary dark:from-zinc-900 dark:to-zinc-900 to-primary block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign up &rarr;
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
                        <Link href={"/auth/sign-in"}>
                            <IconArrowLeft className="h-6 w-6 mt-2 -mb-6 text-neutral-800 dark:text-neutral-300" />
                        </Link>
                    </div>
                </form>
            </div>
            <Toaster position="top-center" />
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-purple-600 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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
