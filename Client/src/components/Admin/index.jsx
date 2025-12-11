import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import AdminComponent from "./AdminComponent";

function Admin() {
  let params = useParams()
  const [password, setPassword] = useState(params.pswd || "")

  return (
    <>
      {password === import.meta.env.VITE_ADMIN_PASSWORD ? (
        <AdminComponent />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <h1 className="text-3xl mb-4">Unauthorized Access</h1>
          <p className="text-lg">You do not have permission to view this page.</p>
        </div>
      )}
    </>
  )

}

export default Admin;
