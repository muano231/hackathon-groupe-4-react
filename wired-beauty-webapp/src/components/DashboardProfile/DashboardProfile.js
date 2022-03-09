import React from 'react';
import PropTypes from 'prop-types';
import './DashboardProfile.scss';
import { Users } from '../../datas/Users';

function DashboardProfile() {

  const Calculate_age = () => {
    var today = new Date();
    var birthdate = new Date(Users[0].birthdate);
    var age = today.getFullYear() - birthdate.getFullYear();
    var m = today.getMonth() - birthdate.getMonth();
    if(m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      age--
    }
    return age;
  }

  return (
    <div className='profile'>
      <h2>Profile</h2>
      <div className='user-informations'>
        <p><b>Name : </b>{Users[0].name}</p>
        <p><b>Height : </b>{Users[0].height} cm</p>
        <p><b>Email : </b>{Users[0].email}</p>
        <p><b>Weight : </b>{Users[0].weight} kg</p>
        <p><b>Age : </b>{Calculate_age()}</p>
      </div>
    </div>
  )
}

export default DashboardProfile;
