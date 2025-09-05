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




