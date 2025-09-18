import { useStoreLogin } from "../store/login";
import { useUser } from "../context/UserContext"; 
import axios from "axios";

const baseUrl = "https://site2demo.in/doach/";

export const loginAdmin = async (formData) => {
  const response = await fetch(`${baseUrl}api/admin/v2/auth/login`, {
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

// get profile
export const updateProfile = async (formData) => {
  try {
    const token = localStorage.getItem("adminAuthToken"); // 👈 get token

    const response = await axios.post(
      `${baseUrl}api/admin/v2/update-profile`, // 👈 no ID here
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // 👈 send token
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("updateProfile error:", error.response?.data || error.message);
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

// fetchAdminApi.js
export const customerList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/all-customers`, {
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

export const customerDetails = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/customer-detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("getEvent error:", error);
    return { status: false, message: error.message };
  }
};

// start event section 

export const createEvent = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/event-create`, formData);
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

export const eventList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/event-list`, {
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


// get event
export const getEvent = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/event-get/${id}`);
    return response.data;
  } catch (error) {
    console.error("getEvent error:", error);
    return { status: false, message: error.message };
  }
};

//  Update event
export const updateEvent = async (formData, id) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/event-update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("updateEvent error:", error);
    throw new Error(error.response?.data?.message || "Failed to update event");
  }
};

// end event

// brand section

export const brandList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/brand-list`, {
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

export const createBrand = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/brand-create`, formData);
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

export const getBrandById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/brand-get/${id}`);
    return response.data;
  } catch (error) {
    console.error("getEvent error:", error);
    return { status: false, message: error.message };
  }
};

export const updateBrand = async (formData, id) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/brand-update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("updateEvent error:", error);
    throw new Error(error.response?.data?.message || "Failed to update event");
  }
};

// end brand section


// story section
export const storyList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/story-list`, {
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

export const createStory = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/story-create`, formData);
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


export const getStoryById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/story-get/${id}`);
    return response.data;
  } catch (error) {
    console.error("getEvent error:", error);
    return { status: false, message: error.message };
  }
};

export const updateStory = async (id, formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/story-update/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("updateStory error:", error);
    throw new Error(error.response?.data?.message || "Failed to update story");
  }
};
// end story section

// coaches start section

export const coachList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/coach-list`, {
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


export const createCoach = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/coach-create`, formData);
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

export const getCoachById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/coach-get/${id}`);
    return response.data;
  } catch (error) {
    console.error("getCoach error:", error);
    return { status: false, message: error.message };
  }
};


export const updateCoach = async (formData, id) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/coach-update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("updateEvent error:", error);
    throw new Error(error.response?.data?.message || "Failed to update event");
  }
};
// end coach section


// dunamic page list 
export const dynamicPageList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/page-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Pages ");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching Pages:", error);
    return [];
  }
};

export const dynamicPageCreate = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/page-create`, formData);
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

export const dynamicPageUpdate = async (id, formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/page-update/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("updateStory error:", error);
    throw new Error(error.response?.data?.message || "Failed to update story");
  }
};


// support section

export const customerSupport = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/customer-support`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customer support");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching customer support:", error);
    return [];
  }
};


// event contest awards

export const eventContestAwardsList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/event-contest-awards`, {
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


export const eventContestAwardCreate = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/event-contest-create`, formData);
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
// event contest awards 

// configration settings 

export const getSettings = async () => {
  const res = await axios.get(`${baseUrl}api/admin/v2/get-settings`);
  return res.data;
};

// ✅ Update settings
export const updateSettings = async (formData) => {
  const res = await axios.post(`${baseUrl}api/admin/v2/settings/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


// ----------------- Get Subscription  -----------------
export const createSubscription = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/subscription-plan/create`, formData);
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


export const getSubscriptionById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/subscription-plan/view/${id}`);
    return response.data;
  } catch (error) {
    console.error("getCoach error:", error);
    return { status: false, message: error.message };
  }
};


