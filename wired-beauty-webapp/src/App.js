import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useHistory } from "react-router-dom";
import Connexion from "./components/Connexion/Connexion";
import "./base.scss";
import Register from "./components/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />}></Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
