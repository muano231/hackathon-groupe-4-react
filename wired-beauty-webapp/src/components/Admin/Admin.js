import React from 'react';
import PropTypes from 'prop-types';
import './Admin.scss';
import AdminMenu from '../AdminMenu/AdminMenu'
import { useParams } from "react-router-dom";
import AdminCampaigns from '../AdminCampaigns/AdminCampaigns'
import AdminVerifyUsers from '../AdminVerifyUsers/AdminVerifyUsers'

function Admin() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  const role = sessionStorage.getItem("role")
  let params = useParams()

  if(isLoggedIn == "true" && role == "admin") {
    return(
      <div>
        <AdminMenu></AdminMenu>
        <div className='content'>
          {params.page == "verify-users" ?
            <AdminVerifyUsers></AdminVerifyUsers>
            : params.page == "campaigns" &&
            <AdminCampaigns></AdminCampaigns>
          }
        </div>
      </div>
    )
  }
}

export default Admin;
