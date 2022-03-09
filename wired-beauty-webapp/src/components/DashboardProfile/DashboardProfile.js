import React from 'react';
import PropTypes from 'prop-types';
import './DashboardProfile.scss';
import { Users } from '../../datas/Users';
import { Formik, Field, Form } from "formik";

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
      <div>
        <Formik
          initialValues={{name: Users[0].name, height: Users[0].height, email: Users[0].email, weight: Users[0].weight, birthdate: Users[0].birthdate}}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form className='user-informations'>
            <div><span className='bold'>Name</span><Field name="name" type="text"></Field></div>
            <div><span className='bold'>Height</span><Field name="height" type="number"></Field></div>
            <div><span className='bold'>Email</span><Field name="email" type="email"></Field></div>
            <div><span className='bold'>Weight</span><Field name="weight" type="number"></Field></div>
            <div><span className='bold'>BirthDate</span><Field name="birthdate" type="text"></Field></div>
            
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      
        {/* <p><b>Name : </b>{Users[0].name}</p>
        <p><b>Height : </b>{Users[0].height} cm</p>
        <p><b>Email : </b>{Users[0].email}</p>
        <p><b>Weight : </b>{Users[0].weight} kg</p>
        <p><b>Age : </b>{Calculate_age()}</p> */}
      </div>
    </div>
  )
}

export default DashboardProfile;
