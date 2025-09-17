import React, { useState } from "react";
import { saveForm } from "../../../utils/fetchAdminApi"; // helper import
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DynamicForm() {
  const [fields, setFields] = useState([{ label: "", type: "text", options: [] }]);
  const [formName, setFormName] = useState("");
  const router = useRouter();

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const addField = () => setFields([...fields, { label: "", type: "text", options: [] }]);
  const removeField = (index) => setFields(fields.filter((_, i) => i !== index));

  const addOption = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].options.push("");
    setFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = value;
    setFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: formName, fields };

    const res = await saveForm(payload); // helper API call
    if (res.status) {
      toast.success("Form created successfully!");
      setTimeout(() => router.push("/administor/form/listing"), 2000);
    } else {
      toast.error(error.message || "Failed to save form");
    }
  };

  return (
    <div className="bg-[#0F0F0F] py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Dynamic Form Builder
          </h2>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
          >
            ← Back
          </button>
        </div>

        {/* Form Name */}
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
          {fields.map((field, index) => (
            <div key={index} className="p-4 bg-[#1f1f1f] rounded-lg border border-gray-600">
              <div className="flex space-x-3 items-center">
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

              {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
                <div className="mt-3">
                  <p className="text-yellow-400 font-medium mb-2">Options:</p>
                  {field.options.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(index, i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className="w-full border border-yellow-500 p-2 rounded mb-2 bg-[#1f1f1f] text-white placeholder-gray-400"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(index)}
                    className="bg-[#eab308] text-dark px-3 py-1 rounded hover:bg-[#eab308] transition"
                  >
                    Add Option
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Actions */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={addField}
              className="bg-[#eab308] text-dark px-5 py-2 rounded-lg hover:bg-[#eab308] transition"
            >
              + Add Field
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-[#eab308] transition"
            >
              Save Form
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
