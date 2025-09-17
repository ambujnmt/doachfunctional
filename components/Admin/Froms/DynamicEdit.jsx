"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFormById, updateForm } from "../../../utils/fetchAdminApi";

export default function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formId = searchParams.get("id");

  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    (async () => {
      setLoading(true);
      const res = await getFormById(formId);

      if (res.status !== false && res.id) { // res.id exists means data returned
        setFormName(res.name || "");
        const mappedFields = res.fields.map((f) => ({
          id: f.id,
          label: f.label,
          type: f.type,
          options: f.options?.map((o) => ({
            id: o.id,
            value: o.option_value || "",
          })) || [],
        }));
        setFields(mappedFields);
      } else {
        toast.error("Failed to fetch form data.");
      }
      setLoading(false);
    })();
  }, [formId]);

  const handleFieldChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    if (key === "type" && (value === "text" || value === "textarea")) {
      updated[index].options = [];
    }
    setFields(updated);
  };

  const addField = () => setFields([...fields, { label: "", type: "text", options: [] }]);
  const removeField = (index) => setFields(fields.filter((_, i) => i !== index));

  const addOption = (fieldIndex) => {
    const updated = [...fields];
    updated[fieldIndex].options.push({ id: null, value: "" });
    setFields(updated);
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const updated = [...fields];
    updated[fieldIndex].options[optionIndex].value = value;
    setFields(updated);
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const updated = [...fields];
    updated[fieldIndex].options.splice(optionIndex, 1);
    setFields(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formName.trim()) return toast.error("Form name is required");

    const payload = {
      name: formName,
      fields: fields.map((f) => ({
        id: f.id || null,
        label: f.label,
        type: f.type,
        options: f.options.map((o) => ({ id: o.id || null, value: o.value })),
      })),
    };

    try {
      const res = await updateForm(formId, payload);
      if (res.status) {
        toast.success("Form update successfully!");
        setTimeout(() => router.push("/administor/form/listing"), 2000);
      } else {
        toast.error("Failed to update form.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-[#000] py-6 min-h-screen">
      <ToastContainer />
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Edit Form
          </h2>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
          >
            ← Back
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-yellow-400 font-medium mb-2">Form Name *</label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Enter form name"
            className="w-full border border-yellow-500 rounded-lg px-4 py-2 bg-[#1f1f1f] text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300 transition"
            required
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {loading ? (
            <p className="text-white">Loading fields...</p>
          ) : fields.length === 0 ? (
            <p className="text-white">No fields added yet.</p>
          ) : (
            fields.map((field, index) => (
              <div key={index} className="p-4 bg-[#1f1f1f] rounded-lg border border-gray-600">
                <div className="flex space-x-3 items-center mb-3">
                  <input
                    type="text"
                    placeholder="Field Label"
                    value={field.label}
                    onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                    className="flex-1 border border-yellow-500 p-2 rounded bg-[#1f1f1f] text-white placeholder-gray-400"
                    required
                  />
                  <select
                    value={field.type}
                    onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                    className="border border-yellow-500 p-2 rounded bg-[#1f1f1f] text-white"
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Select</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>

                {(field.type === "select" || field.type === "checkbox" || field.type === "radio") && (
                  <div className="mt-2">
                    <p className="text-yellow-400 font-medium mb-2">Options:</p>
                    {field.options.map((opt, i) => (
                      <div key={i} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={opt.value}
                          onChange={(e) => handleOptionChange(index, i, e.target.value)}
                          placeholder={`Option ${i + 1}`}
                          className="flex-1 border border-yellow-500 p-2 rounded bg-[#1f1f1f] text-white placeholder-gray-400"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(index, i)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addOption(index)}
                      className="bg-[#eab308] text-black px-3 py-1 rounded hover:bg-yellow-400 transition"
                    >
                      + Add Option
                    </button>
                  </div>
                )}
              </div>
            ))
          )}

          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={addField}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
            >
              + Add Field
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition"
            >
              Update Form
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
