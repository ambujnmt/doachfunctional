import { useStoreLogin } from "../store/login";
import { useUser } from "../context/UserContext"; // Import the hook to get user context
import axios from "axios";

const baseUrl = "https://site2demo.in/doach/";
// Fetch user data by ID
// utils/fetchUserApi.js
export const getUserData = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}api/v1/user-data/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const json = await res.json();

    if (!json.status) {
      throw new Error("API returned status false");
    }

    // Return exactly what your component expects
    return {
      data: json.data,          // profile data
      onboarding: json.onboarding, // onboarding data
    };
  } catch (error) {
    console.error("API fetch error:", error);
    return { data: null, onboarding: null };
  }
};


// Update API
export const updateUserData = async (onboardingId, payload) => {
  const u = JSON.parse(localStorage.getItem("user") || "{}"); // get user token

  try {
    const response = await fetch(`${baseUrl}api/v1/onboarding-update/${onboardingId}`, {
      method: "POST", // Laravel route uses POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${u?.token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      const error = new Error(data.message || "Update failed");
      error.details = data.errors || {};
      throw error;
    }

    return data; // return updated onboarding data
  } catch (err) {
    console.error("Update Error:", err.message, err.details);
    throw err;
  }
};


