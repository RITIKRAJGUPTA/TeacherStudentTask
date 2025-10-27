import React from 'react';
import { useEffect, useState } from "react";
import api from "../services/api";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    api.get("/assignments").then((res) => setAssignments(res.data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
        Assignments
      </h2>
      {assignments.length === 0 ? (
        <p className="text-center text-gray-500">No assignments yet.</p>
      ) : (
        <ul className="space-y-3">
          {assignments.map((a) => (
            <li
              key={a._id}
              className="p-4 bg-white rounded shadow hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg text-blue-600">{a.title}</h3>
              <p>{a.description}</p>
              <p className="text-sm text-gray-500">Subject: {a.subject}</p>
              <p className="text-sm text-gray-500">
                Deadline: {a.deadline}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
