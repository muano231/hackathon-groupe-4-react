import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import DashboardMenu from '../DashboardMenu/DashboardMenu'
import DashboardCampaigns from '../DashboardCampaigns/DashboardCampaigns'
import DashboardProfile from '../DashboardProfile/DashboardProfile'
import { useParams } from "react-router-dom";

function Dashboard() {

  const Calculate_age = (user_birthdate) => {
    var today = new Date();
    var birthdate = new Date(user_birthdate);
    var age = today.getFullYear() - birthdate.getFullYear();
    var m = today.getMonth() - birthdate.getMonth();
    if(m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      age--
    }
    return age;
  }
  
  let params = useParams()

  return(

    <div>
      <DashboardMenu name = {'Leo TERRAS'}></DashboardMenu>
      {params.page == "profile" ?
        <DashboardProfile></DashboardProfile>
        :
        <DashboardCampaigns></DashboardCampaigns>
      }
    </div>
  )
}

export default Dashboard;
