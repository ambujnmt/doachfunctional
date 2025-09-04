import { useStoreLogin } from "../store/login";
import { useUser } from "../context/UserContext"; // Import the hook to get user context
import axios from "axios";

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



export const brandHomePage = async () => {
  try {
    const response = await fetch(`${baseUrl}api/v1/brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};

export const eventHomePage = async () => {
  try {
    const response = await fetch(`${baseUrl}api/v1/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};


export const storiesHomePage = async () => {
  try {
    const response = await fetch(`${baseUrl}api/v1/stories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};

export const coachesHomePage = async () => {
  try {
    const response = await fetch(`${baseUrl}api/v1/coaches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};


export const eventContestAwardsHomePage = async () => {
  try {
    const response = await fetch(`${baseUrl}api/v1/event-contest-awards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};

export const getDynamicPageBySlug = async (slug) => {
  try {
    const response = await axios.get(`${baseUrl}api/v1/page/${slug}`);
    return response.data;
  } catch (error) {
    console.error("getCoach error:", error);
    return { status: false, message: error.message };
  }
};

export const saveSupportMessage = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/v1/customer-support`, formData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 422 && error.response.data?.errors) {
      const firstError = Object.values(error.response.data.errors)[0][0];
      throw new Error(firstError);
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message || "Something went wrong");
  }
};


export const getSubscriptionsList = async () => {
  try {
    const response = await axios.get(`${baseUrl}api/v1/subscriptions`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
};

export const checkoutSubscription = async (payload) => {
  try {
    const res = await axios.post(`${baseUrl}api/v1/subscription/checkout`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data; // { url: "https://checkout.stripe.com/..." }
  } catch (error) {
    console.error("checkoutSubscription error:", error);
    return { url: null, error: error.message };
  }
};