export const updateSubscription = async (id, data) => {
  const res = await fetch(`${baseUrl}api/admin/v2/subscription-plan/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update subscription");
  }

  return res.json();
};


export const getSubscriptionsList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/subscription-plan/list`, {
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


export const getSubscribedCustomers = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/subscribed-customers`, {
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

export const getSubscribedCustomerDetailById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/subscribed-customer-detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("getCustomerDetail error:", error);
    return { status: false, message: error.message };
  }
};


// category Community section
export const categoryCommunityList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/community/category-list`, {
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

export const createCommunityCategory = async (formData) => {
  try {
    const response = await axios.post(
      `${baseUrl}api/admin/v2/community/category-create`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ image ke liye zaroori
      }
    );
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


export const getCommunityCategoryById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/community/category-get/${id}`);
    return response.data;
  } catch (error) {
    console.error("getEvent error:", error);
    return { status: false, message: error.message };
  }
};

export const updateCommunityCategory = async (id, formData) => {
  return await axios.post(
    `${baseUrl}api/admin/v2/community/category-update/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const getcommunityList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/community-list`, {
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

export const createcommunityList = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/community-create`, formData);
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

export const getcommunityDetailById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/community-get/${id}`);
    return response.data;
  } catch (error) {
    console.error("getCustomerDetail error:", error);
    return { status: false, message: error.message };
  }
};


export const updatecommunity = async (id, formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/community-update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("updateEvent error:", error);
    throw new Error(error.response?.data?.message || "Failed to update event");
  }
};


// category section
export const categoryList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/category-list`, {
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

export const createCategory = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/category-create`, formData);
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

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/category-get/${id}`);
    return response.data;
  } catch (error) {
    console.error("getEvent error:", error);
    return { status: false, message: error.message };
  }
};

export const updateCategory = async (formData, id) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/category-update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("updateEvent error:", error);
    throw new Error(error.response?.data?.message || "Failed to update event");
  }
};


// product section
export const productList = async () => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/product-list`, {
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

export const createProduct = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/product-create`, formData);
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

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}api/admin/v2/product-get/${id}`);
    return response.data;
  } catch (error) {
    console.error("getEvent error:", error);
    return { status: false, message: error.message };
  }
};

export const updateProduct = async (formData, id) => {
  try {
    const response = await axios.post(`${baseUrl}api/admin/v2/product-update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("updateEvent error:", error);
    throw new Error(error.response?.data?.message || "Failed to update event");
  }
};

export const deleteGalleryImage = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}api/admin/v2/product-gallery/${id}`);
    if (response.data?.status) { // ✅ optional chaining
      return true; // success
    } else {
      console.warn("Delete API returned false:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Delete API error:", error.response?.data || error.message);
    return false;
  }
};

// dynamic form 
export const getFormList = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/admin/v2/form-list`);
    return res.data.data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getFormById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}api/admin/v2/forms/${id}`);
    console.log("API Response status:", res.status);
    if (!res.ok) throw new Error("Network response not ok");
    return await res.json();
  } catch (err) {
    console.error("Fetch form error:", err);
    return { status: false, data: null };
  }
};

export const saveForm = async (payload) => {
  try {
    const res = await axios.post(`${baseUrl}api/admin/v2/forms`, payload);
    return res.data;
  } catch (error) {
    console.error("Error saving form:", error);
    return { status: false, message: "Error saving form" };
  }
};

export const updateForm = async (id, payload) => {
  try {
    const res = await fetch(`${baseUrl}api/admin/v2/form-update/${id}`, {
      method: "post", // or PATCH depending on your backend
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("Update error response:", errData);
      return { status: false, message: errData.message || "Failed to update" };
    }

    return await res.json(); // { status: true, data: { ... } }
  } catch (err) {
    console.error("updateForm error:", err);
    return { status: false, message: "Something went wrong" };
  }
};


export const getFormSubmissions = async (section = "", sectionId = "", userId = "", token = "") => {
  try {
    let url = `${baseUrl}api/admin/v2/dynamic-data-listing?`;
    if (section) url += `section=${section}&`;
    if (sectionId) url += `section_id=${sectionId}&`;
    if (userId) url += `user_id=${userId}&`;

    const response = await fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return { status: false, data: [] };
  }
};

export const getFormSubmissionById = async (id, token = "") => {
  try {
    const response = await fetch(`${baseUrl}api/admin/v2/dynamic-data-view/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching submission:", error);
    return { status: false, data: null, message: "Something went wrong!" };
  }
};



