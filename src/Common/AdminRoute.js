import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../Functions/Auth";

const AdminRoute = ({ element: Element }) => {
  const token = getToken();
  const userRole = getUserRole();

  return token && userRole === "admin" ? <Element /> : <Navigate to="/login" />;
};

export default AdminRoute;
