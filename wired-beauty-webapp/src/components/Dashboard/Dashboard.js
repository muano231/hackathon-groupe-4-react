import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import { users } from '../datas/Users';

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

  return(
    <div>
      <h1></h1>
      <table>
        <tr>
          <th>age</th>
          <th>height</th>
          <th>weight</th>
          <th>town</th>
        </tr>

        {users.map((user, index) => (
          <tr data-index={index}>
            <td>{Calculate_age(user.birthdate)}</td>
            <td>{user.height}</td>
            <td>{user.weight}</td>
            <td>{user.town}</td>
          </tr>
        ))}

      </table>
    </div>
  )
}

export default Dashboard;
