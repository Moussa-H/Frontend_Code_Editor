// src/Components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../Functions/Auth";

const PrivateRoute = ({ element: Element }) => {
  const token = getToken();

  return token ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
