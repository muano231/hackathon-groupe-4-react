import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import DashboardMenu from '../DashboardMenu/DashboardMenu'
import DashboardCampaigns from '../DashboardCampaigns/DashboardCampaigns'
import DashboardProfile from '../DashboardProfile/DashboardProfile'
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Dashboard() {

  const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  const isAdmin = sessionStorage.getItem("role")
  let params = useParams()

  if(isLoggedIn == "true" && isAdmin == "testeur") {
    return(
      <div>
        <DashboardMenu name = {'Leo TERRAS'}></DashboardMenu>
        <div className='content'>
          {params.page == "profile" ?
            <DashboardProfile></DashboardProfile>
            : params.page == "campaigns" &&
            <DashboardCampaigns></DashboardCampaigns>
          }
        </div>
      </div>
    )
  } else {
    sessionStorage.clear()
    return(<Navigate to="/" />)
  }
}

export default Dashboard;
