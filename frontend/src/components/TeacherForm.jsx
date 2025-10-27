import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function TeacherForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    deadline: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.title.trim() || !form.description.trim() || !form.subject.trim() || !form.deadline) {
      toast.error("Please fill out all fields.");
      return false;
    }

    if (form.title.length < 3) {
      toast.warn("Title must be at least 3 characters long.");
      return false;
    }

    const deadlineDate = new Date(form.deadline);
    if (deadlineDate < new Date()) {
      toast.error("Deadline must be a future date.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await api.post("/assignments", form);
      toast.success("✅ Assignment posted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setForm({ title: "", description: "", subject: "", deadline: "" });
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to post assignment. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Post Assignment
      </h2>

      {["title", "description", "subject", "deadline"].map((field) => (
        <input
          key={field}
          type={field === "deadline" ? "date" : "text"}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
      ))}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition"
      >
        Submit
      </button>
    </form>
  );
}
