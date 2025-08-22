import { useStoreLogin } from "../store/login";
import { useUser } from "../context/UserContext"; // Import the hook to get user context

const baseUrl = "https://site2demo.in/doach/";
// const v3BaseUrl = "";

export const registerUser = async (name, email, phone_number, password) => {
  const url = `${baseUrl}api/v1/register`;

  try {
    const payload = { name, email, phone_number, password };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result?.status) {
      const error = new Error(result.message || "Registration failed");
      error.details = result.errors || {}; // ✅ Attach server validation errors
      throw error;
    }

    return result;
  } catch (error) {
    console.error("Registration Error:", error.message, error.details);
    throw error;
  }
};

export const loginUser = async (formData) => {
  const response = await fetch(`${baseUrl}api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Login failed");
  }

  return data; 
};

export const onboardingUser = async (payload) => {
  const u = JSON.parse(localStorage.getItem("user") || "{}"); // get user token

  try {
    const response = await fetch(`${baseUrl}api/v1/onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${u?.token}`, // include auth if available
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data?.status) {
      const error = new Error(data.message || "Onboarding failed");
      error.details = data.errors || {};
      throw error;
    }

    return data; // return backend-confirmed onboarding data
  } catch (error) {
    console.error("Onboarding Error:", error.message, error.details);
    throw error;
  }
};

