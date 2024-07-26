import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
