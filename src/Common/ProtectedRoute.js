// Common/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../Functions/Auth";

const ProtectedRoute = ({ element: Component }) => {
  return getToken() ? <Navigate to="/" /> : <Component />;
};

export default ProtectedRoute;
