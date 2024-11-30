import { signInWithEmailAndPassword } from "firebase/auth";
import { post } from "../clients/api-http-client";
import { setStorageItem } from "@/lib/storage";
import { setCookie } from "@/lib/cookies";
import { auth } from "../../config/firebase";

export async function signIn(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const idToken = await userCredential.user.getIdToken();

        const response = await post("/auth/sign-in", { idToken: idToken });
        return response;
    } catch (error) {
        // console.error("Error during sign-in:", error);
        throw error;
    }
}

export async function signUp(
    firstname: string,
    lastname: string,
    email: string,
    password: string
) {
    try {
        const response = await post("/auth/sign-up", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        });
        return await signIn(email, password);
    } catch (error) {
        // console.error("Error during sign-up:", error);
        throw error;
    }
}

export async function signOut() {
    await setStorageItem("user");
    await setCookie("customToken");
    await setCookie("idToken");
}
