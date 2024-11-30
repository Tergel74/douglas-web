import { signOut } from "@/api/repositories/auth.repository";
import React from "react";

export default function Profile() {
    return (
        <button
            onClick={() => {
                signOut();
            }}
        >
            Sign Out
        </button>
    );
}
