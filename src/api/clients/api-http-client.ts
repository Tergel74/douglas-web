const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function get(endpoint: string) {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`);
        const responseData = await res.json();

        if (responseData.ok) {
            return responseData;
        } else {
            throw responseData;
        }
    } catch (err) {
        // console.error("Error fetching data: ", err);
        throw err;
    }
}
export async function post(endpoint: string, data: {}) {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = await res.json();
        if (!("statusCode" in responseData)) {
            return responseData;
        } else {
            throw responseData;
        }
    } catch (err) {
        // console.error("Error posting data:", err);
        throw err;
    }
}
