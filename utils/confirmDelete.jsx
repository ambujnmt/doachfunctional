import Swal from "sweetalert2";
import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8000/api/admin/v2/", // change if needed
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
      await api.delete(endpoint); // ✅ works now
      await Swal.fire("Deleted!", "Record has been deleted.", "success");
      if (callback) callback(); // refetch after delete
    } catch (error) {
      console.error(error);
      Swal.fire("Failed!", "There was a problem deleting.", "error");
    }
  }
};
