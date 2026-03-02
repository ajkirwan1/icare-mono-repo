/* eslint-disable no-console */
/* eslint-disable no-undef */
const API_BASE = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                email: String(email || "").trim().toLowerCase(),
                password: String(password || "")
            })
        });

        if (!response.ok) {
            const result = await response.json().catch(() => null);
            return {
                success: false,
                message: result?.error?.message || "Invalid email or password",
                remainingAttempts: result?.error?.remainingAttempts
            };
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
        console.error("Error logging in:", error);
        return { success: false, message: error.message };
    }
}
