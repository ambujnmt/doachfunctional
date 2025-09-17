"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getFormSubmissionById } from "../../../utils/fetchAdminApi";

export default function Detail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [submission, setSubmission] = useState({ form_data: {}, user: {} }); // default state

  useEffect(() => {
    if (!id) return;

    const fetchSubmission = async () => {
      const token = localStorage.getItem("token");
      const res = await getFormSubmissionById(id, token);
      if (res.status && res.data) {
        setSubmission(res.data);
      }
    };

    fetchSubmission();
  }, [id]);

  return (
    <div className="py-6 bg-black min-h-screen">
      <div className="space-y-4">
        {/* Submission Card */}
        <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
          {/* Header Row */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Submission ID: {submission.id || "-"}
            </h2>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
            >
              ← Back
            </button>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 mb-6">
            <p><strong>Section:</strong> {submission.section?.toUpperCase() || "-"}</p>
            <p><strong>ID:</strong> {submission.section_id || "-"}</p>
            <p><strong>Submitted At:</strong> {submission.created_at ? new Date(submission.created_at).toLocaleString() : "-"}</p>
          </div>

          {/* User Info */}
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3 text-white">User Info</h3>
            {submission.user ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-200">
                <p><strong>Name:</strong> {submission.user.name || "Guest User"}</p>
                <p><strong>Email:</strong> {submission.user.email || "-"}</p>
                <p><strong>Phone:</strong> {submission.user.phone_number || "-"}</p>
                <p><strong>Registered Date:</strong> {submission.user.created_at || "-"}</p>
              </div>
            ) : (
              <p className="text-gray-400">Guest User</p>
            )}
          </div>

          {/* Form Data */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-white">Form Data</h3>
            {submission.form_data && Object.keys(submission.form_data).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.keys(submission.form_data).map((key) => (
                  <div key={key} className="bg-gray-700 p-3 rounded text-gray-200">
                    <strong>{key}:</strong> {submission.form_data[key] || "-"}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No form data submitted.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
