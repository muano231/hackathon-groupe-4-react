import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useHistory } from "react-router-dom";
import Connexion from "./components/Connexion/Connexion";
import Dashboard from "./components/Dashboard/Dashboard";
import "./base.scss";
import Register from "./components/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/signin" element={<Connexion />}></Route> */}
        <Route path="/dashboard" element={<Dashboard />}></Route>
        {/* <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} /> */}
        <Route path="/" element={<Connexion />}></Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
