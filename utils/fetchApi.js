import { useStoreLogin } from "../store/login";
import { useUser } from "../context/UserContext"; // Import the hook to get user context

const baseUrl = "http://localhost:8000/";
// const v3BaseUrl = "";

export const registerUser = async (name, email, phone_number, password) => {
  const url = `${baseUrl}api/v1/register/`;

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
  const response = await fetch("https://localhost:8000/api/v1/login/", {
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

