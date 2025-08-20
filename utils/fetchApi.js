import { useStoreLogin } from "../store/login";
import { useUser } from "../context/UserContext"; // Import the hook to get user context

const baseUrl = "http://localhost:8000/";
// const v3BaseUrl = "";

export const createNewPasswordApi = async (email, password) => {
  const url = "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/create-new-password";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      throw {
        status: false,
        message: data.message,
        errors: data.data || null,
      };
    }

    return {
      status: true,
      message: data.message,
      message_italian: data.message_italian || data.message,
    };

  } catch (error) {
    console.error("Error creating new password:", error);
    throw error;
  }
};

export const verifyOtp = async ({ email, otp }) => {
  const response = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, otp })
  });

  const data = await response.json();
  if (!response.ok) throw data;
  return data;
};

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
  const response = await fetch(`${baseUrl}api/v1/login/`, {
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

export const createUser = async (payload, accessToken) => {
  try {
    const res = await fetch(`https://lumeo.com.tr/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // Log the raw response status and data for debugging
    console.log('Response status:', res.status);
    console.log('Response data:', data);

    // Check if the response body indicates success
    if (data?.message === 'User added successfully') {
      return { success: true, message: data.message, data };
    }

    return { success: false, message: data?.detail || 'Error creating user' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const fetchUsers = async (accessToken) => {
  try {
    const response = await fetch('https://lumeo.com.tr/api/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    console.error('Fetch users error:', error);
    return [];
  }
};

export const updateUser = async (accessToken, id, data, isFormData = false) => {
  try {
    const headers = isFormData
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };

    const response = await fetch(`https://lumeo.com.tr/api/users/${id}/`, {
      method: 'PUT',
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });

    const result = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      data: result,
    };
  } catch (error) {
    return {
      ok: false,
      error: 'Network error or server unreachable',
    };
  }
};

export async function createProject(data, accessToken) {
  if (!accessToken) {
    console.error("No access token found. Please log in.");
    return { success: false, message: "No access token provided." };
  }

  try {
    const response = await fetch("https://lumeo.com.tr/api/projects/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("API response status:", response.status);
    console.log("API response JSON:", result);

    if (!response.ok) {
      const errorMsg = result?.message || "API returned an error.";
      return { success: false, message: errorMsg };
    }

    return {
      success: true,
      message: result.message || "Project created successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Network or fetch error:", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
};