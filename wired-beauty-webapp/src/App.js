import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Connexion from "./components/Connexion/Connexion";
import Dashboard from "./components/Dashboard/Dashboard";
import Admin from "./components/Admin/Admin";
import "./base.scss";
import Test from "./components/Test/Test";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/signin" element={<Connexion />}></Route> */}
                <Route path="/dashboard/:page" element={<Dashboard/>}/>
                <Route path="/admin/:page" element={<Admin/>}/>
                {/* <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} /> */}
                <Route path="/study/:id" element={<Test/>}/>
                <Route path="/register" element={<Connexion/>}/>
                <Route path="/" element={<Connexion/>}/>
                <Route path="*" element={<Connexion fromNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
