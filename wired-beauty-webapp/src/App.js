import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connexion from "./components/Connexion/Connexion";
import "./base.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />}>
          {/* <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
