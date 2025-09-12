"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function DynamicList() {
  // Dummy data (API से fetch भी कर सकते हो)
  const [forms, setForms] = useState([
    {
      id: 1,
      name: "Contact",
      created_at: "2025-09-10T10:46:14.000000Z",
      updated_at: "2025-09-10T10:46:14.000000Z",
      fields: [
        {
          id: 1,
          form_id: 1,
          label: "Hosting Type",
          type: "checkbox",
          created_at: "2025-09-10T10:46:14.000000Z",
          updated_at: "2025-09-10T10:46:14.000000Z",
          options: [
            { id: 1, field_id: 1, option_value: "1" },
            { id: 2, field_id: 1, option_value: "2" },
            { id: 3, field_id: 1, option_value: "4" },
            { id: 4, field_id: 1, option_value: "6" },
          ],
        },
        {
          id: 2,
          form_id: 1,
          label: "Nett",
          type: "text",
          created_at: "2025-09-10T10:46:14.000000Z",
          updated_at: "2025-09-10T10:46:14.000000Z",
          options: [],
        },
      ],
    },
  ]);

  return (
    <div className="py-6 bg-black min-h-screen">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Dynamic Form List</h1>

        {forms.map((form) => (
          <div
            key={form.id}
            className="mb-8 border border-gray-700 rounded-lg overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-[#222] px-4 py-3 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-yellow-500">
                {form.name}
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white">
                  <FaEdit />
                </button>
                <button className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white">
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Fields Table */}
            <table className="w-full border-collapse text-white">
              <thead className="bg-[#333] text-yellow-500">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Field Label</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Options</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {form.fields.length > 0 ? (
                  form.fields.map((field, index) => (
                    <tr
                      key={field.id}
                      className="border-b border-gray-700 hover:bg-[#222] transition"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{field.label}</td>
                      <td className="p-3 capitalize">{field.type}</td>
                      <td className="p-3">
                        {field.options.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {field.options.map((opt) => (
                              <li key={opt.id}>{opt.option_value}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-500 italic">
                            No Options
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="px-2 py-1 bg-green-600 rounded hover:bg-green-700">
                            <FaEdit />
                          </button>
                          <button className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-4 text-center text-gray-400 italic"
                    >
                      No fields found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
