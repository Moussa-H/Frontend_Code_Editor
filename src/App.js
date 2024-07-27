import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Code_editor from "./Pages/Code_editor";
import Login from "./Pages/Login";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Code_editor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
