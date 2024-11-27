import Link from "next/link";
import React from "react";

export default function SignIn() {
    return (
        <div>
            <Link href={"/auth/sign-up"} className="">
                Sign Up
            </Link>
        </div>
    );
}
