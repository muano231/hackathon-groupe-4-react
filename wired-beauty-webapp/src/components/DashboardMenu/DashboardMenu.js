import React from 'react';
import PropTypes from 'prop-types';
import './DashboardMenu.scss';
import logo from '../../assets/logo.png'
import {Users} from '../../datas/Users'
import {FaPowerOff,FaUserCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom'

function DashboardMenu() {

  const logout = () => {
    console.log("logout");
  }

  return (
    <div className='dashboard-menu'>
      <Link to="/dashboard/campaigns">
        <img src={logo} alt='Logo' className='logo-menu' />
      </Link>
      <div className='menu'>List of testing campaigns</div>
      <h4>{Users[0].name}</h4>
      <p className='account-button'>
        <Link to="/dashboard/profile" className='profile-icon'>
          <FaUserCircle />
        </Link>
      </p>
      <p onClick={logout} className='logout-button'><FaPowerOff /></p>
    </div>
  )
}

export default DashboardMenu;
