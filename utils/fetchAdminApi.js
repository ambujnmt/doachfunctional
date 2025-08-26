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