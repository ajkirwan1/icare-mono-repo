/* eslint-disable no-console */
/* eslint-disable no-undef */
// services/authService.js
export async function login(username, password) {
  try {
    const response = await fetch(
      `http://localhost:4000/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Parse the JSON response

    if (!data || data.length === 0) {
      // No matching user found
      return { success: false, message: "Invalid username or password" };
    }

    const user = data[0]; // Take the first matching user

    console.log("Login successful", user);

    // Return a clean object without exposing password
    return {
      success: true,
      userdetails: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: error.message };
  }
}
