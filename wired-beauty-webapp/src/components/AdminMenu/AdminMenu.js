import React from 'react';
import PropTypes from 'prop-types';
import './AdminMenu.scss';
import logo from '../../assets/logo.png'
import {Users} from '../../datas/Users'
import {FaPowerOff,FaClipboardList} from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { Badge,Button } from "react-bootstrap";

function AdminMenu() {

  const logout = () => {
    sessionStorage.clear()
  }

  return (
    <div className='admin-menu'>
      <Link to="/admin/campaigns">
        <img src={logo} alt='Logo' className='logo-menu' />
      </Link>
      <div className='menu'>Control panel</div>
      {/* <h5>Admin</h5> */}
      {/* <p className='account-button'>
        <Link to="/admin/profile" className='profile-icon'>
          <FaUserCircle />
        </Link>
      </p> */}
      <Button className='new-users-button'>
        <FaClipboardList /> <Badge bg="secondary">9</Badge>
        <span className="visually-hidden">unread messages</span>
      </Button>
      <p onClick={logout} className='logout-button'>
        <Link to="/" className='logout-fa'>
          <FaPowerOff />
        </Link>
      </p>
    </div>
  )
}

export default AdminMenu;
