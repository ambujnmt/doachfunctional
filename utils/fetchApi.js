import { useStoreLogin } from "../store/login";
import { useUser } from "../context/UserContext"; // Import the hook to get user context
import axios from "axios";
import { productList } from "./fetchAdminApi";

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
      error.details = result.errors || {}; 
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


// Fetch feedback for a specific story
export const fetchStoryFeedback = async (storyId, token) => {
  try {
    const res = await axios.get(`${baseUrl}api/v1/stories/${storyId}/feedback`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching story feedback:", err);
    return { likes: 0, dislikes: 0, comments: [] };
  }
};

// React to a story (like/dislike)
export const reactToStory = async (storyId, type, userId, token) => {
  try {
    const res = await axios.post(
      `${baseUrl}api/v1/stories/${storyId}/react`,
      { type, user_id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Error reacting to story:", err);
    return { likes: 0, dislikes: 0 };
  }
};

// Add a comment
export const addCommentToStory = async (storyId, comment, userId, token) => {
  try {
    const res = await axios.post(
      `${baseUrl}api/v1/stories/${storyId}/comment`,
      { comment, user_id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data;
  } catch (err) {
    console.error("Error adding comment:", err);
    return null;
  }
};


// Fetch feedback for an event
export const fetchEventFeedback = async (eventId, token) => {
  try {
    const res = await axios.get(`${baseUrl}api/v1/events/${eventId}/feedback`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching event feedback:", err);
    return { likes: 0, dislikes: 0, comments: [] };
  }
};

// React to an event
export const reactToEvent = async (eventId, type, userId, token) => {
  try {
    const res = await axios.post(
      `${baseUrl}api/v1/events/${eventId}/react`,
      { type, user_id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Error reacting to event:", err);
    return { likes: 0, dislikes: 0 };
  }
};

// Add comment to an event
export const addCommentToEvent = async (eventId, comment, userId, token) => {
  try {
    const res = await axios.post(
      `${baseUrl}api/v1/events/${eventId}/comment`,
      { comment, user_id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data;
  } catch (err) {
    console.error("Error adding comment:", err);
    return null;
  }
};


// Fetch feedback for an coach
export const fetchCoachFeedback = async (coachId, token) => {
  try {
    const res = await axios.get(`${baseUrl}api/v1/coaches/${coachId}/feedback`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching event feedback:", err);
    return { likes: 0, dislikes: 0, comments: [] };
  }
};

// React to an event
export const reactToCoach = async (coachId, type, userId, token) => {
  try {
    const res = await axios.post(
      `${baseUrl}api/v1/coaches/${coachId}/react`,
      { type, user_id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Error reacting to event:", err);
    return { likes: 0, dislikes: 0 };
  }
};

// Add comment to an event
export const addCommentToCoach = async (coachId, comment, userId, token) => {
  try {
    const res = await axios.post(
      `${baseUrl}api/v1/coaches/${coachId}/comment`,
      { comment, user_id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data;
  } catch (err) {
    console.error("Error adding comment:", err);
    return null;
  }
};

// category section
export const getCategoriesList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/v1/get-category-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result = await response.json();
    return result; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { status: false, data: [] }; // fallback
  }
};


// productList
export const getProductsList = async () => {
  try {
    const response = await axios.get(`${baseUrl}api/v1/get-product-list`);
    return response.data || { status: false, data: [] }; // return full response
  } catch (error) {
    console.error("Error fetching products:", error);
    return { status: false, data: [] };
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const res = await fetch(`${baseUrl}api/v1/get-product-detail/${slug}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return { status: false };
  }
};


export const addToCart = async (cartData) => {
  try {
    const response = await axios.post(`${baseUrl}api/v1/cart/add`, cartData);
    return response.data;
  } catch (error) {
    console.error("Add to cart error:", error);
    return { status: false, message: error.message };
  }
};

// cart list fetch karne ka helper
export const getCartList = async (userId) => {
  try {
    const res = await axios.get(`${baseUrl}api/v1/cart/list/${userId}`);
    return res.data; // JSON response return karega
  } catch (err) {
    console.error("Error fetching cart list:", err);
    return { status: false, message: "Error fetching cart" };
  }
};

export const updateCartQuantity = async (cartId, quantity) => {
  try {
    const res = await fetch(`${baseUrl}api/v1/cart/update-quantity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}` // If using token
      },
      body: JSON.stringify({ cart_id: cartId, quantity }),
    });
    return await res.json();
  } catch (error) {
    console.error("API error:", error);
    return { status: false, message: "Something went wrong." };
  }
};

export const productChechout = async (cartData) => {
  try {
    const response = await axios.post(`${baseUrl}api/v1/product/checkout`, cartData);
    return response.data;
  } catch (error) {
    console.error("Checkout error:", error);
    return { status: false, message: error.message };
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const response = await axios.get(`${baseUrl}api/v1/cart/item-delete/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Remove cart item error:", error);
    return { status: false, message: error.message };
  }
};