import React from "react";
import { toast } from "react-toastify";

export default function RoleSelection({ setRole }) {
  const handleRoleSelect = (role) => {
    toast.success(`You chose to continue as ${role}!`, {
      position: "top-center",
      autoClose: 3000,
    });

    // Delay the role update by 3 seconds
    setTimeout(() => {
      setRole(role);
    }, 3000);
  };

  return (
    <div className="flex justify-center gap-6">
      <button
        onClick={() => handleRoleSelect("teacher")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        I’m a Teacher
      </button>
      <button
        onClick={() => handleRoleSelect("student")}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        I’m a Student
      </button>
    </div>
  );
}
