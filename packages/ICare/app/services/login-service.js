/* eslint-disable no-console */
/* eslint-disable no-undef */
const API_BASE = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const LOGIN_API_PATH = "/api/v1/auth/login";

function resolveLoginEndpoints() {
    const endpoints = [];
    const pushUnique = (url) => {
        if (url && !endpoints.includes(url)) {
            endpoints.push(url);
        }
    };

    if (API_BASE) {
        pushUnique(`${API_BASE}${LOGIN_API_PATH}`);
    }

    if (typeof window !== "undefined") {
        pushUnique(`${window.location.origin}${LOGIN_API_PATH}`);
        if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
            pushUnique(`http://localhost:4001${LOGIN_API_PATH}`);
            pushUnique(`http://127.0.0.1:4001${LOGIN_API_PATH}`);
        }
    } else {
        pushUnique(LOGIN_API_PATH);
    }

    return endpoints;
}

export async function login(email, password) {
    try {
        const payload = JSON.stringify({
            email: String(email || "").trim().toLowerCase(),
            password: String(password || "")
        });

        const endpoints = resolveLoginEndpoints();
        let lastHttpError = null;
        let lastConnectionError = null;

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: payload
                });

                if (!response.ok) {
                    const result = await response.json().catch(() => null);
                    lastHttpError = {
                        success: false,
                        message: result?.error?.message || "Invalid email or password",
                        remainingAttempts: result?.error?.remainingAttempts
                    };
                    continue;
                }

                const result = await response.json();
                const user = result?.data?.user;
                if (!user) return { success: false, message: "Invalid email or password" };

                console.log("Login successful", user);

                return {
                    success: true,
                    userdetails: {
                        id: user.id,
                        email: user.email,
                        role: user.userType
                    },
                    accessToken: result?.data?.accessToken || ""
                };
            } catch (error) {
                lastConnectionError = error;
            }
        }

        if (lastHttpError) {
            return lastHttpError;
        }

        throw lastConnectionError || new Error("Could not connect to login API.");
    } catch (error) {
        console.error("Error logging in:", error);
        return { success: false, message: error.message };
    }
}
