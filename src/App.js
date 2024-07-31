import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Code_editor from "./Pages/Code_editor";
import Login from "./Pages/Login";
import ChatPage from "./Pages/ChatPage";
import AdminPanel from "./Pages/Admin-page";
import PrivateRoute from "./Common/PrivateRoute";
import AdminRoute from "./Common/AdminRoute";
import ProtectedRoute from "./Common/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<ProtectedRoute element={Register} />}
          />
          <Route path="/login" element={<ProtectedRoute element={Login} />} />
          <Route path="/" element={<PrivateRoute element={Code_editor} />} />
          <Route path="/chat" element={<PrivateRoute element={ChatPage} />} />
          <Route path="/admin" element={<AdminRoute element={AdminPanel} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
