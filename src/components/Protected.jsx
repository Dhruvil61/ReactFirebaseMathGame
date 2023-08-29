import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  if (localStorage.getItem("user")) {
    return children;
  }
  return <Navigate to="/" replace />;
}
export default Protected;
