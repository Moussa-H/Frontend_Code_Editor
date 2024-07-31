export const setToken = (token) => {
  localStorage.setItem("token", token);
};
export const setName = (name) => {
  localStorage.setItem("name", name);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
export const getName = () => {
  return localStorage.getItem("name");
};

export const getUserRole = () => {
  return localStorage.getItem("role");
};
export const setUserRole = (role) => {
  localStorage.setItem("role", role);
};

