/* eslint-disable no-console */
/* eslint-disable no-undef */
// services/authService.js
export async function login(username, password) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json(); // Expect { success: true, username: "..." }
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: error.message };
  }
}
