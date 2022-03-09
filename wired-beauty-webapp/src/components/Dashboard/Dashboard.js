import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import DashboardMenu from '../DashboardMenu/DashboardMenu'
import DashboardCampaigns from '../DashboardCampaigns/DashboardCampaigns'
import DashboardProfile from '../DashboardProfile/DashboardProfile'
import { useParams } from "react-router-dom";

function Dashboard() {

  let params = useParams()

  return(

    <div>
      <DashboardMenu name = {'Leo TERRAS'}></DashboardMenu>
      <div className='content'>
        {params.page == "profile" ?
          <DashboardProfile></DashboardProfile>
          :
          <DashboardCampaigns></DashboardCampaigns>
        }
      </div>
    </div>
  )
}

export default Dashboard;
