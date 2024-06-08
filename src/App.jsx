import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
 import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
