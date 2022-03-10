import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AdminVerifyUsers.scss';
import { Button,Table } from "react-bootstrap";
import {FaCheck,FaTimes} from 'react-icons/fa'

function AdminVerifyUsers() {
  const [users, setUsers] = useState([])
  const [userVerify, setUserVerify] = useState([])
  const token = JSON.parse(sessionStorage.getItem("user")).access_token;

  useEffect(() => {
    fetch(
      process.env.REACT_APP_API + "/api/users",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.json())
    .then(
      (result) => {
        setUsers(result)
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  },[]);

  const verifyUser = (id) => {
    fetch(
      process.env.REACT_APP_API + `api/user/${id}/verify`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.json())
    .then(
      (result) => {
        setUserVerify(result)
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  const acceptUser = (id, session_id, study_id) => {
    if(session_id != '--Select a session--') {
      fetch(
        process.env.REACT_APP_API + `api/user/${id}/${session_id}/add`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.json())
      .then(
        (result) => {
          setUserVerify(result)
          fetch(
            process.env.REACT_APP_API + `api/user/${id}/${study_id}/remove`,
            {
              method: "post",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => res.json())
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    }
  }

  const removeAsk = (id, study_id) => {
    fetch(
      process.env.REACT_APP_API + `/api/user/${id}/${study_id}/remove`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.json())
    .then(
      (result) => {
        setUserVerify(result)
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  return (
    <div className='ask-lists'>
      <div className='verify-users-list'>
        <h3 className='verify-users-title'>Users to verify</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th className='verify-cell text-center'>Verify</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(users).map((user) => (
              user.verified == "0" && 
              <tr key={user.id} className='user-display'>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className='text-center'>
                  <Button className='verify-user-button' onClick={() => {verifyUser(user.id)}}>
                    Accept <FaCheck />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className='ask-campaigns-list'>
        <h3 className='ask-campaigns-title'>Campaigns demands</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Campaign</th>
              <th>Session</th>
              <th className='accept-cell text-center'>Accept</th>
              <th className='decline-cell text-center'>Decline</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(users).map((user) => (
              user.studies.map((study) => {
                console.log(user)
                return(
                  study.askPermission == true &&
                  <tr key={study.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{study.product.name}</td>
                      <td>
                        <select id={'select-session'+user.id}>
                          <option>--Select a session--</option>
                          {study.sessions.map((session) => {
                            return(
                              (session.permissionGiven == false && study.askPermission == true) &&
                              <option key={session.id} value={session.id}>{session.description}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td className='text-center'>
                        <Button className='accept-user-button' onClick={() => {acceptUser(user.id, document.getElementById("select-session"+user.id).value,study.id)}}>
                          <FaCheck />
                        </Button>
                      </td>
                      <td className='text-center'>
                        <Button className='decline-user-button' onClick={() => {removeAsk(user.id,study.id)}}>
                          <FaTimes />
                        </Button>
                      </td>
                    </tr>
                  )
              })
              // <tr key={user.id} className='user-display'>
              //   <td>{user.id}</td>
              //   <td>{user.name}</td>
              //   <td>{user.studies}</td>
              //   {/* <td>{user.studies}</td> */}
              // </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default AdminVerifyUsers;
