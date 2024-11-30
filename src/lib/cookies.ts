"use server";

import { cookies } from "next/headers";

export async function getCookie(key: string) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(key);
    return cookie;
}

export async function getAllCookies(key: string) {
    const cookieStore = await cookies();
    const allCookies = await cookieStore.getAll();
    return allCookies;
}

export async function setCookie(key: string, value?: string, options?: any) {
    const cookieStore = await cookies();
    if (value) {
        cookieStore.set(key, value, options);
    } else {
        cookieStore.delete(key);
    }
}
