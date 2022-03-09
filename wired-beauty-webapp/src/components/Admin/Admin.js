import React from 'react';
import PropTypes from 'prop-types';
import './Admin.scss';
import AdminMenu from '../AdminMenu/AdminMenu'
import { useParams } from "react-router-dom";
import AdminCampaigns from '../AdminCampaigns/AdminCampaigns'

function Admin() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  const role = sessionStorage.getItem("role")
  let params = useParams()

  if(isLoggedIn == "true" && role == "admin") {
    return(
      <div>
        <AdminMenu></AdminMenu>
        <AdminCampaigns></AdminCampaigns>
      </div>
    )
  }
}

export default Admin;
