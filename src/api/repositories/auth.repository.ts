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
        // const refreshToken = userCredential.user.refreshToken;

        await setCookie("idToken", idToken, {
            secure: true,
            httpOnly: true,
            maxAge: 3600000,
        });
        // setCookie("refreshToken", refreshToken, {
        //     secure: true,
        //     httpOnly: true,
        // });

        const response = await post("/auth/sign-in", {});
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

// async function refreshToken() {
//     try {
//         const response = await fetch("/auth/refresh-token", {
//             method: "POST",
//             credentials: "include", // Ensures cookies are sent
//         });

//         if (response.status === 200) {
//             console.log("Token refreshed successfully.");
//         } else {
//             console.error("Failed to refresh token");
//         }
//     } catch (error) {
//         console.error("Error refreshing token:", error);
//     }
// }

// setInterval(() => {
//     refreshToken();
// }, 55 * 60 * 1000); // Refresh every 55 minutes

export async function refreshIdToken() {
    // try {
    //     const response = await post("/auth/refresh-token", {});
    //     return response;
    // } catch (error) {
    //     // console.error("Error during sign-in:", error);
    //     throw error;
    // }
    const user = auth.currentUser;
    if (user) {
        try {
            const newIdToken = await user.getIdToken(true);
            setCookie("idToken", newIdToken, {
                secure: true,
                httpOnly: true,
                maxAge: 3600000,
            });
        } catch (error) {
            console.error("Error refreshing token:", error);
            await signOut();
        }
    }
}

setInterval(refreshIdToken, 50 * 60 * 1000);
