import React from "react";
import PropTypes from "prop-types";
import "./AdminMenu.scss";
import logo from "../../assets/logo.png";
import { Users } from "../../datas/Users";
import { FaPowerOff, FaClipboardList, FaFilePowerpoint } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Badge, Button } from "react-bootstrap";

function AdminMenu() {
  const logout = () => {
    sessionStorage.clear();
  };

  return (
    <div className="admin-menu">
      <Link to="/admin/campaigns">
        <img src={logo} alt="Logo" className="logo-menu" />
      </Link>
      <div className="menu">Control panel</div>
      <Link to="/admin/verify-users">
        <Button className='new-users-button'>
          <FaClipboardList /> <Badge bg="secondary">9</Badge>
        </Button>
      </Link>
      <p onClick={logout} className='logout-button'>
        <Link to="/" className='logout-fa'>
          <FaPowerOff />
        </Link>
      </p>
    </div>
  );
}

export default AdminMenu;
