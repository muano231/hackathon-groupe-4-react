import React from "react";
import "./DashboardMenu.scss";
import logo from "../../assets/logo.png";
import { Users } from "../../datas/Users";
import { FaPowerOff, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function DashboardMenu() {
  const logout = () => {
    sessionStorage.clear();
  };

  return (
    <div className="dashboard-menu">
      <div className="menu_container">
        <div>
          <Link to="/dashboard/campaigns">
            <img src={logo} alt="Logo" className="logo-menu" />
          </Link>
          <ul>
            <li>
              <Link to="/dashboard/campaigns">campaigns</Link>
            </li>
          </ul>
        </div>
        <div className="actionContainer">
          <p>{Users[0].name}</p>
          <p className="account-button">
            <Link to="/dashboard/profile" className="profile-icon">
              <FaUserCircle />
            </Link>
          </p>
          <p onClick={logout} className="logout-button">
            <Link to="/" className="logout-fa">
              <FaPowerOff />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardMenu;
