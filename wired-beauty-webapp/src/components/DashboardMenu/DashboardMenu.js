import React from 'react';
import PropTypes from 'prop-types';
import './DashboardMenu.scss';
import logo from '../../assets/logo.png'
import {Users} from '../../datas/Users'
import {FaPowerOff,FaUserCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom'

function DashboardMenu() {

  const logout = () => {
    sessionStorage.clear()
  }

  return (
    <div className='dashboard-menu'>
      <Link to="/dashboard/campaigns">
        <img src={logo} alt='Logo' className='logo-menu' />
      </Link>
      <div className='menu'>List of testing campaigns</div>
      <p className='account-button'>
        <Link to="/dashboard/profile" className='profile-icon'>
          <FaUserCircle />
        </Link>
      </p>
      <p onClick={logout} className='logout-button'>
        <Link to="/" className='logout-fa'>
          <FaPowerOff />
        </Link>
      </p>
    </div>
  )
}

export default DashboardMenu;
