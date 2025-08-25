// src/utils/confirmDelete.js
import Swal from "sweetalert2";
import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "https://site2demo.in/doach/api/admin/v2", // <-- apna base url yaha set karo
});

export const confirmDelete = async (endpoint, callback) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await api.delete(endpoint); // sirf endpoint pass karna hoga
      await Swal.fire("Deleted!", "Record has been deleted.", "success");
      if (callback) callback(); // Optional function to refetch data
    } catch (error) {
      console.error(error);
      Swal.fire("Failed!", "There was a problem deleting.", "error");
    }
  }
};
