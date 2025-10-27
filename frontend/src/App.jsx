import React, { useState, Suspense, lazy } from "react";
import RoleSelection from "./components/RoleSelection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load components
const TeacherForm = lazy(() => import("./components/TeacherForm"));
const AssignmentList = lazy(() => import("./components/AssignmentList"));

function App() {
  const [role, setRole] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Student–Teacher Connect
      </h1>

      {!role && <RoleSelection setRole={setRole} />}

      <Suspense fallback={<p className="text-center">Loading...</p>}>
        {role === "teacher" && <TeacherForm />}
        {role === "student" && <AssignmentList />}
      </Suspense>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
